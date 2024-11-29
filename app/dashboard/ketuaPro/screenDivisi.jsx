import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// Daftar divisi dalam bentuk data statis
const divisions = [
  { id: 1, name: "Teknologi Informasi" },
  { id: 2, name: "Keuangan" },
  { id: 3, name: "Sumber Daya Manusia" },
  { id: 4, name: "Pemasaran" },
];

// Fungsi untuk menangani saat divisi dipilih
const handleDivisionPress = (router, divisionName) => {
  const encodedName = encodeURIComponent(divisionName); // Mengencode nama divisi dengan benar
  router.push(`/dashboard/ketuaPro/screenJobs/${encodedName}`);
};

const ScreenDivisi = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-blue-500 py-4 px-6 mb-4 rounded-b-lg">
        <Text className="text-white text-lg font-bold text-center">
          Pilih Divisi
        </Text>
      </View>
      <View className="px-6">
        {divisions.map((division) => (
          <TouchableOpacity
            key={division.id}
            onPress={() => handleDivisionPress(router, division.name)} // Menavigasi ke screenJobs dengan divisi
            className="bg-white py-4 px-6 mb-2 rounded-lg shadow-md"
          >
            <Text className="text-lg font-bold">{division.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ScreenDivisi;
