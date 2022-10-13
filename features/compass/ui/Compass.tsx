import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from "react-native";
import {Arrow} from "./Arrow";
import {AverageFilter} from "../../../common/bll/averageFilter";
import {sensorsApi, Vector3D} from "../dal/sensorsApi";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../bll/store";
import {calcAzimuthAngleAC, setAzimuthAngleFilterAC} from "../bll/compassActions";

export const Compass: React.FC = () => {
  const compassState = useAppSelector((state: AppRootStateType) => state.compass)
  const dispatch = useAppDispatch()
  
  const [magData, setMagData] = useState<Vector3D>({x: 0, y: 0, z: 0});
  const [accelData, setAccelData] = useState<Vector3D>({x: 0, y: 0, z: 0});
  
  useEffect(() => {
    dispatch(setAzimuthAngleFilterAC(new AverageFilter(10)))
    
    sensorsApi.subscribe(setMagData, setAccelData)
    sensorsApi.setMeasurementInterval(100)
    return () => sensorsApi.unsubscribe();
  }, [])
  
  useEffect(() => {
    dispatch(calcAzimuthAngleAC(magData, accelData))
  }, [magData])
  
  return (
    <View style={styles.container}>
      {/*<Text style={styles.text}>*/}
      {/*  magX: {rounded(magData.x)} magY: {rounded(magData.y)} magZ: {rounded(magData.z)}*/}
      {/*</Text>*/}
      {/*<Text style={styles.text}>*/}
      {/*  accelX: {rounded(accelData.x)} accelY: {rounded(accelData.y)} accelZ: {rounded(accelData.z)}*/}
      {/*</Text>*/}
      {/*<Text style={styles.text}>*/}
      {/*  fi: {angle}*/}
      {/*</Text>*/}
      <Arrow angle={compassState.azimuthAngle}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eab7ea',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 10,
    marginHorizontal: 'auto',
  },
});
