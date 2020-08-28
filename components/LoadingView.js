import * as React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingView(props) {
  console.log('Loading view')
  return (
    <View style={styles.container}>
        <ActivityIndicator animating={true} size='large' color='#22cccc'></ActivityIndicator>
        <Text style={styles.loading}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  loading: {
    fontSize: 30,
    marginBottom:10,
    fontWeight: '600',
  },
});