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
    <View className="flex-1 items-center justify-center bg-slate-300 p-4">
      <Image
        source={logoImage}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
      <Text className="text-2xl text-slate-500 font-extrabold mt-4">
        Selamat Datang di Aplikasi Prokerku!
      </Text>
      <Text className="text-lg text-slate-500 mt-2 text-center">
        Prokerku adalah aplikasi untuk mengelola program kerja Anda dengan mudah
        dan efisien.
      </Text>
      <StatusBar style="auto" />
      <TouchableOpacity className="absolute bottom-5 p-3 bg-blue-500 rounded">
        <Link
          href="/home"
          className="text-white text-2xl font-semibold hover:text-blue-300"
        >
          Pergi ke Home
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default App;
