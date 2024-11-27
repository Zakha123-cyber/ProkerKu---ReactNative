import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../../components/FormField"; 
import { Feather } from '@expo/vector-icons'; 

const editDivisi = () => {
  const [form, setForm] = useState({
    judul: '',
    Deskripsi: '',
    Deadline: '',
  });

  const handleSaveClick = () => {
    alert("Divisi berhasil diperbarui!");
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl font-bold text-center mb-6">Edit Divisi</Text>

        {/* Wrapper for each input field */}
        <View className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          <FormField
            title="Nama Divisi"
            value={form.judul}
            placeholder="Masukan Nama Divisi"
            handleChangeText={(e) => setForm({ ...form, judul: e })}
            otherStyles={"mt-2"}
          />
        </View>

        <View className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          <FormField
            title="Deskripsi"
            value={form.Deskripsi}
            placeholder="Masukan Deskripsi"
            handleChangeText={(e) => setForm({ ...form, Deskripsi: e })}
            otherStyles={"mt-2"}
          />
        </View>

        <View className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          <FormField
            title="anggota"
            value={form.Deadline}
            placeholder="Masukan anggota"
            handleChangeText={(e) => setForm({ ...form, Deadline: e })}
            otherStyles={"mt-2"}
          />
        </View>

        <TouchableOpacity
          onPress={handleSaveClick}
          className="mt-8 p-3 bg-green-500 rounded-2xl w-full max-w-md shadow-lg"
        >
          <Text className="text-white text-center text-lg font-semibold">Save</Text>
          <Feather name="check-circle" size={24} color="white" style={{ position: 'absolute', right: 10 }} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default editDivisi;