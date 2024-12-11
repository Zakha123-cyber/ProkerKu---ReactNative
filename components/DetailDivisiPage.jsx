import { View, Text, ScrollView, TextInput, Alert, Pressable, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import ListJobdeskProker from "./ListJobdeskProker";

const DetailDivisiPage = ({ idDivisi, idProker, deskripsiDivisi }) => {
  console.log("ID Divisi:", idDivisi);
  console.log("ID Proker:", idProker);
  console.log("Deskripsi Divisi:", deskripsiDivisi);
  const [userData, setUserData] = useState(null); // Data user CO Divisi
  const [loading, setLoading] = useState(true); // Indikator loading
  const [proker, setProker] = useState({
    nama: "Pengembangan Aplikasi Mobile",
    timeline: "1 Januari 2023 - 31 Maret 2023",
    ketua: "Budi Santoso",
    anggota: ["Siti Aminah", "Joko Widodo", "Rina Susanti"],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newAnggota, setNewAnggota] = useState("");
  const [namaDivisi, setNamaDivisi] = useState(""); // Nama Divisi

  // Fetch data CO Divisi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const divisiProkerRef = collection(db, "divisi_proker");
        const divisiQuery = query(divisiProkerRef, where("id_proker", "==", idProker), where("id_divisi_proker", "==", idDivisi));

        const divisiSnapshot = await getDocs(divisiQuery);
        if (divisiSnapshot.empty) {
          console.error("Divisi Proker tidak ditemukan");
          setLoading(false);
          return;
        }

        const divisiData = divisiSnapshot.docs[0].data();
        const coDivisiId = divisiData.co_divisi;
        const fetchedNamaDivisi = divisiData.nama_divisi;

        setNamaDivisi(fetchedNamaDivisi || "Nama divisi tidak tersedia");

        console.log("Data Divisi Proker:", divisiData);
        console.log("ID CO Divisi:", coDivisiId);
        console.log("Nama Divisi:", fetchedNamaDivisi);

        if (!coDivisiId) {
          console.error("CO Divisi tidak ditemukan");
          setLoading(false);
          return;
        }

        // Fetch data user berdasarkan ID CO Divisi
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("id_user", "==", coDivisiId));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data(); // Ambil data user
          setUserData(userData);
        } else {
          console.error("User tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idProker, idDivisi]);

  // Fungsi untuk menambah anggota
  const addAnggota = () => {
    if (newAnggota.trim() === "") {
      Alert.alert("Error", "Nama anggota tidak boleh kosong.");
      return;
    }
    setProker((prevProker) => ({
      ...prevProker,
      anggota: [...prevProker.anggota, newAnggota],
    }));
    setNewAnggota("");
  };

  // Fungsi untuk menghapus anggota
  const removeAnggota = (index) => {
    setProker((prevProker) => {
      const updatedAnggota = prevProker.anggota.filter((_, i) => i !== index);
      return { ...prevProker, anggota: updatedAnggota };
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="p-4 border-2 rounded-lg">
        <View className="pb-3 mx-6 rounded-lg">
          <Text className="text-2xl text-center text-green-500 font-pextrabold">Detail Divisi</Text>
          <Text className="text-3xl text-center text-gray-600 font-pextrabold">{namaDivisi}</Text>
        </View>

        {/* CO Divisi */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          <Text className="text-gray-600">CO Divisi: {userData ? userData.nama : "Data tidak ditemukan"}</Text>
        </View>

        {/* Anggota */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          <Text className="mb-1 text-gray-600">Anggota:</Text>
          {proker.anggota.map((anggota, index) => (
            <View key={index} className="flex-row items-center justify-between mb-1">
              <Text className="text-gray-500">
                {index + 1}. {anggota}
              </Text>
              {isEditing && (
                <Pressable onPress={() => removeAnggota(index)}>
                  <Text className="text-red-500">Hapus</Text>
                </Pressable>
              )}
            </View>
          ))}
          {isEditing && (
            <View className="flex-row mb-4">
              <TextInput value={newAnggota} onChangeText={setNewAnggota} placeholder="Nama Anggota Baru" className="flex-1 mr-2 border-b-2 border-gray-300" />
              <Pressable className="p-2 bg-green-500 rounded-lg" onPress={addAnggota}>
                <Text className="text-white">Tambah</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Jobdesk */}
        <View className="pb-3 mx-6 mt-10 rounded-lg">
          <Text className="text-3xl text-center text-green-600 font-pextrabold">JOBDESK</Text>
        </View>
        <ListJobdeskProker />
      </View>
    </ScrollView>
  );
};

export default DetailDivisiPage;
