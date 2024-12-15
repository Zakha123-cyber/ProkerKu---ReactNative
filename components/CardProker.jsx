import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";



const CardProker = ({ Tujuan, id_role, id_user }) => {
  const [prokerData, setProkerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const router = useRouter();
  console.log("id_role card: ", id_role);
  console.log("id_user card: ", id_user);

  // Format date helper
  const formatDate = (timestamp) => {
    if (!timestamp) return "Tanggal tidak tersedia";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let fetchedProker = [];

        if (id_role === 1) {
          // Jika Ketum, ambil semua data dari koleksi proker
          const querySnapshot = await getDocs(collection(db, "proker"));
          fetchedProker = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        } else if (id_role === 4) {
          // Jika anggota, ambil id_proker dari koleksi detail_kepanitiaan_proker berdasarkan id_user
          const kepanitiaanQuery = query(
            collection(db, "detail_kepanitiaan_proker"),
            where("id_user", "==", id_user)
          );
          const kepanitiaanSnapshot = await getDocs(kepanitiaanQuery);

          const prokerIds = kepanitiaanSnapshot.docs.map((doc) => doc.data().id_proker);

          // Ambil data proker berdasarkan id_proker yang ditemukan (cek jika prokerIds tidak kosong)
          if (prokerIds.length > 0) {
            const prokerQuery = query(
              collection(db, "proker"),
              where("id_proker", "in", prokerIds)
            );
            const prokerSnapshot = await getDocs(prokerQuery);
            fetchedProker = prokerSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          }
        }
        console.log("fetchedProker:", fetchedProker);
        setProkerData(fetchedProker);
      } catch (error) {
        console.error("Error fetching proker data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_role, id_user]);

  const handleProkerPress = async (item) => {
    try {
      // Ambil data dari koleksi detail_kepanitiaan_proker berdasarkan id_user dan id_proker
      const detailQuery = query(
        collection(db, "detail_kepanitiaan_proker"),
        where("id_user", "==", id_user),
        where("id_proker", "==", item.id_proker)
      );
      const detailSnapshot = await getDocs(detailQuery);
      
      if (id_role === 1) {
        navigation.navigate("DetailProkerKetum", { item });
      }
      else {
        if (!detailSnapshot.empty) {
          const detailData = detailSnapshot.docs[0].data();
          const roleProker = detailData.role_proker;
          console.log("roleProker:", roleProker);
  
          // Navigasi berdasarkan role_proker
          if (roleProker === "Ketua Proker") {
            router.push({ pathname: "/dashboard/ketuaPro/DetailProkerKetuaPro", params: { id_proker: item.id_proker, nama_proker : item.nama_proker, tanggal_pelaksanaan: item.tanggal_pelaksanaan, gambar: item.gambar, deskripsi: item.deskripsi_proker } });
          } else {
            router.push({ pathname: "/DetailProkerAnggota", params: { item } });
          }
        } else {
          console.warn("Data detail kepanitiaan tidak ditemukan untuk user ini.");
        }
      }
    } catch (error) {
      console.error("Error navigating to proker detail:", error);
    }
  };
  
  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (prokerData.length === 0) {
    return (
      <View className="mt-4">
        <Text className="text-lg text-center text-gray-500">
          Belum ada program kerja yang tersedia.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {prokerData.map(
        (item) => (
          console.log(item),
          (
            <View key={item.id} className="mx-2 mt-3">
              <TouchableOpacity onPress={() => handleProkerPress(item)} className="flex-row p-4 mb-4 bg-white border-2 border-green-500 rounded-lg shadow-md">
                <View>
                  <Image
                    source={{
                      uri: item.gambar || "https://ilkom.unej.ac.id/wp-content/uploads/2022/06/HMIF-LOGO.png",
                    }} // Gambar fallback jika logoUrl kosong
                    style={{
                      width: 80,
                      height: 80,
                      transform: [{ translateX: 10 }],
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View className="justify-center ml-4">
                  <Text className="font-medium text-gray-400">Nama Proker :</Text>
                  <Text className="text-lg font-bold">{item.nama_proker || "Tidak tersedia"}</Text>
                  <Text className="mt-2 font-medium text-gray-400">Tanggal Pelaksanaan :</Text>
                  <Text className="text-lg font-bold">{formatDate(item.tanggal_pelaksanaan)}</Text>
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
