import React from 'react'
import {GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity} from "react-native";

type PropsType = {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<TextStyle> | undefined;
  children?: React.ReactNode;
}

export const Button: React.FC<PropsType> =
  ({style, onPress, children}) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.textButton}>{children}</Text>
    </TouchableOpacity>
  )

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3949aa',
    borderRadius: 6,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    margin: 5,
    padding: 5,
    minWidth: 60,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
