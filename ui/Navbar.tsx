import React from "react";
import {StyleSheet, Text, View} from "react-native";

type PropsType = {}

export const Navbar: React.FC<PropsType> = ({}) => {
  return <View style={styles.container}>
    <Text style={styles.text}>Bread Crumbs</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3949ab',
    paddingVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

