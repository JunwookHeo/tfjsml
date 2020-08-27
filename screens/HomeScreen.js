import * as React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';

const functionList = require('../components/FunctionList');

export default function App({ navigation }) {
	function OnSelectFunction(item){
		console.log('entered menu', item)
		navigation.navigate(item.name)
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				{functionList.FUNCTION_LIST.map(item => (
					<TouchableOpacity
						key={item.index}
						onPress={event => OnSelectFunction(item)}
					>
						<Text style={{ color: 'black', fontSize: 16, paddingLeft: 20, paddingTop: 16 }}>{item.name}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
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