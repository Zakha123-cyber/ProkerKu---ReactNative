import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeKetuaPro from "./HomeKetuaProker";
import DetailProkerKetuaPro from "./DetailProkerKetuaPro";
import TambahDivisiProker from "./editDivisi";
import DetailDivisiKetuaProker from "./DetailDivisiKetuaPro";

const Stack = createNativeStackNavigator();

const HomeKetuaProNavigator = ({ route }) => {
  const { role_id, nama, id_user } = route.params;
  console.log("Role ID: ", role_id) // Ambil parameter dari Home
  console.log("Nama : ", nama) // Ambil parameter dari Home
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeKetuaProker" component={HomeKetuaPro} options={{ headerShown: false }} initialParams={{ role_id, nama, id_user }} // Pass data ke HomeKetum
/>
      <Stack.Screen name="DetailProkerKetuaProker" component={DetailProkerKetuaPro} options={{ headerShown: false }} />
      <Stack.Screen name="TambahDivisiProker" component={TambahDivisiProker} options={{ headerShown: false }} />
      <Stack.Screen name="DetailDivisiKetuaProker" component={DetailDivisiKetuaProker} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeKetuaProNavigator;
