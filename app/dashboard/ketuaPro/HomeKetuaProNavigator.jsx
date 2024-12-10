import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeKetuaPro from "./HomeKetuaProker";
import DetailProkerKetuaPro from "./DetailProkerKetuaPro";

const Stack = createNativeStackNavigator();


const HomeKetuaProNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeKetuaProker" component={HomeKetuaPro} options={{ headerShown: false }} />
      <Stack.Screen name="DetailProkerKetuaProker" component={DetailProkerKetuaPro} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeKetuaProNavigator;
