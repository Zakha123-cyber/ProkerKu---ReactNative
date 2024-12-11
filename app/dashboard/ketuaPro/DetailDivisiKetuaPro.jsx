import React from "react";
import DetailDivisiPage from "../../../components/DetailDivisiPage";
import { useRoute } from "@react-navigation/native";

const DetailDivisiKetuaPro = () => {
  const route = useRoute();
  const { idDivisi, idProker, deskripsiDivisi } = route.params; // Menerima parameter dari navigasi
  

  return <DetailDivisiPage idDivisi={idDivisi} idProker={idProker} deskripsiDivisi={deskripsiDivisi} />;
};

export default DetailDivisiKetuaPro;
