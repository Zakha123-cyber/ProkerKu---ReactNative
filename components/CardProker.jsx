import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const CardProker = ({ Tujuan }) => {
  const [prokerData, setProkerData] = useState([]);
  const navigation = useNavigation();

  // Fungsi untuk memformat tanggal
  const formatDate = (timestamp) => {
    if (!timestamp) return "Tanggal tidak tersedia";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Fungsi untuk mengambil data dari Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "proker"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProkerData(data)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      {prokerData.map(
        (item) => (
          (
            <View key={item.id} className="mx-2 mt-3">
              <TouchableOpacity
                onPress={() => navigation.navigate(Tujuan, { item })}
                className="flex-row p-4 mb-4 bg-white border-2 border-green-500 rounded-lg shadow-md"
              >
                <View>
                  <Image
                    source={{
                      uri: item.logoUrl || "https://via.placeholder.com/80",
                    }} // Gambar fallback jika logoUrl kosong
                    style={{
                      width: 80,
                      height: 80,
                      transform: [{ translateX: 10 }],
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View className="ml-4">
                  <Text className="font-medium text-gray-400">
                    Nama Proker :
                  </Text>
                  <Text className="text-lg font-bold">
                    {item.nama_proker || "Tidak tersedia"}
                  </Text>
                  <Text className="mt-2 font-medium text-gray-400">
                    Tanggal Pelaksanaan :
                  </Text>
                  <Text className="text-lg font-bold">
                    {formatDate(item.tanggal_pelaksanaan)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        )
      )}
    </ScrollView>
  );
};

export default CardProker;
