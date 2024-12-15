import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeAnggota from "./HomeAnggota";
import DetailProkerAnggota from "./DetailProkerAnggota";
import DetailDivisiAnggota from "./DetailDivisiAnggota";

const Stack = createNativeStackNavigator();


const HomeAnggotaNavigator = ({ route }) => {
  const { role_id, nama, id_user } = route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeAnggota" component={HomeAnggota} options={{ headerShown: false }} initialParams={{ role_id, nama, id_user }} />
      <Stack.Screen name="DetailProkerAnggota" component={DetailProkerAnggota} options={{ headerShown: false }} />
      <Stack.Screen name="DetailDivisiAnggota" component={DetailDivisiAnggota} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeAnggotaNavigator;
