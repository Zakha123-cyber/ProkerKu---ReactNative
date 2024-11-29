import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../../components/FormField"; // Importing the FormField component
import { Feather } from "@expo/vector-icons"; // Import Feather icons

const EditJobDesk = () => {
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    deadline: "",
  });

  const handleSaveClick = () => {
    alert("Job desk berhasil diperbarui!");
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        className="px-4 my-6"
      >
        <Text className="text-2xl font-bold text-center mb-6">
          Edit Job Desk
        </Text>
        <View className="w-full space-y-4">
          <View>
            <Text className="text-sm text-gray-700 font-medium">Judul:</Text>
            <TextInput
              className="mt-2 p-2 bg-gray-200 text-black rounded border border-gray-300"
              placeholder="Masukkan judul"
              placeholderTextColor="#888"
              value={form.judul}
              onChangeText={(text) => handleChange("judul", text)}
            />
          </View>
          <View>
            <Text className="text-sm text-gray-700 font-medium">
              Deskripsi:
            </Text>
            <TextInput
              className="mt-2 p-2 bg-gray-200 text-black rounded border border-gray-300"
              placeholder="Masukkan deskripsi"
              placeholderTextColor="#888"
              value={form.deskripsi}
              onChangeText={(text) => handleChange("deskripsi", text)}
              multiline
              numberOfLines={4}
            />
          </View>
          <View>
            <Text className="text-sm text-gray-700 font-medium">Deadline:</Text>
            <TextInput
              className="mt-2 p-2 bg-gray-200 text-black rounded border border-gray-300"
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditJobDesk;
