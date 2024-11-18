import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Animatable from 'react-native-animatable';
import logoImage from '../../assets/images/proker.png';

SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = ({ onFinish }) => {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      onFinish();
    }, 3000); 
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Animatable.Image
        animation="bounceIn"
        duration={1500}
        source={logoImage}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreenComponent;