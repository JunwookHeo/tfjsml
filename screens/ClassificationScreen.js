import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from "react-native";
import { useState, useEffect } from 'react';

import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default function ClassificationScreen({ navigation }) {
const [model, setModel] = useState()

   useEffect(() => {
    // Wait for tf to be ready.
    async function tfready() {
      // You can await here
      await tf.ready();
      const ml = await mobilenet.load();

      console.log('wait')




      setModel(ml)
      // setIsTfReady(true)
      // ...
    }

    tfready()
    console.log('run tfready')
    // Signal to the app that tensorflow.js can now be used.
     
  },[]); 

  async function OnPress() {
    console.log('press')

    if (model) {
      const image = require('../images/dogsmall.jpg');
      const imageAssetPath = Image.resolveAssetSource(image);
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const imageDataArrayBuffer = await response.arrayBuffer();
      const imageData = new Uint8Array(imageDataArrayBuffer);
      const imageTensor = decodeJpeg(imageData);

      const prediction = await model.classify(imageTensor);
      console.log('prediction', prediction)

    }

  }

	return (
		<View style={styles.container}>
            <Button onPress={() => OnPress()} title="Classification"></Button>
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