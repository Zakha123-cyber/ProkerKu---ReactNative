import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../../components/FormField"; 
import icons from '../../../assets/icons/upload.png';

const Upload = () => {
  const [form, setForm] = useState({
    nameAnggota: '',
    images: null,
  });

  const handleUploadClick = () => {
    alert("Sertifikat berhasil di-upload!");
    
  };

  const handleImageUpload = () => {
    
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="px-4 my-6">
        <FormField
          title="Nama Anggota"
          value={form.nameAnggota}
          handleChangeText={(e) => setForm({ ...form, nameAnggota: e })}
          otherStyles="mt-7" // Pastikan ini sesuai dengan yang Anda gunakan di FormField
        />

        <View className="mt-7 space-y-2" />
        <Text className="text-base font-text-lg text-gray-600 font-pmedium mt-2 text-center">
          Upload Sertifikat
        </Text>

        <TouchableOpacity onPress={handleImageUpload} className="mt-4">
          {form.images ? (
            // Tampilkan gambar yang sudah di-upload jika ada
            <Image
              source={{ uri: form.images }}
              style={{ width: '100%', height: 160, borderRadius: 12 }}
              resizeMode="contain"
            />
          ) : (
            // Placeholder gambar sebelum upload
            <View className="w-full h-40 px-4 bg-gray-100 rounded-2xl justify-center items-center border-2 border-black">
              <View className="w-14 h-14 border border-dashed border-gray-400 justify-center items-center">
                {/* Gambar Placeholder */}
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-1/2 h-1/2"
                />
              </View>
              <Text className="text-gray-400 mt-2">Tap untuk memilih gambar</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUploadClick}
          className="mt-8 p-3 bg-green-500 rounded-2xl w-full max-w-md"
        >
          <Text className="text-white text-center text-lg font-semibold">Upload Sertifikat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Upload;