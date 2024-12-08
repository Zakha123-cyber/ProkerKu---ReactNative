import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import images from "../../../assets/images/proker.png";

const EditJobDesk = () => {
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    deadline: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSaveClick = () => {
    alert("Job desk berhasil diperbarui!");
  };

  return (
    <View className="flex-1 p-6 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}>
        <Text className="mb-6 text-3xl font-bold text-center text-green-600">Edit Jobdesk</Text>

        {/* Image Section */}
        <View className="flex items-center mb-6">
          <Image source={images} style={{ width: 150, height: 150 }} resizeMode="contain" />
        </View>

        <View className="p-6 mb-6 bg-white border-2 border-green-500 rounded-lg shadow-md">
          <Text className="text-lg font-semibold text-gray-700">Judul:</Text>
          <TextInput className="p-3 mt-2 placeholder-gray-400 border border-gray-300 rounded-lg" placeholder="Masukkan judul" placeholderTextColor="#A0AEC0" value={form.judul} onChangeText={(text) => handleChange("judul", text)} />

          <Text className="mt-4 text-lg font-semibold text-gray-700">Deskripsi:</Text>
          <TextInput
            className="h-24 p-3 mt-2 placeholder-gray-400 border border-gray-300 rounded-lg"
            placeholder="Masukkan deskripsi"
            placeholderTextColor="#A0AEC0"
            value={form.deskripsi}
            onChangeText={(text) => handleChange("deskripsi", text)}
            multiline
          />

          <Text className="mt-4 text-lg font-semibold text-gray-700">Deadline:</Text>
          <TextInput
            className="p-3 mt-2 placeholder-gray-400 border border-gray-300 rounded-lg"
            placeholder="Masukkan deadline"
            placeholderTextColor="#A0AEC0"
            type="date"
            value={form.deadline}
            onChangeText={(text) => handleChange("deadline", text)}
          />
        </View>

        <TouchableOpacity className="p-4 mt-4 bg-green-500 rounded-lg" onPress={handleSaveClick}>
          <Text className="text-lg font-semibold text-center text-white">Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditJobDesk;
