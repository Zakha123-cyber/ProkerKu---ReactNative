import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";
import { Link } from "expo-router";

const TambahDivisi = () => {
  return (
    <View className="flex items-end justify-end mt-7">
      <Link href="/dashboard/ketuaPro/editDivisi" asChild>
        <TouchableOpacity className="flex items-center w-1/3">
          <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
          <Text className="text-center text-gray-400 font-pregular">Tambah Divisi</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TambahDivisi;
