import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const TambahProker = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-200">
      <View className="flex-1 justify-center items-center">
        <View className="w-11/12 bg-white p-6 rounded-lg border-2 border-green-500">
          <View className="mb-6">
            <Text className="mb-4 text-sm text-green-500 font-pmedium">
              Tambah Program Kerja
            </Text>
            <Text
              className="text-2xl text-green-500 font-pextrabold"
              style={{ fontSize: 25 }}
            >
              Formulir
            </Text>
          </View>
          <View className="space-y-4">
            <View>
              <Text className="text-sm text-green-500 font-pmedium">
                Nama Program Kerja:
              </Text>
              <TextInput
                className="mt-2 p-2 bg-gray-300 text-white rounded border border-green-500"
                placeholder="Masukkan nama program kerja"
                placeholderTextColor="#888"
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-pmedium">
                Deskripsi:
              </Text>
              <TextInput
                className="mt-2 p-2 bg-gray-300 text-white rounded border border-green-500"
                placeholder="Masukkan deskripsi"
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
              />
            </View>
            <View>
              <Text className="text-sm text-green-500 font-pmedium">
                Unggah Gambar:
              </Text>
              <TouchableOpacity
                onPress={pickImage}
                className="mt-2 p-2 bg-gray-300 text-white rounded border border-green-500"
              >
                <Text className="text-white">Pilih Gambar</Text>
              </TouchableOpacity>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, marginTop: 10 }}
                />
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {}}
            className="mt-6 p-3 bg-green-500 rounded-lg items-center"
          >
            <Text className="text-white font-pmedium">Tambah</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TambahProker;
