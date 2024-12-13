import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "../../constants/images"; // Pastikan path relatif benar
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "../../context/UserContext";

const Profile = () => {
  const { user } = useUser();

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
        <Text className="mt-4 text-2xl text-center text-gray-800 font-pbold">{user.nama}</Text>
        <Text className="mt-2 text-lg text-center text-gray-600 font-pmedium">{user.divisi}</Text>
        <Text className="mt-2 text-lg text-center text-gray-600 font-plight">{user.email}</Text>
      </View>
      <View className="w-full max-w-md p-4 mt-4 border border-green-500 rounded-lg shadow-md shadow-green-300">
        <Text className="text-lg text-gray-800 font-psemibold">Informasi Tambahan</Text>
        <Text className="mt-2 text-base text-gray-600 font-plight">Himpunan Mahasiswa Informatika adalah Himpunan yang berdiri di prodi Informatika Fakultas Ilmu Komputer Unej, HMIF berdiri pada tanggal 18 Agustus 2017. </Text>
      </View>
      <TouchableOpacity className="w-full max-w-md p-3 mt-8 bg-red-500 rounded" onPress={handleLogout}>
        <Text className="text-lg font-semibold text-center text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
