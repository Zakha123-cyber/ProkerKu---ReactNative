import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "../../constants/images"; // Pastikan path relatif benar
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const Profile = () => {
  // const { role_id, nama, id_user } = useLocalSearchParams();
  //   // const params = { role_id, nama, id_user };
  //   console.log("Role ID Profile Bro: ", role_id);
  //   console.log("Role ID Profile Bro2 : ", nama);
  //   console.log("Role Profile Bro3 : ", id_user);
  const handleLogout = () => {
    // ini nanti be
    alert("Logout berhasil!");
    router.replace("/");
  };

  return (
    <View className="items-center justify-center flex-1 p-4 bg-white">
      <Image source={images.logoProker} className="absolute w-20 h-20 top-4 right-4" resizeMode="contain" />
      <Image source={images.profile} className="w-32 h-32 mt-8 border-4 border-green-500 rounded-full" resizeMode="contain" />
      <View className="w-full max-w-md p-4 mt-4 border border-green-500 rounded-lg shadow-md shadow-green-300">
        <Text className="mt-4 text-2xl text-center text-gray-800 font-pbold">Zakha Aditya</Text>
        <Text className="mt-2 text-lg text-center text-gray-600 font-pmedium">Divisi Litbang</Text>
        <Text className="mt-2 text-lg text-center text-gray-600 font-plight">email@example.com</Text>
      </View>
      <View className="w-full max-w-md p-4 mt-4 border border-green-500 rounded-lg shadow-md shadow-green-300">
        <Text className="text-lg text-gray-800 font-psemibold">Informasi Tambahan</Text>
        <Text className="mt-2 text-base text-gray-600 font-plight">Ini adalah beberapa informasi tambahan tentang pengguna.</Text>
      </View>
      <TouchableOpacity className="w-full max-w-md p-3 mt-8 bg-red-500 rounded" onPress={handleLogout}>
        <Text className="text-lg font-semibold text-center text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
