import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {Navbar} from "./ui/Navbar";
import {Accelerometer, Magnetometer} from "expo-sensors";
import {Subscription} from "expo-modules-core";
import {Button} from "./ui/Button";
import {calcAngle} from "./bll/compass";
import {IFilter} from "./bll/IFilter";
import {AverageFilter} from "./bll/averageFilter";
import {Arrow} from "./ui/Arrow";
import * as Location from 'expo-location';

const rounded = function (number: number) {
  return +number.toFixed(2);
}

export default function App() {
  const [magData, setMagData] = useState({x: 0, y: 0, z: 0});
  const [accelData, setAccelData] = useState({x: 0, y: 0, z: 0});
  const [filter, setFilter] = useState<IFilter>()
  const [angle, setAngle] = useState(0)
  
  const [magSubscription, setMagSubscription] = useState<Subscription | null>(null);
  const [accelSubscription, setAccelSubscription] = useState<Subscription | null>(null);
  
  const [coords, setCoords] = useState<{ lat: number, long: number }>({lat: 0, long: 0});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [count, setCount] = useState(0);
  const [elapsed, setElapsed] = useState(0)
  
  const setMeasurementInterval = (ms: number) => {
    Magnetometer.setUpdateInterval(ms);
    Accelerometer.setUpdateInterval(ms);
  }
  
  const _subscribe = () => {
    setMagSubscription(Magnetometer.addListener(setMagData));
    setAccelSubscription(Accelerometer.addListener(setAccelData));
    setMeasurementInterval(200);
  }
  
  const _unsubscribe = () => {
    magSubscription && magSubscription.remove();
    setMagSubscription(null)
    accelSubscription && accelSubscription.remove();
    setAccelSubscription(null);
  };
  
  useEffect(() => {
    
    const getLocation = () => {
      setTimeout(async () => {
        const before = Date.now()
        const location = await Location.getCurrentPositionAsync({})
        setCoords({lat: location.coords.latitude, long: location.coords.longitude})
        setCount(c => c + 1)
        setElapsed(Date.now() - before)
        getLocation()
      }, 1000)
    }
    
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      getLocation()
    })();
    
    setFilter(new AverageFilter(5))
    _subscribe();
    return () => _unsubscribe();
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
        <View style={styles.buttonContainer}>
          <Button onPress={accelSubscription ? _unsubscribe : _subscribe}>
            {accelSubscription ? 'On' : 'Off'}
          </Button>
        </View>
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
