import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";
import { Link } from "expo-router";


const ListProker = () => {
  return (
    <View className="flex flex-row items-center justify-center gap-5 mt-5">
      <Link href="/dashboard/ketum/tambahproker" asChild>
        <TouchableOpacity className="flex items-center">
          <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
          <Text className="text-gray-400 font-pregular">Tambah Proker</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity className="flex items-center">
        <Image
          source={icons.profile}
          className="w-5 h-5"
          resizeMode="contain"
        />
        <Text className="text-gray-400 font-pregular">Management User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListProker;
