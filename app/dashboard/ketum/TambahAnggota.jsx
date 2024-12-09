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

const TambahAnggota = ({ currentUserRole }) => {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [angkatan, setAngkatan] = useState("");

  const handleAddMember = async () => {
    if (
      nama.trim() === "" ||
      nim.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      angkatan.trim() === ""
    ) {
      alert("Semua field harus diisi.");
      return;
    }

    // Set role_id menjadi 4 (anggota)
    const role_id = 4;

    try {
      const newId = await runTransaction(db, async (transaction) => {
        const counterDoc = doc(db, "counters", "users");
        const counterSnapshot = await transaction.get(counterDoc);

        if (!counterSnapshot.exists()) {
          throw new Error("Counter document does not exist!");
        }

        const newId = counterSnapshot.data().id_user + 1;
        transaction.update(counterDoc, { id_user: newId });

        return newId;
      });

      await addDoc(collection(db, "users"), {
        id_user: newId,
        nama,
        nim,
        email,
        password,
        angkatan,
        role_id,
      });
      alert(`Anggota berhasil ditambahkan dengan `);
      setNama("");
      setNim("");
      setEmail("");
      setPassword("");
      setAngkatan("");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Terjadi kesalahan saat menambahkan anggota.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-200">
      <View className="items-center justify-center flex-1">
        <View className="w-11/12 p-6 bg-white border-2 border-green-500 rounded-lg">
          <View className="mb-6">
            <Text
              className="text-2xl text-center text-green-500 font-pextrabold"
              style={{ fontSize: 25 }}
            >
              Tambah Anggota
            </Text>
          </View>
          <View className="space-y-4">
            <View>
              <Text className="text-sm text-green-500 font-pmedium">Nama:</Text>
              <TextInput
                className="p-2 mt-2 text-white bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan nama"
                placeholderTextColor="#888"
                value={nama}
                onChangeText={setNama}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-pmedium">NIM:</Text>
              <TextInput
                className="p-2 mt-2 text-white bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan NIM"
                placeholderTextColor="#888"
                value={nim}
                onChangeText={setNim}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-pmedium">
                Email:
              </Text>
              <TextInput
                className="p-2 mt-2 text-white bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-pmedium">
                Password:
              </Text>
              <TextInput
                className="p-2 mt-2 text-white bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-pmedium">
                Angkatan:
              </Text>
              <TextInput
                className="p-2 mt-2 text-white bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan angkatan"
                placeholderTextColor="#888"
                value={angkatan}
                onChangeText={setAngkatan}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleAddMember}
            className="items-center p-3 mt-6 bg-green-500 rounded-lg"
          >
            <Text className="text-white font-pmedium">Tambah</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TambahAnggota;
