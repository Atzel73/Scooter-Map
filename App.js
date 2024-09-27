import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Screens from './src/screens/navegations/MainScreens';
import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image'


const { width, height } = Dimensions.get("window");
export default function App() {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    SplashScreen.hide();

    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, [])


  if (loading) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.gif}
          source={require('./assets/GIF_FLOYD.gif')}
        />
      </View>
    )
  }

  return <Screens />

}

const styles = StyleSheet.create({
  gif: {
    width: width,
    height: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: '#6BB8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
