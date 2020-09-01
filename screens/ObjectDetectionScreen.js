import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Button } from "react-native";
import { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from "expo-image-manipulator";

import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import Svg, { Rect } from 'react-native-svg';

import LoadingView from '../components/LoadingView'

function PredictionView({ predict }) {
  const listItems = predict.map((item, i) =>
    <Text key={i} style={styles.predict}>{item.class} : {(item.score * 100).toFixed(3)}%</Text>
  );
  return (
    <View>
      {listItems}
    </View>
  )
}

function ButtonView(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default function ObjectDetectionScreen({ navigation }) {
  const [model, setModel] = useState(null)
  const [img, setImg] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    getPermissionAsync()
    async function tfready() {
      await tf.ready();
      const ml = await cocoSsd.load();
      console.log('wait')
      setModel(ml)
      setLoading(false)
    }

    tfready()
    console.log('run tfready')
  }, []);

  useEffect(() => {
    if (img) {
      setLoading(true)
      setPrediction(null)
      doDetection()
    }

  }, [img]);

  async function PickerImage() {
    try {
      const response = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5
      });
      if (!response.cancelled) {
        if (response.height > 1500) {
          const manipResult = await ImageManipulator.manipulateAsync(
            response.uri,
            [{ resize: { width: 1000, height: 1000 } }],
          );
          setImg(manipResult);
        }
        else {
          setImg(response);
        }
      }
    } catch (err) {
      alert(err)
    }
  };

  async function doDetection() {
    console.log('press')

    if (model) {
      // const image = require('../images/dogsmall.jpg');
      // const image = require({uri : img.uri})
      // console.log('image', image)
      // const imageAssetPath = Image.resolveAssetSource(image);
      // console.log('imageAssetPath', imageAssetPath)
      // const imageAssetPath = Image.resolveAssetSource(img)
      // const response = await fetch(imageAssetPath.uri, {}, {isBinary: true})
      // const imageDataArrayBuffer = await response.arrayBuffer();
      // const imageData = new Uint8Array(imageDataArrayBuffer);
      // const imageTensor = decodeJpeg(imageData);

      console.log('image', img)
      const imgB64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer)
      const imageTensor = decodeJpeg(raw);

      const predict = await model.detect(imageTensor);
      setPrediction(predict)
      console.log('prediction', predict)

    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <ButtonView onPress={PickerImage} title="Select Image from camera"></ButtonView>
      <View>
        {img && <Image source={{ uri: img.uri }} style={styles.image} />}
        {prediction && prediction.map((pos, i) => {
          return (<Svg key={i} style={styles.image} position="absolute">
            <Rect x={pos.bbox[0] / 3.3} y={pos.bbox[1] / 3.3} width={pos.bbox[2] / 3.3} height={pos.bbox[3] / 3.3}
              strokeWidth="2"
              stroke="rgb(255,0,0)"
            />
          </Svg>)
        })}
      </View>
      {prediction && <PredictionView predict={prediction}></PredictionView>}
      {loading && <LoadingView></LoadingView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    flexDirection: 'column',
  },
  button: {
    elevation: 8,
    margin: 1,
    padding: 3,
    backgroundColor: "#009688",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    margin: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    color: '#ffffff'
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 5,
    alignSelf: 'center'
  },
  predict: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 2,
  },
});