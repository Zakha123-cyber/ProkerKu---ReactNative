import React from "react";
import DetailDivisiPage from "../../../components/DetailDivisiPage";
import { useRoute } from "@react-navigation/native"; 
import { useLocalSearchParams } from "expo-router";

const DetailDivisiKetuaPro = () => {
  const {idDivisi, idProker, deskripsiDivisi} = useLocalSearchParams();
  console.log("idDivisi:", idDivisi);
  console.log("idProker:", idProker);
  // const route = useRoute();
  // const { idDivisi, idProker, deskripsiDivisi } = route.params; // Menerima parameter dari navigasi
  

  return <DetailDivisiPage id_divisi={idDivisi} id_proker={idProker} deskripsiDivisi={deskripsiDivisi} />;
};

export default DetailDivisiKetuaPro;
