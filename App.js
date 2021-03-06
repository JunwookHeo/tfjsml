// import * as React from "react";
// import { View, Text, Image } from "react-native";

// import {useState, useEffect} from "react";
// import * as tf from '@tensorflow/tfjs';
// import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import * as mobilenet from '@tensorflow-models/mobilenet';

// export default function App() {
//   // const [ isTfReady, setIsTfReady ] = useState(false)
//   const [ tfmodel, setModel ] = useState({})

//   useEffect(() => {
//     // Wait for tf to be ready.
//     async function tfready() {
//       // You can await here
//       await tf.ready();
//       const model = await mobilenet.load();

//       console.log('wait')

//       const image = require('./images/dogsmall.jpg');
//       const imageAssetPath = Image.resolveAssetSource(image);
//       const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
//       const imageDataArrayBuffer = await response.arrayBuffer();
//       const imageData = new Uint8Array(imageDataArrayBuffer);
//       const imageTensor = decodeJpeg(imageData);

//       const prediction = await model.classify(imageTensor);

//       console.log('prediction', prediction)
//       setModel(model)
//       // setIsTfReady(true)
//       // ...
//     }

//     tfready()
//     console.log('run tfready')
//     // Signal to the app that tensorflow.js can now be used.
     
//   },[]); 

//   // console.log('TF Ready?', isTfReady)
//   console.log('model Ready?', tfmodel)

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Universal React with Expo</Text>
//     </View>
//   );
// }


import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen'
import ImageClassificationScreen from './screens/ImageClassificationScreen'
import StreamClassificationScreen from './screens/StreamClassificationScreen'
import ObjectDetectionScreen from './screens/ObjectDetectionScreen'
import ObjectDetectionRTScreen from './screens/ObjectDetectionRTScreen'
import AboutScreen from './screens/AboutScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Image Classification" component={ImageClassificationScreen}/>
        <Stack.Screen name="Stream Classification" component={StreamClassificationScreen}/>
        <Stack.Screen name="Object Detection" component={ObjectDetectionScreen}/>
        <Stack.Screen name="Object Detection Real Time" component={ObjectDetectionRTScreen}/>
        {/* <Stack.Screen name="Temperature" component={TempScreen} options={({ route }) => ({ title: 'Temperature' })}/> */}
        <Stack.Screen name="About" component={AboutScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

