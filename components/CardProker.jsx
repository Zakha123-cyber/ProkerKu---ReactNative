import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "../constants/images";
import { Link } from "expo-router";

const CardProker = () => {
  return (
    <View className="mx-2 mt-3">
      <Link href="/dashboard/ketum/detailProker" asChild>
        <TouchableOpacity className="flex-row p-6 mb-6 bg-white border-2 border-green-500 rounded-lg shadow-md">
          <View>
            <Image source={images.logoProkerKu} style={{ width: 150, height: 100, transform: [{ translateX: 30 }] }} resizeMode="contain" />
          </View>
          <View className="">
            <Text className="text-gray-400 font-psemibold">Nama Proker :</Text>
            <Text className="text-xl font-pbold">Compiler</Text>
            <Text className="mt-2 text-gray-400 font-psemibold">Tanggal Pelaksanaan :</Text>
            <Text className="text-xl font-pbold">22-12-2024</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default CardProker;
