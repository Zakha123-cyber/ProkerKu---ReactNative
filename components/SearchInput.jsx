import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center h-16 px-4 mb-5 space-x-4 border-2 w-[90%] rounded-2xl border-white focus:border-green-400 ml-6 bg-gray-300">
      <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular" value={query} placeholder="Cari Proker Anda" placeholderTextColor="#FFFFFF" onChangeText={(e) => setQuery(e)} />

      <TouchableOpacity
        onPress={() => {
          if (query === "") return Alert.alert("Missing Query", "Please input something to search results across database");

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
