import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, doc, runTransaction } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker

const TambahJobs = () => {
  const route = useRoute();
  const { id_proker, id_divisi } = route.params; // Ambil idDivisi dan idProker dari route params
  console.log("ID Proker:", id_proker);
  console.log("ID Divisi:", id_divisi);

  const [form, setForm] = useState({
    nama_jobdesk: "",
    deskripsi_jobdesk: "",
    deadline: "", // Deadline as a string
    status: false,
  });

  const [showDatePicker, setShowDatePicker] = useState(false); // To show or hide the date picker

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const getNextId = async () => {
    const counterRef = doc(db, "counters", "jobdesk");
    try {
      const newId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);

        if (!counterDoc.exists()) {
          transaction.set(counterRef, { id_jobdesk: 1 });
          return 1;
        }

        const currentId = counterDoc.data().id_jobdesk;
        const nextId = currentId + 1;
        transaction.update(counterRef, { id_jobdesk: nextId });
        return nextId;
      });
      return newId;
    } catch (error) {
      console.error("Error getting next ID: ", error);
      throw new Error("Gagal mendapatkan ID baru.");
    }
  };

  const handleSaveClick = async () => {
    // Check if form fields are empty
    if (
      form.nama_jobdesk.trim() === "" ||
      form.deskripsi_jobdesk.trim() === "" ||
      form.deadline.trim() === ""
    ) {
      Alert.alert("Error", "Semua field harus diisi.");
      return;
    }

    // Log form values
    console.log("Form values:", form);

    // Ensure id_divisi and id_proker are defined
    if (!id_divisi || !id_proker) {
      console.log("ID Divisi or ID Proker is missing:", { id_divisi, id_proker });
      Alert.alert("Error", "ID Divisi atau ID Proker belum diisi.");
      return;
    }

    try {
      const id_jobdesk = await getNextId(); // Ambil ID auto-increment baru
      console.log("Generated jobdesk ID:", id_jobdesk);

      // Store the deadline as a string (e.g., "2024-12-12")
      await addDoc(collection(db, "jobdesk"), {
        id_jobdesk: id_jobdesk, // Simpan ID auto-increment
        nama_jobdesk: form.nama_jobdesk,
        deskripsi_jobdesk: form.deskripsi_jobdesk,
        deadline: form.deadline, // Save as a string
        status: form.status,
        id_proker: id_proker, // Simpan ID Proker
        id_divisi: id_divisi, // Simpan ID Divisi
      });

      alert("Job berhasil ditambahkan!");
      setForm({ nama_jobdesk: "", deskripsi_jobdesk: "", deadline: "", status: false });
    } catch (error) {
      console.error("Error menambahkan dokumen: ", error);
      alert("Gagal menyimpan data.");
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
    setShowDatePicker(false);
    setForm({ ...form, deadline: formattedDate }); // Save formatted date as a string
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="mb-6 text-2xl font-bold text-center text-green-600">Tambah Job</Text>

        <View className="p-4 mb-6 bg-white border border-green-500 rounded-lg shadow-md">
          <Text className="mb-2 text-lg font-semibold text-gray-700">Nama Jobdesk:</Text>
          <TextInput
            className="p-3 mb-4 placeholder-gray-400 border border-gray-300 rounded-lg"
            placeholder="Masukkan nama jobdesk"
            placeholderTextColor="#A0AEC0"
            value={form.nama_jobdesk}
            onChangeText={(text) => handleChange("nama_jobdesk", text)}
          />

          <Text className="mb-2 text-lg font-semibold text-gray-700">Deskripsi:</Text>
          <TextInput
            className="h-20 p-3 mb-4 placeholder-gray-400 border border-gray-300 rounded-lg"
            placeholder="Masukkan deskripsi jobdesk"
            placeholderTextColor="#A0AEC0"
            value={form.deskripsi_jobdesk}
            onChangeText={(text) => handleChange("deskripsi_jobdesk", text)}
            multiline
            textAlignVertical="top"
          />

          <Text className="mb-2 text-lg font-semibold text-gray-700">Deadline:</Text>
          <TouchableOpacity
            className="p-3 mb-4 placeholder-gray-400 border border-gray-300 rounded-lg"
            onPress={() => setShowDatePicker(true)} // Show DateTimePicker
          >
            <Text className="text-gray-600">
              {form.deadline || "Pilih tanggal"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={new Date(form.deadline || new Date())} // Use form.deadline or current date
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <TouchableOpacity className="p-3 bg-green-500 rounded-lg" onPress={handleSaveClick}>
          <Text className="text-lg font-semibold text-center text-white">Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TambahJobs;
