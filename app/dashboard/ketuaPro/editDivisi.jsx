import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, doc, runTransaction } from "firebase/firestore";

const EditDivisiProker = () => {
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

  // Function to get the next auto-incremented ID for detail_kepanitiaan
  const getNextIdForDetailKepanitiaan = async () => {
    const counterRef = doc(db, "counters", "detail_kepanitiaan");
    try {
      const newId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);

        if (!counterDoc.exists()) {
          console.log("Dokumen counter tidak ditemukan untuk detail_kepanitiaan. Inisialisasi dengan ID: 1");
          transaction.set(counterRef, { id_detail_kepanitiaan: 1 });
          return 1;
        }

        const currentId = counterDoc.data().id_detail_kepanitiaan;
        if (typeof currentId !== "number") {
          throw new Error("Nilai ID dalam dokumen Firestore tidak valid.");
        }

        // Log the ID before incrementing
        console.log("ID saat ini untuk detail_kepanitiaan sebelum ditambah:", currentId);

        const nextId = currentId + 1;
        transaction.update(counterRef, { id_detail_kepanitiaan: nextId });

        // Log the new incremented ID
        console.log("ID baru untuk detail_kepanitiaan setelah ditambah:", nextId);

        return nextId;
      });
      return newId;
    } catch (error) {
      console.error("Error mendapatkan ID baru untuk detail_kepanitiaan: ", error);
      throw new Error("Gagal mendapatkan ID baru untuk detail_kepanitiaan.");
    }
  };

  const handleSaveClick = async () => {
    if (form.nama_divisi.trim() === "" || form.deskripsi_divisi.trim() === "") {
      alert("Semua field harus diisi.");
      return;
    }

    try {
      // Generate the next IDs for divisi_proker and detail_kepanitiaan
      const idDivisiProker = await getNextId();
      const idDetailKepanitiaan = await getNextIdForDetailKepanitiaan();

      // Add data to divisi_proker collection
      const divisiProkerRef = await addDoc(collection(db, "divisi_proker"), {
        id_divisi_proker: idDivisiProker,
        nama_divisi_proker: form.nama_divisi,
        deskripsi_divisi_proker: form.deskripsi_divisi,
      });
      console.log("Divisi berhasil ditambahkan, ID Divisi: ", idDivisiProker);

      // Add data to detail_kepanitiaan collection
      const idProker = 1;  // ID proker set to 1 (can be dynamic as needed)
      const detailKepanitiaanRef = await addDoc(collection(db, "detail_kepanitiaan_proker"), {
        id_detail_kepanitiaan: idDetailKepanitiaan,
        id_proker: idProker,
        id_divisi_proker: idDivisiProker, 
      });

      console.log("Data untuk detail_kepanitiaan berhasil ditambahkan");

      alert("Divisi berhasil ditambahkan!");
      setForm({ nama_divisi: "", deskripsi_divisi: "" }); // Reset form
    } catch (error) {
      console.error("Error menambahkan dokumen: ", error);
      alert("Gagal menyimpan data.");
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}>
        <Text className="text-2xl font-bold text-center mb-4 text-green-600">Edit Divisi Proker</Text>

        <View className="border border-green-500 rounded-lg p-4 bg-white mb-4 shadow-md">
          <Text className="text-gray-700 text-lg font-semibold">Nama Divisi:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mt-1 placeholder-gray-400"
            placeholder="Masukkan nama divisi"
            placeholderTextColor="#A0AEC0"
            value={form.nama_divisi}
            onChangeText={(text) => handleChange("nama_divisi", text)}
          />

          <Text className="text-gray-700 text-lg font-semibold mt-2">Deskripsi:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mt-1 h-16 placeholder-gray-400"
            placeholder="Masukkan deskripsi divisi"
            placeholderTextColor="#A0AEC0"
            value={form.deskripsi_divisi}
            onChangeText={(text) => handleChange("deskripsi_divisi", text)}
            multiline
          />
        </View>

        <TouchableOpacity className="bg-green-500 rounded-lg p-3" onPress={handleSaveClick}>
          <Text className="text-white text-center font-semibold text-lg">Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditDivisiProker;
