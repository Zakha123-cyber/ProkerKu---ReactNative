import React, { useState } from "react";
import { View, Text, Image, ScrollView, Pressable, TextInput, Alert, TouchableOpacity } from "react-native";

const DetailProkerAnggota = () => {
  // Data statis untuk proker
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
      {/* Pembungkus dengan garis hijau */}
      <View className="p-4 border-2 border-green-500 rounded-lg">
        {/* Gambar Proker */}
        <Image source={{ uri: proker.image }} className="w-full mb-4 rounded-lg h-60" resizeMode="cover" />

        {/* Nama Proker */}
        {isEditing ? (
          <TextInput value={proker.nama} onChangeText={(text) => setProker({ ...proker, nama: text })} className="mb-2 text-2xl font-bold border-b-2 border-gray-300" />
        ) : (
          <Text className="mb-2 text-2xl font-bold">{proker.nama}</Text>
        )}

        {/* Timeline */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          {isEditing ? <TextInput value={proker.timeline} onChangeText={(text) => setProker({ ...proker, timeline: text })} className="text-gray-600" /> : <Text className="text-gray-600">Timeline: {proker.timeline}</Text>}
        </View>

        {/* Ketua */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          {isEditing ? <TextInput value={proker.ketua} onChangeText={(text) => setProker({ ...proker, ketua: text })} className="text-gray-600" /> : <Text className="text-gray-600">Ketua: {proker.ketua}</Text>}
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

        {/* Tombol Aksi */}
        <View className="flex-row justify-between pb-3 mt-4 border-b-2 border-gray-300 b-3">
          {isEditing ? (
            <>
              <Pressable className="flex-1 p-2 mr-2 bg-green-500 rounded-lg" onPress={handleSave}>
                <Text className="text-center text-white">Simpan</Text>
              </Pressable>
              <Pressable className="flex-1 p-2 ml-2 bg-gray-500 rounded-lg" onPress={() => setIsEditing(false)}>
                <Text className="text-center text-white">Batal</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable className="flex-1 p-2 mr-2 bg-blue-500 rounded-lg" onPress={() => setIsEditing(true)}>
                <Text className="text-center text-white">Edit Proker</Text>
              </Pressable>
              <Pressable className="flex-1 p-2 ml-2 bg-red-500 rounded-lg" onPress={handleDelete}>
                <Text className="text-center text-white">Hapus Proker</Text>
              </Pressable>
            </>
          )}
        </View>

        {/* {Daftar Divisi} */}
        <View className="mt-5">
          <Text className="text-xl text-center font-pbold">Daftar Divisi</Text>
          <TouchableOpacity className="p-2 mt-4 bg-green-400 rounded-lg">
            <Text className="text-center text-white font-pregular">Divisi Acara</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 mt-4 bg-green-400 rounded-lg">
            <Text className="text-center text-white font-pregular">Divisi Acara</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 mt-4 bg-green-400 rounded-lg">
            <Text className="text-center text-white font-pregular">Divisi Acara</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 mt-4 bg-green-400 rounded-lg">
            <Text className="text-center text-white font-pregular">Divisi Acara</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailProkerAnggota;
