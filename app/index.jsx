import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import "../global.css";
import React, { useState } from "react";
import SplashScreenComponent from "./splash/splashscreen";
import logoImage from "../assets/images/proker.png"; // Pastikan path relatif benar

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreenComponent onFinish={() => setIsLoading(false)} />;
  }

  return (
    <View className="items-center justify-center flex-1 p-4 bg-slate-300">
      <Image source={logoImage} style={{ width: 200, height: 200 }} resizeMode="contain" />
      <Text className="mt-4 text-2xl font-extrabold text-slate-500">Selamat Datang di Aplikasi Prokerku!</Text>
      <Text className="mt-2 text-lg text-center text-slate-500">Prokerku adalah aplikasi untuk mengelola program kerja Anda dengan mudah dan efisien.</Text>
      <StatusBar style="auto" />
      <TouchableOpacity className="absolute p-3 bg-blue-500 rounded bottom-5">
        <Link href="/sign-in" className="text-2xl font-semibold text-white hover:text-blue-300">
          Pergi ke Home
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default App;
