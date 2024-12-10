import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeAnggota from "./HomeAnggota";
import DetailProkerAnggota from "./DetailProkerAnggota";

const Stack = createNativeStackNavigator();


const HomeKetuaProNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeAnggota" component={HomeAnggota} options={{ headerShown: false }} />
      <Stack.Screen name="DetailProkerAnggota" component={DetailProkerAnggota} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeKetuaProNavigator;
