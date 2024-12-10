import { View, Text } from "react-native";
import React from "react";
import HomeKetum from "../dashboard/ketum/HomeKetum";
import HomeKetuaProker from "../dashboard/ketuaPro/HomeKetuaProker";
import HomeAnggota from "../dashboard/anggota/HomeAnggota";
import HomeCoDivisi from "../dashboard/co/HomeCoDivisi";
<<<<<<< HEAD
import DetailProkerKetuaPro from "../dashboard/ketuaPro/DetailProkerKetuaPro"

const home = () => {
  return <DetailProkerKetuaPro/>;
=======
import HomeKetumNavigator from "../dashboard/ketum/HomeKetumNavigator";
import HomeKetuaProkerNavigator from "../dashboard/ketuaPro/HomeKetuaProNavigator";
import HomeCoDivisiNavigator from "../dashboard/co/HomeCoDivisiNavigator";
import HomeAnggotaNavigator from "../dashboard/anggota/HomeAnggotaNavigator";


const home = () => {
  return <HomeKetumNavigator/>;
>>>>>>> f354023a4f639162ae887bb465a9314d93c0451d
};

export default home;
