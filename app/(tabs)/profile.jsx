import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "../../constants/images"; // Pastikan path relatif benar
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const handleLogout = () => {
    router.replace('sign-in');
    // Fix Sign Out
    alert("Logout berhasil!");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">

      <Image
        source={images.logoProker}
        className="absolute top-4 right-4 w-20 h-20"
        resizeMode="contain"
      />
      <Image
        source={images.profile}
        className="w-32 h-32 rounded-full mt-8 border-4 border-green-500"
        resizeMode="contain"
      />
      <View className="border border-green-500 rounded-lg p-4 mt-4 w-full max-w-md shadow-md shadow-green-300">
        <Text className="text-2xl text-gray-800 font-pbold mt-4 text-center">
          Nama Pengguna
        </Text>
        <Text className="text-lg text-gray-600 font-pmedium mt-2 text-center">
          Jabatan Pengguna
        </Text>
        <Text className="text-lg text-gray-600 font-plight mt-2 text-center">
          email@example.com
        </Text>
      </View>
      <View className="border border-green-500 rounded-lg p-4 mt-4 w-full max-w-md shadow-md shadow-green-300">
        <Text className="text-lg text-gray-800 font-psemibold">
          Informasi Tambahan
        </Text>
        <Text className="text-base text-gray-600 font-plight mt-2">
          Ini adalah beberapa informasi tambahan tentang pengguna.
        </Text>
      </View>
      <TouchableOpacity
        className="mt-8 p-3 bg-red-500 rounded w-full max-w-md"
        onPress={handleLogout}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
