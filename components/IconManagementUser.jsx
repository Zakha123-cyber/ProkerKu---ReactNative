import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "../constants";

const IconManagementUser = () => {
  return (
    <View>
      <Link href="/dashboard/ketum/manajemenAnggota" asChild>
        <TouchableOpacity className="flex items-center w-full">
          <Image source={icons.profile} className="w-5 h-5" resizeMode="contain" />
          <Text className="text-center text-gray-400 font-pregular">Management User</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default IconManagementUser;
