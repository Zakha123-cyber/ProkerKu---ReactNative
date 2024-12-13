import { Image, View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import { useLocalSearchParams } from "expo-router";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="h-7 w-7" />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { role_id, nama, id_user } = useLocalSearchParams(); // Ambil parameter dari router.push
  console.log("passing data 1", role_id);
  console.log("passing data 2", nama);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#00FF9C",
            borderTopWidth: 1,
            borderTopColor: "#00FF9C",
            height: 75,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />,
          }}
          initialParams={{ role_id, nama, id_user }} // Pass parameter ke profile
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
