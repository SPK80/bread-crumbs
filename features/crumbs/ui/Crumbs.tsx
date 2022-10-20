import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "../../../common/ui/Button";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {calcDistanceAC, dropCrumbAC, setFollowModeAC, takeCrumbAC} from "../bll/crumbsActions";
import {locationApi} from "../../../common/dal/locationApi";
import {setAppErrorAC} from "../../../bll/appActions";
import {CrumbType} from "../bll/crumbsReducer";
import {calcTargetAngleAC} from "../../compass/bll/compassActions";

export const Crumbs = () => {
  const crumbsState = useAppSelector(s => s.crumbs)
  const appState = useAppSelector(s => s.app)
  const dispatch = useAppDispatch()
  const [location, setLocation] = useState<CrumbType>({lat: 0, long: 0})
  // const [count, setCount] = useState(0);
  
  useEffect(() => {
    const getLocation = () => {
      setTimeout(async () => {
        // const before = Date.now()
        const location = await locationApi.getCoords()
        setLocation(location)
        dispatch(calcDistanceAC(location))
        // setCount(c => c + 1)
        // setElapsed(Date.now() - before)
        getLocation()
      }, 500)
    }
    
    (async () => {
      const errorMsg = await locationApi.init()
      if (errorMsg) dispatch(setAppErrorAC(errorMsg))
      else getLocation()
    })();
    
  }, []);
  
  useEffect(() => {
    if (crumbsState.followMode === "comeback") {
      dispatch(takeCrumbAC(location))
      if (crumbsState.stuck.length > 0)
        dispatch(calcTargetAngleAC(location, crumbsState.stuck[crumbsState.stuck.length - 1]))
    }
    
  }, [location])
  
  let text = 'Waiting..'
  if (appState.error)
    text = appState.error
  else if (location)
    text = JSON.stringify(location)
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <ScrollView style={styles.scrollView}>
        {crumbsState.stuck.map((s, index) =>
          <Text key={index} style={styles.text}>{JSON.stringify(s)}</Text>)}
      </ScrollView>
      <Text>{crumbsState.distance}</Text>
      {crumbsState.followMode === "forward"
        ? <View>
          <Button onPress={() => dispatch(dropCrumbAC(location))}>Drop</Button>
          <Button onPress={() => dispatch(setFollowModeAC("comeback"))}>Comeback</Button>
        </View>
        : <View>
          <Button onPress={() => dispatch(takeCrumbAC(location))}>Take</Button>
          <Button onPress={() => dispatch(setFollowModeAC("forward"))}>Forward</Button>
        </View>
      }
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#caded6',
    marginHorizontal: 20,
  },
  text: {
    color: '#1919ca',
  },
  comeback: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 32,
  },
})
