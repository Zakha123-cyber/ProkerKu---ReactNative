import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import images from '../../../assets/images/proker.png'; 

const EditJobDesk = () => {
  const [form, setForm] = useState({
    nama: '',
    divisi: '',
    jabatan: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSaveClick = () => {
    alert('Job desk berhasil diperbarui!');
  };

  return (
    <View className="flex-1 bg-gray-100 p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
        <Text className="text-3xl font-bold text-center mb-6 text-green-600">Edit Anggota</Text>

        {/* Image Section */}
        <View className="flex items-center mb-6">
          <Image
            source={images} 
            style={{ width: 150, height: 150 }} 
            resizeMode="contain"
          />
        </View>

        <View className="border-2 border-green-500 rounded-lg p-6 bg-white mb-6 shadow-md">
          <Text className="text-gray-700 text-lg font-semibold">nama:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mt-2 placeholder-gray-400"
            placeholder="Masukkan judul"
            placeholderTextColor="#A0AEC0" 
            value={form.judul}
            onChangeText={(text) => handleChange('judul', text)}
          />

          <Text className="text-gray-700 text-lg font-semibold mt-4">divisi:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mt-2 placeholder-gray-400"
            placeholder="Masukkan divisi"
            placeholderTextColor="#A0AEC0" 
            value={form.deskripsi}
            onChangeText={(text) => handleChange('deskripsi', text)}
            multiline
          />

          <Text className="text-gray-700 text-lg font-semibold mt-4">jabatan:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mt-2 placeholder-gray-400"
            placeholder="Masukkan jabatan"
            placeholderTextColor="#A0AEC0" 
            value={form.deadline}
            onChangeText={(text) => handleChange('deadline', text)}
          />
        </View>

        <TouchableOpacity
          className="bg-green-500 rounded-lg p-4 mt-4"
          onPress={handleSaveClick}
        >
          <Text className="text-white text-center font-semibold text-lg">Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditJobDesk;