import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, doc, runTransaction } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";

const EditDivisiProker = () => {
  const route = useRoute();
  const { id_proker } = route.params; // Ambil id_proker dari route params
  console.log("ID Proker:", id_proker);

  const [form, setForm] = useState({
    nama_divisi: "",
    deskripsi_divisi: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  // Function to get the next auto-incremented ID for divisi_proker
  const getNextId = async () => {
    const counterRef = doc(db, "counters", "divisi_proker");
    try {
      const newId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);

        if (!counterDoc.exists()) {
          console.log("Dokumen counter tidak ditemukan untuk divisi_proker. Inisialisasi dengan ID: 1");
          transaction.set(counterRef, { id_divisi_proker: 1 });
          return 1;
        }

        const currentId = counterDoc.data().id_divisi_proker;
        if (typeof currentId !== "number") {
          throw new Error("Nilai ID dalam dokumen Firestore tidak valid.");
        }

        const nextId = currentId + 1;
        transaction.update(counterRef, { id_divisi_proker: nextId });
        return nextId;
      });
      return newId;
    } catch (error) {
      console.error("Error mendapatkan ID baru untuk divisi_proker: ", error);
      throw new Error("Gagal mendapatkan ID baru untuk divisi_proker.");
    }
  };

  const handleSaveClick = async () => {
    if (form.nama_divisi.trim() === "" || form.deskripsi_divisi.trim() === "") {
      alert("Semua field harus diisi.");
      return;
    }

    try {
      // Generate the next ID for divisi_proker
      const idDivisiProker = await getNextId();

      // Add data to proker collection
      await addDoc(collection(db, "divisi_proker"), {
        id_divisi_proker: idDivisiProker,
        nama_divisi: form.nama_divisi,
        deskripsi_divisi: form.deskripsi_divisi,
        id_proker: id_proker, // ID proker dari parameter
      });

      console.log("Divisi berhasil ditambahkan, ID Divisi: ", idDivisiProker);
      alert("Divisi berhasil ditambahkan!");
      setForm({ nama_divisi: "", deskripsi_divisi: "" }); // Reset form
    } catch (error) {
      console.error("Error menambahkan dokumen: ", error);
      alert("Gagal menyimpan data.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="mb-6 text-2xl font-bold text-center text-green-600">Edit Divisi Proker</Text>

        <View className="p-4 mb-6 bg-white border border-green-500 rounded-lg shadow-md">
          <Text className="mb-2 text-lg font-semibold text-gray-700">Nama Divisi:</Text>
          <TextInput className="p-3 mb-4 placeholder-gray-400 border border-gray-300 rounded-lg" placeholder="Masukkan nama divisi" placeholderTextColor="#A0AEC0" />

          <Text className="mb-2 text-lg font-semibold text-gray-700">Deskripsi:</Text>
          <TextInput className="h-20 p-3 placeholder-gray-400 border border-gray-300 rounded-lg" placeholder="Masukkan deskripsi divisi" placeholderTextColor="#A0AEC0" multiline textAlignVertical="top" />
        </View>

        <TouchableOpacity className="p-3 bg-green-500 rounded-lg">
          <Text className="text-lg font-semibold text-center text-white">Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditDivisiProker;
