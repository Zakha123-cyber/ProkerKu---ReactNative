import { View, ScrollView, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import DetailDivisiPageCo from "../../../components/DetailDivisiPageCo";
import TambahJobs from "../../../components/IconTambahJobs";

const DetailDivisiCoDivisi = () => {
  const route = useRoute();
  const { idDivisi, idProker, deskripsiDivisi } = route.params; // Menerima parameter dari navigasi

  // Memeriksa apakah idDivisi dan lainnya sudah ada
  if (!idDivisi || !idProker || !deskripsiDivisi) {
    return (
      <View>
        <Text>Parameter tidak lengkap, harap coba lagi.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <DetailDivisiPageCo idDivisi={idDivisi} idProker={idProker} deskripsiDivisi={deskripsiDivisi} />
    </ScrollView>
  );
};

export default DetailDivisiCoDivisi;
