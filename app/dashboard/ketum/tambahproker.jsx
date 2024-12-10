import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { db } from "../../../firebaseConfig"; // Pastikan path relatif benar
import { collection, addDoc, doc, runTransaction } from "firebase/firestore";

const TambahProker = () => {
  const [nama_proker, setNamaProker] = useState("");
  const [deskripsi_proker, setDeskripsiProker] = useState("");
  const [tanggal_pelaksanaan, setTanggalPelaksanaan] = useState("");
  const [gambar, setGambar] = useState("");

  const handleAddProker = async () => {
    if (
      nama_proker.trim() === "" ||
      deskripsi_proker.trim() === "" ||
      tanggal_pelaksanaan.trim() === "" ||
      gambar.trim() === ""
    ) {
      alert("Semua field harus diisi.");
      return;
    }

    try {
      const newId = await runTransaction(db, async (transaction) => {
        const counterDoc = doc(db, "counters", "proker");
        const counterSnapshot = await transaction.get(counterDoc);

        if (!counterSnapshot.exists()) {
          throw new Error("Counter document does not exist!");
        }

        const newId = counterSnapshot.data().id_proker + 1;
        transaction.update(counterDoc, { id_proker: newId });

        return newId;
      });

      await addDoc(collection(db, "proker"), {
        id_proker: newId,
        nama_proker,
        deskripsi_proker,
        tanggal_pelaksanaan,
        gambar,
      });

      alert("Proker berhasil ditambahkan!");
      setNamaProker("");
      setDeskripsiProker("");
      setTanggalPelaksanaan("");
      setGambar("");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Terjadi kesalahan saat menambahkan proker.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-200">
      <View className="items-center justify-center flex-1">
        <View className="w-11/12 p-6 bg-white border-2 border-green-500 rounded-lg">
          <View className="mb-6">
            <Text
              className="text-2xl text-center text-green-500 font-extrabold"
              style={{ fontSize: 25 }}
            >
              Tambah Program Kerja
            </Text>
          </View>
          <View className="space-y-4">
            <View>
              <Text className="text-sm text-green-500 font-medium">
                Nama Proker:
              </Text>
              <TextInput
                className="p-2 mt-2 text-black bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan nama proker"
                placeholderTextColor="#888"
                value={nama_proker}
                onChangeText={setNamaProker}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-medium">
                Deskripsi Proker:
              </Text>
              <TextInput
                className="p-2 mt-2 text-black bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan deskripsi"
                placeholderTextColor="#888"
                value={deskripsi_proker}
                onChangeText={setDeskripsiProker}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-medium">
                Tanggal Pelaksanaan:
              </Text>
              <TextInput
                className="p-2 mt-2 text-black bg-gray-300 border border-green-500 rounded"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#888"
                value={tanggal_pelaksanaan}
                onChangeText={setTanggalPelaksanaan}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-medium">
                Gambar (URL):
              </Text>
              <TextInput
                className="p-2 mt-2 text-black bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan URL gambar"
                placeholderTextColor="#888"
                value={gambar}
                onChangeText={setGambar}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleAddProker}
            className="items-center p-3 mt-6 bg-green-500 rounded-lg"
          >
            <Text className="text-white font-medium">Tambah</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TambahProker;
