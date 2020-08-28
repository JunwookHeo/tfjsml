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
            style={styles.button}
						key={item.index}
						onPress={event => OnSelectFunction(item)}
					>
						<Text style={styles.buttonText}>{item.name}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    elevation: 8,
    marginHorizontal: 1,
    marginVertical : 5,
    padding: 3,
    backgroundColor: "#009688",
    borderRadius: 10,
  },
  buttonText:{
    fontSize: 24,
    fontWeight: '600',
    margin: 5,
    alignSelf: 'stretch',
    color: '#ffffff'
  },

});