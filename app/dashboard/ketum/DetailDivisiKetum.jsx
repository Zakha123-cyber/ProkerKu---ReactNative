import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { icons } from "../../../constants";
import { Link } from "expo-router";
import DetailDivisiPage from "../../../components/DetailDivisiPage";
import { useRoute } from "@react-navigation/native";


const DetailDivisiKetum = () => {
  const route = useRoute();
  const { idDivisi, idProker, deskripsiDivisi } = route.params; // Menerima parameter dari navigasi
  

  return <DetailDivisiPage idDivisi={idDivisi} idProker={idProker} deskripsiDivisi={deskripsiDivisi} />;
}

export default DetailDivisiKetum;