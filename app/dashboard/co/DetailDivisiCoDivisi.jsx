import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import DetailDivisiPage from "../../../components/DetailDivisiPage";

const DetailDivisiCoDivisi = () => {
  const route = useRoute();
  const { idDivisi, idProker, deskripsiDivisi } = route.params; // Menerima parameter dari navigasi
  return <DetailDivisiPage idDivisi={idDivisi} idProker={idProker} deskripsiDivisi={deskripsiDivisi} />;
};

export default DetailDivisiCoDivisi;
