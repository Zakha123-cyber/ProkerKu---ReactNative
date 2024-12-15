import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const CardDetailDivisiKetuaPro = ({ PageTujuan, namaDivisi, deskripsiDivisi, idDivisi, idProker }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="p-4 mb-4 bg-green-400 shadow-md rounded-xl"
      onPress={() => router.push({pathname : PageTujuan, params: { idDivisi, idProker, deskripsiDivisi }})}
    >
      <Text className="text-lg text-center text-white font-pbold">{namaDivisi}</Text>
    </TouchableOpacity>
  );
};

export default CardDetailDivisiKetuaPro;