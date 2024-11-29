// import React from "react";
// import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";

// const jobs = [
//   { id: 1, title: "Developer", description: "Mengembangkan aplikasi mobile" },
//   {
//     id: 2,
//     title: "System Analyst",
//     description: "Menganalisis sistem yang ada",
//   },
//   { id: 3, title: "Akuntan", description: "Mengelola laporan keuangan" },
//   {
//     id: 4,
//     title: "Financial Analyst",
//     description: "Menganalisis data keuangan",
//   },
//   { id: 5, title: "HR Manager", description: "Mengelola sumber daya manusia" },
//   { id: 6, title: "Recruiter", description: "Merekrut karyawan baru" },
//   {
//     id: 7,
//     title: "Marketing Manager",
//     description: "Mengelola strategi pemasaran",
//   },
//   { id: 8, title: "Content Creator", description: "Membuat konten pemasaran" },
// ];

// const ScreenJobs = () => {
//   const router = useRouter();

//   const handleJobPress = (jobId) => {
//     router.push(`/dashboard/ketuaPro/screenJobs/${jobId}`);
//   };

//   return (
//     <View className="flex-1 bg-gray-100">
//       <View className="bg-green-500 py-4 px-6 mb-4 rounded-b-lg">
//         <Text className="text-white text-lg font-bold text-center">
//           Daftar Pekerjaan
//         </Text>
//       </View>
//       <ScrollView className="px-6">
//         {jobs.map((job) => (
//           <TouchableOpacity
//             key={job.id}
//             onPress={() => handleJobPress(job.id)}
//             className="bg-white py-4 px-6 mb-2 rounded-lg shadow-md"
//           >
//             <Text className="text-lg font-bold">{job.title}</Text>
//             <Text className="text-sm text-gray-600">{job.description}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default ScreenJobs;
