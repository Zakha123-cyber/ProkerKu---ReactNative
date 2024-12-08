import { View, Text, Image, ScrollView, Pressable, TextInput, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { Link } from "expo-router";
import ListJobdeskProker from "./ListJobdeskProker";

const DetailDivisiPage = () => {
  const initialProker = {
    image: "https://via.placeholder.com/400", // Ganti dengan URL gambar yang sesuai
    nama: "Pengembangan Aplikasi Mobile",
    timeline: "1 Januari 2023 - 31 Maret 2023",
    ketua: "Budi Santoso",
    anggota: ["Siti Aminah", "Joko Widodo", "Rina Susanti"],
  };
  const [proker, setProker] = useState(initialProker);
  const [isEditing, setIsEditing] = useState(false);
  const [newAnggota, setNewAnggota] = useState("");

  // Fungsi untuk menghapus proker
  const handleDelete = () => {
    Alert.alert("Hapus Proker", "Apakah Anda yakin ingin menghapus proker ini?", [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", onPress: () => console.log("Proker dihapus") },
    ]);
  };

  // Fungsi untuk menyimpan perubahan
  const handleSave = () => {
    setIsEditing(false);
    console.log("Proker disimpan:", proker);
    // Di sini Anda bisa menambahkan logika untuk menyimpan perubahan ke database atau state global
  };

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

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="p-4 border-2 rounded-lg border-">
        <View className="pb-3 mx-6 rounded-lg">
          <Text className="text-2xl text-center text-green-500 font-pextrabold">Detail Divisi</Text>
          <Text className="text-3xl text-center text-gray-600 font-pextrabold">Acara</Text>
        </View>

        {/* CO */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          {isEditing ? <TextInput value={proker.ketua} onChangeText={(text) => setProker({ ...proker, ketua: text })} className="text-gray-600" /> : <Text className="text-gray-600">CO Divisi: {proker.ketua}</Text>}
        </View>

        {/* Anggota */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          <Text className="mb-1 text-gray-600">Anggota:</Text>
          {proker.anggota.map((anggota, index) => (
            <View key={index} className="flex-row items-center mb-1 justify between">
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
        <View className="pb-3 mx-6 mt-10 rounded-lg">
          <Text className="text-3xl text-center text-gray-600 font-pextrabold">JOBDESK</Text>
        </View>
      </View>
      
      {/* {LIST JOBDESK} */}
      <ListJobdeskProker/>
    </ScrollView>
  );
};

export default DetailDivisiPage;
