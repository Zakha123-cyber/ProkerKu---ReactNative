import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import images from '../../../assets/images/proker.png'; 

const EditJobDesk = () => {
  const [form, setForm] = useState({
    PJ: '',
    deskripsi: '',
    deadline: '',
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
        <Text className="text-3xl font-bold text-center mb-6 text-green-600">Tambah Jobdesk</Text>

        {/* Image Section */}
        <View className="flex items-center mb-6">
          <Image
            source={images} 
            style={{ width: 150, height: 150 }} 
            resizeMode="contain"
          />
        </View>

        <View className="border-2 border-green-500 rounded-lg p-6 bg-white mb-6 shadow-md">
          <Text className="text-gray-700 text-lg font-semibold">PJ:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mt-2 placeholder-gray-400"
            placeholder="Masukkan PJ"
            placeholderTextColor="#A0AEC0" 
            value={form.judul}
            onChangeText={(text) => handleChange('judul', text)}
          />

          <Text className="text-gray-700 text-lg font-semibold mt-4">Deskripsi:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mt-2 h-24 placeholder-gray-400"
            placeholder="Masukkan deskripsi"
            placeholderTextColor="#A0AEC0" 
            value={form.deskripsi}
            onChangeText={(text) => handleChange('deskripsi', text)}
            multiline
          />

          <Text className="text-gray-700 text-lg font-semibold mt-4">Deadline:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mt-2 placeholder-gray-400"
            placeholder="Masukkan deadline"
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