import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {Navbar} from "./common/ui/Navbar";
import {locationApi} from "./common/dal/locationApi";
import {CoordsType} from "./common/bll/crumbs";
import {Compass} from "./features/compass";
import {Provider} from "react-redux";
import {store} from "./bll/store";
import {setAppErrorAC} from "./bll/appActions";

export default function App() {
  const appState = store.getState().app
  const dispatch = store.dispatch
  
  const [coords, setCoords] = useState<CoordsType>({lat: 0, long: 0});
  const [count, setCount] = useState(0);
  const [elapsed, setElapsed] = useState(0)
  
  useEffect(() => {
    
    const getLocation = () => {
      setTimeout(async () => {
        const before = Date.now()
        setCoords(await locationApi.getCoords())
        setCount(c => c + 1)
        setElapsed(Date.now() - before)
        getLocation()
      }, 1000)
    }
    
    (async () => {
      const errorMsg = await locationApi.init()
      if (errorMsg) dispatch(setAppErrorAC(errorMsg))
      else getLocation()
    })();
    
  }, []);
  
  let text = 'Waiting..';
  if (appState.error) {
    text = appState.error;
  } else if (coords) {
    text = JSON.stringify(coords);
  }
  
  return (
    <Provider store={store}>
      <StatusBar style="auto"/>
      <View style={styles.container}>
        <Navbar/>
        <View style={styles.content}>
          <Text style={styles.text}>elapsed: {elapsed}</Text>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.text}>{count}</Text>
          <Compass/>
        </View>
        {/*<View>*/}
        {/*  <Button onPress={() => crumbs && crumbs.push(coords)}>Drop Crumb</Button>*/}
        {/*</View>*/}
      </View>
    </Provider>
  );
}

const rounded = function (number: number) {
  return +number.toFixed(2);
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  content: {
    height: '80%',
  },
  body: {
    padding: 10,
  },
  text: {
    color: '#1919ca',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
