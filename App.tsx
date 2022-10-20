import {StyleSheet, View} from 'react-native';
import React from "react";
import {Navbar} from "./common/ui/Navbar";
import {Compass} from "./features/compass";
import {Provider} from "react-redux";
import {store} from "./bll/store";
import {Crumbs} from "./features/crumbs";

export default function App() {
  return (
    <Provider store={store}>
      {/*<StatusBar style="auto"/>*/}
      <View style={styles.container}>
        <Navbar/>
        <View style={styles.content}>
          <Compass/>
          <Crumbs/>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  content: {
    height: '90%',
    alignItems: "center",
  },
});
