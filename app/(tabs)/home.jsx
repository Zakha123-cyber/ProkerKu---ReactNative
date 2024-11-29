import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import ListProker from "../../components/ListProker";

const Home = () => {
  const renderHeader = () => (
    <View className="px-4 my-6 space-y-6">
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="mb-4 text-sm text-gray-100 font-pmedium">
            Selamat Datang
          </Text>
          <Text
            className="text-2xl text-white font-pextrabold"
            style={{ fontSize: 25 }}
          >
            Mas Ahnaf
          </Text>
        </View>
        <View className="mt-1.5">
          <Image
            source={images.logoProkerKu}
            className="w-20 h-20 scale-[2.5]"
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {renderHeader()}
      <SearchInput />
      <ListProker />
    </SafeAreaView>
  );
};

export default Home;
