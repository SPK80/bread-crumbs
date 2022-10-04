import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import React from "react";
import {Navbar} from "./ui/Navbar";

export default function App() {
  
  return (
    <View style={styles.container}>
      <Navbar/>
      <View style={styles.body}>
      
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
    backgroundColor: '#fff',
    padding: 10,
  }
});
