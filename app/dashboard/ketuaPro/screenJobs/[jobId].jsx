import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

const jobs = {
  1: {
    id: 1,
    title: "Developer",
    description: "Mengembangkan aplikasi mobile",
  },
  2: {
    id: 2,
    title: "System Analyst",
    description: "Menganalisis sistem yang ada",
  },
  3: { id: 3, title: "Akuntan", description: "Mengelola laporan keuangan" },
  4: {
    id: 4,
    title: "Financial Analyst",
    description: "Menganalisis data keuangan",
  },
  5: {
    id: 5,
    title: "HR Manager",
    description: "Mengelola sumber daya manusia",
  },
  6: { id: 6, title: "Recruiter", description: "Merekrut karyawan baru" },
  7: {
    id: 7,
    title: "Marketing Manager",
    description: "Mengelola strategi pemasaran",
  },
  8: {
    id: 8,
    title: "Content Creator",
    description: "Membuat konten pemasaran",
  },
};

const JobDetail = () => {
  const router = useRouter();
  const { jobId } = router.query;

  if (!jobId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-lg">
          Pekerjaan tidak ditemukan.
        </Text>
      </View>
    );
  }

  const job = jobs[jobId];

  if (!job) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-lg">
          Pekerjaan tidak ditemukan.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-green-500 py-4 px-6 mb-4 rounded-b-lg">
        <Text className="text-white text-lg font-bold text-center">
          {job.title}
        </Text>
      </View>
      <ScrollView className="px-6">
        <View className="bg-white py-4 px-6 mb-2 rounded-lg shadow-md">
          <Text className="text-lg font-bold">{job.title}</Text>
          <Text className="text-sm text-gray-600">{job.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default JobDetail;
