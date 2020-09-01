import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from "expo-image-manipulator";

import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

function PredictionView({ predict }) {
  const listItems = predict.map((item, i) =>
    <Text key={i} style={{ fontSize: 12, marginBottom: 5, color: 'white' }}>{item.class} : {(item.score * 100).toFixed(3)}%</Text>
  );
  return (
    <View>
      {listItems}
    </View>
  )
}

export default function ObjectDetectionRTScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [camera, setCamera] = useState(null);
  const [img, setImg] = useState(null);
  const [prediction, setPrediction] = useState(null);
    
  useEffect(() => {
    (async () => {
      await tf.ready();
      const ml = await cocoSsd.load();
      console.log('wait')
      setModel(ml)
      setLoading(false)
    })();

    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  useEffect(() => {
    if (img) {
      setLoading(true)
      setPrediction(null)
      doDetection()      
    }
  }, [img]);

  useEffect(() => {
    TakeImage()    
  }, [prediction]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function OnCameraReady(){
    console.log('camera ready!!')
    TakeImage()
  }

  async function TakeImage() {
    try {
      if(camera){
        let photo = await camera.takePictureAsync();
        console.log('take image', photo)
        if (photo.height > 1500) {
          const manipResult = await ImageManipulator.manipulateAsync(
            photo.uri,
            [{ resize: { height: 1000 } }],
          );
          setImg(manipResult);
          console.log('resize image', manipResult)
        }
        else {
          setImg(photo);
        }        
      }      
    } catch (err) {
      alert(err)
    }
  };

  async function doDetection() {
    if (model) {
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
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} onCameraReady={OnCameraReady} ref={ref => {setCamera(ref); }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>          
        </View>
        {prediction && <PredictionView predict={prediction}></PredictionView>}
      </Camera>
    </View>
  );
}
