import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useSearchParams } from "expo-router";

// Data pekerjaan untuk setiap divisi
const jobs = [
  { id: 1, title: "Frontend Developer", description: "Membangun antarmuka web.", division: "Teknologi Informasi" },
  { id: 2, title: "Backend Developer", description: "Mengelola server dan database.", division: "Teknologi Informasi" },
  { id: 3, title: "Akuntan", description: "Mengelola laporan keuangan.", division: "Keuangan" },
  { id: 4, title: "HR Specialist", description: "Rekrutmen dan manajemen karyawan.", division: "Sumber Daya Manusia" },
  { id: 5, title: "Marketing Specialist", description: "Strategi pemasaran produk.", division: "Pemasaran" },
];

// Fungsi untuk memfilter pekerjaan berdasarkan divisi
const getJobsByDivision = (divisionName) => jobs.filter((job) => job.division === divisionName);

const ScreenJobs = () => {
  const { divisionName } = useSearchParams(); // Mendapatkan nama divisi dari URL

  // Dekode nama divisi agar spasi dan karakter lainnya diterjemahkan dengan benar
  const decodedDivisionName = decodeURIComponent(divisionName); 

  const divisionJobs = getJobsByDivision(decodedDivisionName); // Mengambil pekerjaan berdasarkan divisi

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-green-500 py-4 px-6 mb-4 rounded-b-lg">
        <Text className="text-white text-lg font-bold text-center">{decodedDivisionName}</Text>
      </View>
      <ScrollView className="px-6">
        {divisionJobs.length > 0 ? (
          divisionJobs.map((job) => (
            <TouchableOpacity
              key={job.id}
              onPress={() => Alert.alert("Detail Pekerjaan", `${job.title}\n\n${job.description}`)}
              className="bg-white py-4 px-6 mb-2 rounded-lg shadow-md"
            >
              <Text className="text-lg font-bold">{job.title}</Text>
              <Text className="text-sm text-gray-600">{job.description}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg">Tidak ada pekerjaan.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ScreenJobs;
