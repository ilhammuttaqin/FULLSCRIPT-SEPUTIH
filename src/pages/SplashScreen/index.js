// import React from 'react';
// import {StyleSheet, View, Text} from 'react-native';

// const SplashScreen = () => {

//   return (
//    <View style={styles.container}>
//        <Logo/>
//    </View>
//   )
// }

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: '#EEE8AA',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// })

// export default SplashScreen;

import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { Logo } from "../../assets/Illustration";

export default class SplashScreen extends Component {

    //Timer Splash Screen nih BOS
  componentDidMount(){
      setTimeout(() => {
        this.props.navigation.replace('MainApp')
      },5000)
  }
    
  render() {
    return (
      <View style = {styles.container}>
        <Logo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE8AA",
    alignItems: "center",
    justifyContent: "center",
  },
});
