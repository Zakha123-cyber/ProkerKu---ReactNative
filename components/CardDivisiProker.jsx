import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CardDetailDivisi = ({PageTujuan, namaDivisi, deskripsiDivisi, idDivisi, idProker }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="p-4 mb-4 bg-green-400 shadow-md rounded-xl"
      onPress={() => navigation.navigate(PageTujuan, { idDivisi, idProker, deskripsiDivisi })}
    >
      <Text className="text-lg text-center text-white font-pbold">{namaDivisi}</Text>
    </TouchableOpacity>
  );
};

export default CardDetailDivisi;
