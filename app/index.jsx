import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import "../global.css";
import React, { useState } from "react";
import SplashScreenComponent from "./splash/splashscreen";
import logoImage from "../assets/images/proker.png";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreenComponent onFinish={() => setIsLoading(false)} />;
  }

  return (
    <View className="flex-1">
      <View className="absolute inset-0">
        <View className="flex-1 bg-gradient-to-b from-blue-500 to-blue-900" />
      </View>
      <View className="items-center justify-center flex-1 p-4 bg-transparent">
        <Image
          source={logoImage}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
        <Text className="mt-4 text-2xl font-extrabold text-slate-500">
          Selamat Datang di Aplikasi Prokerku!
        </Text>
        <Text className="mt-2 text-lg text-center text-slate-500">
          Prokerku adalah aplikasi untuk mengelola program kerja Anda dengan
          mudah dan efisien.
        </Text>
      </View>
      <View className="items-center justify-end flex-1 p-4">
        <Link href="/sign-in" asChild>
          <TouchableOpacity className="w-full bg-green-500 px-6 py-4 rounded-full mb-8">
            <Text className="text-white text-xl font-semibold text-center">
              Mulai
            </Text>
          </TouchableOpacity>
        </Link>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default App;
