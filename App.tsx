import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {Navbar} from "./ui/Navbar";
import {Accelerometer, Magnetometer} from "expo-sensors";
import {Subscription} from "expo-modules-core";
import {Button} from "./ui/Button";
import {calcAngle} from "./bll/compass";
import {SmoothingFilter} from "./bll/smoothingFilter";

export default function App() {
  const [magData, setMagData] = useState({x: 0, y: 0, z: 0});
  const [accelData, setAccelData] = useState({x: 0, y: 0, z: 0});
  const [filter, setFilter] = useState<SmoothingFilter>()
  
  
  const [magSubscription, setMagSubscription] = useState<Subscription | null>(null);
  const [accelSubscription, setAccelSubscription] = useState<Subscription | null>(null);
  
  const setInterval = (ms: number) => {
    Magnetometer.setUpdateInterval(ms);
    Accelerometer.setUpdateInterval(ms);
  }
  
  const _subscribe = () => {
    setMagSubscription(Magnetometer.addListener(setMagData));
    setAccelSubscription(Accelerometer.addListener(setAccelData));
    setInterval(100);
  }
  
  const _unsubscribe = () => {
    magSubscription && magSubscription.remove();
    setMagSubscription(null)
    accelSubscription && accelSubscription.remove();
    setAccelSubscription(null);
  };
  
  useEffect(() => {
    setFilter(new SmoothingFilter())
    _subscribe();
    return () => _unsubscribe();
  }, []);
  
  
  const fi = filter?.calc(calcAngle(magData, accelData)) ?? 0
  return (
    <View style={styles.container}>
      <Navbar/>
      <Text style={styles.text}>
        magX: {Math.round(magData.x)} magY: {Math.round(magData.y)} magZ: {Math.round(magData.z)}
      </Text>
      <Text style={styles.text}>
        accelX: {Math.round(accelData.x * 10)} accelY: {Math.round(accelData.y * 10)} accelZ: {Math.round(accelData.z * 10)}
      </Text>
      <Text style={styles.text}>
        fi: {fi}
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button onPress={accelSubscription ? _unsubscribe : _subscribe}>
          {accelSubscription ? 'On' : 'Off'}
        </Button>
      </View>
      
      <View style={styles.compass}>
        <View style={[
          styles.arrow,
          {
            transform: [
              {translateX: 100},
              {translateY: 50},
              {rotate: `${fi}deg`},
            ]
          }
        ]}>
        </View>
      
      </View>
      
      <StatusBar style="auto"/>
    </View>
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
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  compass: {
    // position: "relative",
    backgroundColor: '#eab7ea',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 10,
    marginHorizontal: 'auto',
  },
  arrow: {
    position: "absolute",
    backgroundColor: '#3949aa',
    width: 2,
    height: 90,
  },
  
});
