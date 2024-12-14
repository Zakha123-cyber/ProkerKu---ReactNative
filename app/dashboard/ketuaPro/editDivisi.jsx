import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, doc, runTransaction, getDocs } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";

const EditDivisiProker = () => {
  const route = useRoute();
  const { id_proker } = route.params; // Ambil id_proker dari route params
  console.log("ID Proker:", id_proker);

  const [form, setForm] = useState({
    nama_divisi: "",
    deskripsi_divisi: "",
    co_divisi: "", // Field tambahan untuk menyimpan ID user
  });

  const [users, setUsers] = useState([]); // Menyimpan daftar user untuk dropdown

  useEffect(() => {
    // Mengambil daftar user dari Firestore
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users")); // Ganti "users" dengan nama koleksi user Anda
        const userList = querySnapshot.docs.map((doc) => ({
          label: doc.data().nama, // Nama user untuk ditampilkan di dropdown
          value: doc.data().id_user, // ID user untuk disimpan
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
        alert("Gagal mengambil data user.");
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const getNextId = async () => {
    const counterRef = doc(db, "counters", "divisi_proker");
    try {
      const newId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);

        if (!counterDoc.exists()) {
          transaction.set(counterRef, { id_divisi_proker: 1 });
          return 1;
        }

        const currentId = counterDoc.data().id_divisi_proker;
        const nextId = currentId + 1;
        transaction.update(counterRef, { id_divisi_proker: nextId });
        return nextId;
      });
      return newId;
    } catch (error) {
      console.error("Error getting next ID: ", error);
      throw new Error("Gagal mendapatkan ID baru.");
    }
  };

  const handleSaveClick = async () => {
    if (form.nama_divisi.trim() === "" || form.deskripsi_divisi.trim() === "" || form.co_divisi === "") {
      Alert.alert("Error", "Semua field harus diisi.");
      return;
    }

    try {
      // Dapatkan ID Divisi Proker (Auto Increment)
      const idDivisiProker = await getNextId();

      // Tambahkan data ke koleksi `divisi_proker`
      await addDoc(collection(db, "divisi_proker"), {
        id_divisi_proker: idDivisiProker,
        nama_divisi: form.nama_divisi,
        deskripsi_divisi: form.deskripsi_divisi,
        id_proker: id_proker, // Simpan ID Proker
        co_divisi: form.co_divisi, // Simpan ID User sebagai CO Divisi
      });

      console.log("Divisi berhasil ditambahkan, ID Divisi: ", idDivisiProker);

      // Dapatkan ID Kepanitiaan Proker (Auto Increment)
      const getNextKepanitiaanId = async () => {
        const counterRef = doc(db, "counters", "detail_kepanitiaan_proker");
        try {
          const newId = await runTransaction(db, async (transaction) => {
            const counterDoc = await transaction.get(counterRef);

            if (!counterDoc.exists()) {
              transaction.set(counterRef, { id_kepanitiaan_proker: 1 });
              return 1;
            }

            const currentId = counterDoc.data().id_kepanitiaan_proker;
            const nextId = currentId + 1;
            transaction.update(counterRef, { id_kepanitiaan_proker: nextId });
            return nextId;
          });
          return newId;
        } catch (error) {
          console.error("Error getting next Kepanitiaan ID: ", error);
          throw new Error("Gagal mendapatkan ID baru untuk detail kepanitiaan.");
        }
      };

      const idKepanitiaanProker = await getNextKepanitiaanId();

      // Tambahkan data ke koleksi `detail_kepanitiaan_proker`
      await addDoc(collection(db, "detail_kepanitiaan_proker"), {
        id_kepanitiaan_proker: idKepanitiaanProker,
        id_proker: id_proker,
        id_divisi_proker: idDivisiProker,
        id_user: form.co_divisi, // ID User yang dipilih sebagai CO Divisi
        role_proker: "Co Divisi", // Tetapkan role sebagai "Co Divisi"
      });

      console.log("Detail kepanitiaan berhasil ditambahkan, ID Kepanitiaan: ", idKepanitiaanProker);

      alert("Divisi dan detail kepanitiaan berhasil ditambahkan!");

      // Reset form setelah sukses
      setForm({ nama_divisi: "", deskripsi_divisi: "", co_divisi: "" });
    } catch (error) {
      console.error("Error saat menyimpan data: ", error);
      alert("Gagal menyimpan data.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="mb-6 text-2xl font-bold text-center text-green-600">Edit Divisi Proker</Text>

        <View className="p-4 mb-6 bg-white border border-green-500 rounded-lg shadow-md">
          <Text className="mb-2 text-lg font-semibold text-gray-700">Nama Divisi:</Text>
          <TextInput
            className="p-3 mb-4 placeholder-gray-400 border border-gray-300 rounded-lg"
            placeholder="Masukkan nama divisi"
            placeholderTextColor="#A0AEC0"
            value={form.nama_divisi}
            onChangeText={(text) => handleChange("nama_divisi", text)}
          />

          <Text className="mb-2 text-lg font-semibold text-gray-700">Deskripsi:</Text>
          <TextInput
            className="h-20 p-3 mb-4 placeholder-gray-400 border border-gray-300 rounded-lg"
            placeholder="Masukkan deskripsi divisi"
            placeholderTextColor="#A0AEC0"
            value={form.deskripsi_divisi}
            onChangeText={(text) => handleChange("deskripsi_divisi", text)}
            multiline
            textAlignVertical="top"
          />

          <Text className="mb-2 text-lg font-semibold text-gray-700">Pilih CO Divisi:</Text>
          <RNPickerSelect
            onValueChange={(value) => handleChange("co_divisi", value)}
            items={users}
            placeholder={{ label: "Pilih CO Divisi", value: "" }}
            style={{
              inputAndroid: {
                backgroundColor: "#F3F4F6",
                borderColor: "#D1D5DB",
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                color: "#4B5563",
              },
              inputIOS: {
                backgroundColor: "#F3F4F6",
                borderColor: "#D1D5DB",
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                color: "#4B5563",
              },
            }}
          />
        </View>

        <TouchableOpacity className="p-3 bg-green-500 rounded-lg" onPress={handleSaveClick}>
          <Text className="text-lg font-semibold text-center text-white">Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditDivisiProker;
