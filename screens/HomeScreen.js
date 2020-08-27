import * as React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from 'react';

export default function App({navigation}) {


  return (
      <View style={styles.container}>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:28,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title:{
    flex:2,
    // backgroundColor:'red'
  },
  body:{
    flex:3,
    // backgroundColor:'blue'
  },
  footer:{
    flex:2,
    flexDirection: 'row',
    // backgroundColor:'green'
  }

});