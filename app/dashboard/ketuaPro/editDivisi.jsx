import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const EditDivisi = () => {
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    deadline: "",
  });

  const handleSaveClick = () => {
    alert("Divisi berhasil diperbarui!");
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center px-4">
        <View className="w-full bg-white p-6 rounded-lg border-2 border-green-500 shadow-lg">
          <Text className="text-2xl text-green-500 font-bold mb-6 text-center">
            Edit Divisi
          </Text>
          <ScrollView className="space-y-4">
            <View>
              <Text className="text-sm text-green-500 font-medium">Judul:</Text>
              <TextInput
                className="mt-2 p-2 bg-gray-200 text-black rounded border border-green-500"
                placeholder="Masukkan judul"
                placeholderTextColor="#888"
                value={form.judul}
                onChangeText={(text) => handleChange("judul", text)}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-medium">
                Deskripsi:
              </Text>
              <TextInput
                className="mt-2 p-2 bg-gray-200 text-black rounded border border-green-500"
                placeholder="Masukkan deskripsi"
                placeholderTextColor="#888"
                value={form.deskripsi}
                onChangeText={(text) => handleChange("deskripsi", text)}
                multiline
                numberOfLines={4}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-medium">
                Deadline:
              </Text>
              <TextInput
                className="mt-2 p-2 bg-gray-200 text-black rounded border border-green-500"
                placeholder="Masukkan deadline"
                placeholderTextColor="#888"
                value={form.deadline}
                onChangeText={(text) => handleChange("deadline", text)}
              />
            </View>
            <TouchableOpacity
              onPress={handleSaveClick}
              className="mt-6 p-3 bg-green-500 rounded-lg items-center"
            >
              <Text className="text-white font-medium">Simpan</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditDivisi;
