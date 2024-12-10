import { View, Text } from "react-native";
import React from "react";
import HomeKetum from "../dashboard/ketum/HomeKetum";
import HomeKetuaProker from "../dashboard/ketuaPro/HomeKetuaProker";
import HomeAnggota from "../dashboard/anggota/HomeAnggota";
import HomeCoDivisi from "../dashboard/co/HomeCoDivisi";
import DetailProkerKetuaPro from "../dashboard/ketuaPro/DetailProkerKetuaPro"
import HomeKetumNavigator from "../dashboard/ketum/HomeKetumNavigator";
import HomeKetuaProkerNavigator from "../dashboard/ketuaPro/HomeKetuaProNavigator";



const home = () => {
  return <HomeKetuaProkerNavigator/>;
};

export default home;
