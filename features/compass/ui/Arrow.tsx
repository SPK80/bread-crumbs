import * as React from "react"
import Svg, {Path} from "react-native-svg"
import {StyleSheet, Text, View} from "react-native";

type PropsType = {
  angle: number
  color: string
  distance?: number
}

export const Arrow: React.FC<PropsType> = ({angle, color, distance}) => (
  <View style={styles.container}>
    <Svg viewBox={"0 0 24 24"}
         style={{
           transform: [
             {rotate: `${Math.round(angle - 45)}deg`},
           ]
         }}
    >
      <Path
        d="M14.472,20.937a1.438,1.438,0,0,1-1.3-.812L10.3,14.343a1.418,1.418,0,0,0-.642-.641L3.874,10.831A1.462,1.462,0,0,1,4.06,8.136l14.952-5a1.46,1.46,0,0,1,1.849,1.847l-5,14.952a1.439,1.439,0,0,1-1.284.994C14.543,20.936,14.507,20.937,14.472,20.937ZM19.479,4.063a.488.488,0,0,0-.149.024h0l-14.952,5a.46.46,0,0,0-.058.849L10.1,12.805A2.444,2.444,0,0,1,11.2,13.9l2.87,5.782a.443.443,0,0,0,.445.255.45.45,0,0,0,.4-.312l5-14.953a.462.462,0,0,0-.433-.607Z"
        stroke={color}
        strokeWidth={0.3}
      />
    </Svg>
    {distance ? <Text style={styles.text}>{Math.round(distance ?? 0)}</Text> : ''}
  </View>
)

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 200,
    height: 200,
  },
  text: {
    position: "absolute",
    color: 'red',
    width: '100%',
    textAlign: 'center',
    transform: [
      {translateY: 90},
    ]
  },
})
