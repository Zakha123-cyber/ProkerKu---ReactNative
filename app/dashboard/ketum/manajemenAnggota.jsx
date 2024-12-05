import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons'; // Make sure to install this package for icons

const initialMembers = [
  { id: '1', name: 'Anggota 1', role: 'Pengembang', description: 'Bertanggung jawab untuk pengembangan aplikasi.' },
  { id: '2', name: 'Anggota 2', role: 'Desainer', description: 'Bertanggung jawab untuk desain UI/UX.' },
  { id: '3', name: 'Anggota 3', role: 'Manajer Proyek', description: 'Mengelola proyek dan tim.' },
  { id: '4', name: 'Anggota 4', role: 'QA Engineer', description: 'Bertanggung jawab untuk pengujian perangkat lunak.' },
];

const MemberDisplayScreen = () => {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);

  const handleDelete = (id) => {
    Alert.alert(
      "Hapus Anggota",
      "Apakah Anda yakin ingin menghapus anggota ini?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text: "Hapus",
          onPress: () => {
            setMembers(members.filter(member => member.id !== id));
          }
        }
      ]
    );
  };

  const renderMember = ({ item }) => (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4 flex-row justify-between items-center">
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="text-md text-gray-600">{item.role}</Text>
        <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-green-500 p-4 rounded-lg mb-4">
        <Text className="text-white text-xl font-bold text-center">Daftar Anggota</Text>
      </View>
      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      <TouchableOpacity
        className="bg-green-500 p-3 rounded-lg items-center mt-4"
        onPress={() => router.back()} 
      >
        <Text className="text-white text-lg font-bold">Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemberDisplayScreen;