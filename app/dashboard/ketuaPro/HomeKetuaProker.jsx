import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import SearchInput from "../../../components/SearchInput";
import CardProker from "../../../components/CardProker";

const KetuaProkerDashboard = () => {
  const renderHeader = () => (
    <View className="px-4 my-6 space-y-6 bg-green-400">
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="mt-2 mb-2 text-lg text-white font-pmedium">Selamat Datang</Text>
          <Text className="text-2xl text-white font-pextrabold" style={{ fontSize: 25 }}>
            Mas Ahnaf
          </Text>
          <Text className="text-2xl text-white font-pregular" style={{ fontSize: 15 }}>
            Divisi Litbang
          </Text>
        </View>
        <View className="mt-1.5">
          <Image source={images.logoProkerKu} style={{ width: 150, height: 100, transform: [{ translateX: 30 }] }} resizeMode="contain" />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {renderHeader()}
      <View className="px-2">
        <SearchInput className="p-2 border border-green-500 rounded-lg" />
        <View className="flex-row justify-center gap-10 pb-2 mx-3 my-3 border-b-2 border-gray-300">
          <Text>Home Ketua Proker</Text>
        </View>
        <CardProker Tujuan={"DetailProkerKetuaProker"} />
      </View>
    </SafeAreaView>
  );
};

export default KetuaProkerDashboard;
