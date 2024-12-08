import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

const initialMembers = [
  { id: "1", name: "Anggota 1", role: "Pengembang", description: "Bertanggung jawab untuk pengembangan aplikasi." },
  { id: "2", name: "Anggota 2", role: "Desainer", description: "Bertanggung jawab untuk desain UI/UX." },
  { id: "3", name: "Anggota 3", role: "Manajer Proyek", description: "Mengelola proyek dan tim." },
  { id: "4", name: "Anggota 4", role: "QA Engineer", description: "Bertanggung jawab untuk pengujian perangkat lunak." },
];

const MemberDisplayScreen = () => {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);

  const handleDelete = (id) => {
    Alert.alert("Hapus Anggota", "Apakah Anda yakin ingin menghapus anggota ini?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        onPress: () => {
          setMembers(members.filter((member) => member.id !== id));
        },
      },
    ]);
  };

  const renderMember = ({ item }) => (
    <View className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="text-gray-600 text-md">{item.role}</Text>
        <Text className="mt-1 text-sm text-gray-500">{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="p-4 mb-4 bg-green-500 rounded-lg">
        <Text className="text-xl font-bold text-center text-white">Daftar Anggota</Text>
      </View>
      <FlatList data={members} renderItem={renderMember} keyExtractor={(item) => item.id} contentContainerStyle={{ paddingBottom: 16 }} />
      <Link href="/dashboard/ketum/TambahAnggota" asChild>
        <TouchableOpacity>
          <View className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
            <View className="flex-1">
              <Text className="text-lg font-bold text-center">Tambah Anggota Baru</Text>
            </View>
            <AntDesign name="pluscircleo" size={24} color="green" />
          </View>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity className="items-center p-3 mt-4 bg-green-500 rounded-lg" onPress={() => router.back()}>
        <Text className="text-lg font-bold text-white">Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemberDisplayScreen;
