import React from "react";
import HomeKetumNavigator from "../dashboard/ketum/HomeKetumNavigator";
import HomeKetuaProkerNavigator from "../dashboard/ketuaPro/HomeKetuaProNavigator";
import HomeCoDivisiNavigator from "../dashboard/co/HomeCoDivisiNavigator";
import HomeAnggotaNavigator from "../dashboard/anggota/HomeAnggotaNavigator";

const Home = () => {
  // const renderNavigator = () => {
  //   switch (role_id) {
  //     case 1:
  //       return <HomeKetumNavigator />;
  //     case 2:
  //       return <HomeKetuaProkerNavigator />;
  //     case 3:
  //       return <HomeCoDivisiNavigator />;
  //     case 4:
  //       return <HomeAnggotaNavigator />;
  //     default:
  //       return <Text>Invalid role</Text>;
  //   }
  // };

  // return <>{renderNavigator()}</>;
  return <HomeAnggotaNavigator />;
};

export default Home;
