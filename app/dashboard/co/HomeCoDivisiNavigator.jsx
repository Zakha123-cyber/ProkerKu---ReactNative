import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeCoDivisi from "./HomeCoDivisi";
import DetailProkerCoDivisi from "./DetailProkerCoDivisi";

const Stack = createNativeStackNavigator();


const HomeKetuaProNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeCoDivisi" component={HomeCoDivisi} options={{ headerShown: false }} />
      <Stack.Screen name="DetailProkerCoDivisi" component={DetailProkerCoDivisi} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeKetuaProNavigator;
