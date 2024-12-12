import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../constants";

const TambahJobs = ({ idProker, idDivisi }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        className="flex items-center w-full mt-5"
        onPress={() =>
          navigation.navigate("TambahJobs", {
            id_proker: idProker, // Kirim id_proker ke halaman TambahJobs
            id_divisi: idDivisi, // Kirim id_divisi ke halaman TambahJobs
          })
        }
      >
        <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
        <Text className="text-center text-gray-400 font-pregular">Tambah Jobdesk</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TambahJobs;
