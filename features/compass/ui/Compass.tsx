import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text} from "react-native";
import {Arrow} from "./Arrow";
import {AverageFilter} from "../../../common/bll/averageFilter";
import {sensorsApi, Vector3D} from "../dal/sensorsApi";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../bll/store";
import {calcAzimuthAngleAC, setAzimuthAngleFilterAC} from "../bll/compassActions";

export const Compass: React.FC = () => {
  const compassState = useAppSelector((state: AppRootStateType) => state.compass)
  const followMode = useAppSelector(s => s.crumbs.followMode)
  
  const dispatch = useAppDispatch()
  
  const [magData, setMagData] = useState<Vector3D>({x: 0, y: 0, z: 0});
  const [accelData, setAccelData] = useState<Vector3D>({x: 0, y: 0, z: 0});
  const distance = useAppSelector(s => s.crumbs.distance)
  // const [count, setCount] = useState(0);
  
  useEffect(() => {
    dispatch(setAzimuthAngleFilterAC(new AverageFilter(10)))
    sensorsApi.subscribe(setMagData, setAccelData)
    sensorsApi.setMeasurementInterval(100)
    return () => sensorsApi.unsubscribe();
  }, [])
  
  useEffect(() => {
    dispatch(calcAzimuthAngleAC(magData, accelData))
    // setCount(c => c + 1)
  }, [magData])
  
  return (
    <View style={styles.container}>
      <Text>{Math.round(compassState.targetAngle)}</Text>
      {followMode === 'forward' &&
          <Arrow
              color={'red'}
              angle={compassState.azimuthAngle}
          />}
      {followMode === 'comeback' &&
          <Arrow
              distance={distance}
              color={'green'}
              angle={compassState.azimuthAngle + compassState.targetAngle}
          />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3949aa',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 10,
  },
  text: {
    backgroundColor: 'yellow',
  },
});
