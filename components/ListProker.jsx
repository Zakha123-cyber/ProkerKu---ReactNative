import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { icons } from "../constants";
import { Link } from "expo-router";

const ListProker = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <View className="flex flex-row flex-wrap items-center justify-center gap-5">
        <Link href="/dashboard/ketum/tambahproker" asChild>
          <TouchableOpacity className="flex items-center w-1/3">
            <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
            <Text className="text-gray-400 font-pregular text-center">Tambah Proker</Text>
          </TouchableOpacity>
        </Link>
        
        <TouchableOpacity className="flex items-center w-1/3">
          <Image source={icons.profile} className="w-5 h-5" resizeMode="contain" />
          <Text className="text-gray-400 font-pregular text-center">Management User</Text>
        </TouchableOpacity>
        
        <Link href="/dashboard/ketuaPro/screenDivisi" asChild>
          <TouchableOpacity className="flex items-center w-1/3">
            <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
            <Text className="text-gray-400 font-pregular text-center">Divisi</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/dashboard/ketuaPro/editJobs" asChild>
          <TouchableOpacity className="flex items-center w-1/3">
            <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
            <Text className="text-gray-400 font-pregular text-center">Edit Jobsdesk</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/dashboard/ketuaPro/editDivisi" asChild>
          <TouchableOpacity className="flex items-center w-1/3">
            <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
            <Text className="text-gray-400 font-pregular text-center">Edit Divisi</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/dashboard/ketuaPro/uploadSertifikat" asChild>
          <TouchableOpacity className="flex items-center w-1/3">
            <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
            <Text className="text-gray-400 font-pregular text-center">Upload Sertifikat</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
};

export default ListProker;