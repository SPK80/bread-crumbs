import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {Navbar} from "./ui/Navbar";
import {calcAngle} from "./bll/compass";
import {IFilter} from "./bll/IFilter";
import {AverageFilter} from "./bll/averageFilter";
import {Arrow} from "./ui/Arrow";
import {CoordsType, locationApi} from "./dal/locationApi";
import {sensorsApi, Vector3D} from "./dal/sensorsApi";

const rounded = function (number: number) {
  return +number.toFixed(2);
}

export default function App() {
  const [magData, setMagData] = useState<Vector3D>({x: 0, y: 0, z: 0});
  const [accelData, setAccelData] = useState<Vector3D>({x: 0, y: 0, z: 0});
  const [filter, setFilter] = useState<IFilter>()
  const [angle, setAngle] = useState(0)
  
  const [coords, setCoords] = useState<CoordsType>({lat: 0, long: 0});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
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
      if (errorMsg) setErrorMsg(errorMsg)
      else getLocation()
    })();
    
    setFilter(new AverageFilter(5))
    sensorsApi.subscribe(setMagData, setAccelData)
    sensorsApi.setMeasurementInterval(200)
    return () => sensorsApi.unsubscribe();
  }, []);
  
  useEffect(() => {
    setAngle(filter?.calc(calcAngle(magData, accelData)) ?? 0);
  }, [magData])
  
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (coords) {
    text = JSON.stringify(coords);
  }
  
  return (
    <>
      <StatusBar style="auto"/>
      <View style={styles.container}>
        <Navbar/>
        <Text style={styles.text}>elapsed: {elapsed}</Text>
        <Text style={styles.text}>
          magX: {rounded(magData.x)} magY: {rounded(magData.y)} magZ: {rounded(magData.z)}
        </Text>
        <Text style={styles.text}>
          accelX: {rounded(accelData.x)} accelY: {rounded(accelData.y)} accelZ: {rounded(accelData.z)}
        </Text>
        <Text style={styles.text}>
          fi: {angle}
        </Text>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.text}>{count}</Text>
        <View style={styles.compass}>
          <Arrow angle={angle}/>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
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
  compass: {
    backgroundColor: '#eab7ea',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 10,
    marginHorizontal: 'auto',
  },
});
