import * as React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';

export default function AboutScreen({ navigation }) {
	return (
		<View style={styles.container}>
            <Text>This is a mobile application for machine learning.</Text>
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
});