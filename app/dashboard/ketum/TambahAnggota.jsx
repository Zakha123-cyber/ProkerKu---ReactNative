import { View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TambahAnggota = () => {
  return (
    <SafeAreaView className="flex-1 bg-green-200">
      <View className="items-center justify-center flex-1">
        <View className="w-11/12 p-6 bg-white border-2 border-green-500 rounded-lg">
          <View className="mb-6">
            <Text className="text-2xl text-center text-green-500 font-pextrabold" style={{ fontSize: 25 }}>
              Tambah Anggota
            </Text>
          </View>
          <View className="space-y-4">
            <View>
              <Text className="text-sm text-green-500 font-pmedium">Nama Program Kerja:</Text>
              <TextInput className="p-2 mt-2 text-white bg-gray-300 border border-green-500 rounded" placeholder="Masukkan nama program kerja" placeholderTextColor="#888" />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-pmedium">Deskripsi:</Text>
              <TextInput className="p-2 mt-2 text-white bg-gray-300 border border-green-500 rounded" placeholder="Masukkan deskripsi" placeholderTextColor="#888" multiline numberOfLines={4} />
            </View>
          </View>
          <TouchableOpacity onPress={() => {}} className="items-center p-3 mt-6 bg-green-500 rounded-lg">
            <Text className="text-white font-pmedium">Tambah</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TambahAnggota;
