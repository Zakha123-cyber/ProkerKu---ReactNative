import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../constants";

const TambahDivisiProker = ({ idProker }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity className="flex items-center w-full mt-5" onPress={() => navigation.navigate("TambahDivisiProker", { id_proker: idProker })}>
        <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
        <Text className="text-center text-gray-400 font-pregular">Tambah Divisi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TambahDivisiProker;
