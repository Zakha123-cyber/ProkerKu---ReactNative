import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { Checkbox } from 'react-native-paper'; // Import Checkbox dari react-native-paper

const JobList = () => {
  const route = useRoute();
  const { idProker, idDivisi } = route.params;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idProker || !idDivisi) {
      Alert.alert("Parameter Tidak Valid", "idProker dan idDivisi harus disediakan.");
      setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      try {
        const q = query(
          collection(db, "jobdesk"),
          where("id_proker", "==", idProker),
          where("id_divisi", "==", idDivisi)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const jobList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setJobs(jobList);
        } else {
          Alert.alert("Tidak ada pekerjaan", "Tidak ada pekerjaan yang ditemukan untuk Proker dan Divisi yang dipilih.");
        }
      } catch (error) {
        console.error("Error saat mengambil jobdesk:", error);
        Alert.alert("Error", "Gagal mengambil data pekerjaan.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [idProker, idDivisi]);

  const updateStatus = async (jobId, currentStatus) => {
    try {
      const jobRef = doc(db, "jobdesk", jobId);

      // Memperbarui status di Firebase
      await updateDoc(jobRef, {
        status: !currentStatus,
      });

      // Update state jobs agar UI langsung menampilkan perubahan status
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, status: !currentStatus } : job
        )
      );

      console.log("Status berhasil diperbarui.");
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
      Alert.alert("Error", "Gagal memperbarui status pekerjaan.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="mb-6 text-2xl font-bold text-center text-green-600">Daftar Jobdesk</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#48BB78" />
        ) : jobs.length === 0 ? (
          <Text className="text-center text-lg text-gray-700">No jobdesk available for this Proker and Divisi.</Text>
        ) : (
          jobs.map((job) => (
            <View key={job.id} className="p-4 mb-6 bg-white border border-green-500 rounded-lg shadow-md">
              <Text className="text-xl font-semibold text-gray-800">{job.nama_jobdesk}</Text>
              <Text className="text-lg text-gray-600 mb-2">{job.deskripsi_jobdesk}</Text>
              <Text className="text-gray-500">Deadline: {job.deadline}</Text>

              {/* Checkbox untuk status */}
              <View className="flex-row items-center mt-2">
                <Text className="text-gray-500 mr-2">Status:</Text>
                <Checkbox
                  status={job.status ? 'checked' : 'unchecked'}
                  onPress={() => updateStatus(job.id, job.status)} // Memperbarui status di Firebase dan langsung update UI
                />
                {job.status && <Text className="text-gray-500">Done</Text>}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobList;
