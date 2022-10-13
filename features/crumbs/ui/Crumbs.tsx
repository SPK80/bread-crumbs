import React, {useEffect, useState} from "react";
import {CrumbsStack} from "../../../common/bll/crumbs";
import {StyleSheet, Text, View} from "react-native";

export const Crumbs = () => {
  const [crumbs, setCrumbs] = useState<CrumbsStack | null>(null);
  
  useEffect(() => {
    setCrumbs(new CrumbsStack())
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{JSON.stringify(crumbs?.current)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  text: {
    color: '#1919ca',
  },
  
})
