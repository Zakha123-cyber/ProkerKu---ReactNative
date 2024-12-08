import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const CardDivisiProker = ({ FolderTujuan, PageTujuan }) => {
  return (
    <View>
      {/* {Daftar Divisi} */}
      <View className="mt-5">
        <Text className="text-xl text-center font-pbold">Daftar Divisi</Text>
        <Link href={`/dashboard/${FolderTujuan}/${PageTujuan}`} asChild>
          <TouchableOpacity className="p-2 mt-4 bg-green-400 rounded-lg">
            <Text className="text-center text-white font-pregular">Divisi Acara</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default CardDivisiProker;
