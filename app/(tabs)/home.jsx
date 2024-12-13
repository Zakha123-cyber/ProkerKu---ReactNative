import React from "react";
import HomeKetumNavigator from "../dashboard/ketum/HomeKetumNavigator";
import HomeKetuaProkerNavigator from "../dashboard/ketuaPro/HomeKetuaProNavigator";
import HomeCoDivisiNavigator from "../dashboard/co/HomeCoDivisiNavigator";
import HomeAnggotaNavigator from "../dashboard/anggota/HomeAnggotaNavigator";
import { useLocalSearchParams } from "expo-router";

const Home = () => {
  const { role_id, nama, id_user } = useLocalSearchParams();
  const params = { role_id, nama, id_user };
  console.log("Role ID: ", role_id);
  console.log("Role ID: ", nama);
  console.log("Role ID: ", id_user);
  const renderNavigator = () => {
    switch (parseInt(role_id)) {
      case 1:
        return <HomeKetumNavigator route={{ params }} />;
      case 2:
        return <HomeKetuaProkerNavigator route={{ params }} />;
      case 3:
        return <HomeCoDivisiNavigator route={{ params }} />;
      case 4:
        return <HomeAnggotaNavigator route={{ params }} />;
      default:
        return <Text>Invalid role</Text>;
    }
  };
  return <>{renderNavigator()}</>;
  // return <HomeAnggotaNavigator />;
};

export default Home;
