import { View, Text } from "react-native";
import React from "react";
import HomeKetum from "../dashboard/ketum/HomeKetum";
import HomeKetuaProker from "../dashboard/ketuaPro/HomeKetuaProker";
import HomeAnggota from "../dashboard/anggota/HomeAnggota";
import HomeCoDivisi from "../dashboard/co/HomeCoDivisi";
import HomeKetumNavigator from "../dashboard/ketum/HomeKetumNavigator";
import HomeKetuaProkerNavigator from "../dashboard/ketuaPro/HomeKetuaProNavigator";
import HomeCoDivisiNavigator from "../dashboard/co/HomeCoDivisiNavigator";
import HomeAnggotaNavigator from "../dashboard/anggota/HomeAnggotaNavigator";


const home = () => {
  return <HomeAnggotaNavigator />;
};

export default home;
