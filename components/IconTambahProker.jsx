import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";

import { icons } from "../constants";

const IconTambahProker = () => {
  return (
    <View>
      <Link href="/dashboard/ketum/tambahproker" asChild>
        <TouchableOpacity className="flex items-center w-full">
          <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
          <Text className="text-center text-gray-400 font-pregular">Tambah Proker</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default IconTambahProker;
