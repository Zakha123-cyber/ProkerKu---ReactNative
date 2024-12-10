import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { db } from "../../../firebaseConfig"; // Pastikan path relatif benar
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const MemberDisplayScreen = () => {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [divisiList, setDivisiList] = useState([]);
  const [detailKepengurusan, setDetailKepengurusan] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const membersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(membersList);
      } catch (error) {
        console.error("Error fetching members: ", error);
      }
    };

    const fetchDivisi = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "divisi_organisasi")
        );
        const divisiList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDivisiList(divisiList);
      } catch (error) {
        console.error("Error fetching divisi: ", error);
      }
    };

    const fetchDetailKepengurusan = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "detail_kepengurusan")
        );
        const detailList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDetailKepengurusan(detailList);
      } catch (error) {
        console.error("Error fetching detail kepengurusan: ", error);
      }
    };

    fetchMembers();
    fetchDivisi();
    fetchDetailKepengurusan();
  }, []);

 const handleDelete = (id) => {
   Alert.alert(
     "Hapus Anggota",
     "Apakah Anda yakin ingin menghapus anggota ini?",
     [
       {
         text: "Batal",
         style: "cancel",
       },
       {
         text: "Hapus",
         onPress: async () => {
           try {
             const detailQuery = query(
               collection(db, "detail_kepengurusan"),
               where("id_user", "==", id)
             );
             const detailSnapshot = await getDocs(detailQuery);
             const deletePromises = detailSnapshot.docs.map((doc) =>
               deleteDoc(doc.ref)
             );
             await Promise.all(deletePromises);

             
             await deleteDoc(doc(db, "users", id));

             setMembers((prevMembers) =>
               prevMembers.filter((member) => member.id !== id)
             );
             alert("Anggota berhasil dihapus!");
           } catch (error) {
             console.error("Error deleting member: ", error);
             alert("Terjadi kesalahan saat menghapus anggota.");
           }
         },
       },
     ]
   );
 };

  const renderMember = ({ item }) => {
    const detail = detailKepengurusan.find(
      (detail) => detail.id_user === item.id_user
    );
    const divisi = divisiList.find(
      (divisi) => divisi.id_divisi === detail?.divisi_id
    );

    return (
      <View className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
        <View className="flex-1">
          <Text className="text-lg font-bold">{item.nama}</Text>
          <Text className="text-gray-600 text-md">{item.nim}</Text>
          <Text className="text-gray-600 text-md">{divisi?.nama_divisi}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="p-4 mb-4 bg-green-500 rounded-lg">
        <Text className="text-xl font-bold text-center text-white">
          Daftar Anggota
        </Text>
      </View>
      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      <Link href="/dashboard/ketum/TambahAnggota" asChild>
        <TouchableOpacity>
          <View className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
            <View className="flex-1">
              <Text className="text-lg font-bold text-center">
                Tambah Anggota Baru
              </Text>
            </View>
            <AntDesign name="pluscircleo" size={24} color="green" />
          </View>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity
        className="items-center p-3 mt-4 bg-green-500 rounded-lg"
        onPress={() => router.back()}
      >
        <Text className="text-lg font-bold text-white">Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemberDisplayScreen;
