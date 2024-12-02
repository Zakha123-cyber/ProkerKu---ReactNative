import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import images from '../../../assets/images/proker.png'; // Adjust the path as necessary

const EditJobDesk = () => {
  const [form, setForm] = useState({
    nama: '',
    co: '',
    deskripsi: '',
    anggota: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSaveClick = () => {
    alert('Job desk berhasil diperbarui!');
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
        <Text className="text-2xl font-bold text-center mb-4 text-green-600">Edit Divisi</Text>

        {/* Image Section */}
        <View className="flex items-center mb-4">
          <Image
            source={images} 
            style={{ width: 120, height: 120 }} 
            resizeMode="contain"
          />
        </View>

        {/* Input Fields Wrapper */}
        <View className="border border-green-500 rounded-lg p-4 bg-white mb-4 shadow-md">
          <Text className="text-gray-700 text-lg font-semibold">Nama:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mt-1 placeholder-gray-400"
            placeholder="Masukkan nama divisi"
            placeholderTextColor="#A0AEC0" 
            value={form.nama}
            onChangeText={(text) => handleChange('nama', text)}
          />

          <Text className="text-gray-700 text-lg font-semibold mt-2">Ketua:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mt-1 placeholder-gray-400"
            placeholder="Masukkan ketua divisi"
            placeholderTextColor="#A0AEC0" 
            value={form.co}
            onChangeText={(text) => handleChange('co', text)}
          />

          <Text className="text-gray-700 text-lg font-semibold mt-2">Deskripsi:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mt-1 h-16 placeholder-gray-400"
            placeholder="Masukkan deskripsi"
            placeholderTextColor="#A0AEC0" 
            value={form.deskripsi}
            onChangeText={(text) => handleChange('deskripsi', text)}
            multiline
          />

          <Text className="text-gray-700 text-lg font-semibold mt-2">Anggota:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mt-1 placeholder-gray-400"
            placeholder="Masukkan anggota"
            placeholderTextColor="#A0AEC0" 
            value={form.anggota}
            onChangeText={(text) => handleChange('anggota', text)}
          />
        </View>

        <TouchableOpacity
          className="bg-green-500 rounded-lg p-3"
          onPress={handleSaveClick}
        >
          <Text className="text-white text-center font-semibold text-lg">Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditJobDesk;