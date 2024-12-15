import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../constants";
import { useRouter } from "expo-router";

const TambahDivisiProker = ({ idProker }) => {
  const router = useRouter(); // Inisialisasi router
  console.log("idProker:", idProker);

  const handleNavigate = () => {
    router.push({
      pathname: "/dashboard/ketuaPro/editDivisi", // Pastikan ini adalah route yang valid
      params: { id_proker: idProker }, // Kirim id_proker sebagai query parameter
    });
  };

  return (
    <View>
      <TouchableOpacity className="flex items-center w-full mt-5" onPress={() => handleNavigate()}>
        <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
        <Text className="text-center text-gray-400 font-pregular">Tambah Divisi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TambahDivisiProker;
