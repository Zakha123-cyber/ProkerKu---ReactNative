import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeKetum from "./HomeKetum";
import DetailProkerKetum from "./DetailProkerKetum";
import DetailDivisiKetum from "./DetailDivisiKetum";

const Stack = createNativeStackNavigator();


const HomeKetumNavigator = ({ route }) => {
  const { role_id, nama, id_user } = route.params;
  console.log("Role ID: ", role_id) // Ambil parameter dari Home
  console.log("Nama : ", nama) // Ambil parameter dari Home

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeKetum" component={HomeKetum} options={{ headerShown: false }} />
      <Stack.Screen name="DetailProkerKetum" component={DetailProkerKetum} options={{ headerShown: false }} />
      <Stack.Screen name="DetailDivisiKetum" component={DetailDivisiKetum} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeKetumNavigator;
