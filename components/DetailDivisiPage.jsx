import { View, Text, ScrollView, Alert, Pressable, ActivityIndicator, Modal, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import ListJobdeskProker from "./ListJobdesk";
import TambahJobs from "../components/IconTambahJobs";
import { Picker } from '@react-native-picker/picker';

const DetailDivisiPage = ({ idDivisi, idProker, deskripsiDivisi }) => {
  const [userData, setUserData] = useState(null); // Data user CO Divisi
  const [loading, setLoading] = useState(true); // Indikator loading
  const [anggotaDivisi, setAnggotaDivisi] = useState([]); // Menyimpan daftar anggota divisi
  const [usersList, setUsersList] = useState([]); // Menyimpan daftar user yang tersedia
  const [selectedUser, setSelectedUser] = useState(null); // User yang dipilih dari dropdown
  const [showModal, setShowModal] = useState(false); // Menampilkan modal untuk tambah anggota
  const [namaDivisi, setNamaDivisi] = useState(""); // Nama Divisi

  // Fetch data CO Divisi dan anggota divisi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const divisiProkerRef = collection(db, "divisi_proker");
        const divisiQuery = query(divisiProkerRef, where("id_proker", "==", idProker), where("id_divisi_proker", "==", idDivisi));
        const divisiSnapshot = await getDocs(divisiQuery);

        if (divisiSnapshot.empty) {
          console.error("Divisi Proker tidak ditemukan");
          setLoading(false);
          return;
        }

        const divisiData = divisiSnapshot.docs[0].data();
        const coDivisiId = divisiData.co_divisi;
        setNamaDivisi(divisiData.nama_divisi || "Nama divisi tidak tersedia");

        // Fetch anggota divisi
        const anggotaQuery = query(
          collection(db, "detail_kepanitiaan_proker"),
          where("id_divisi_proker", "==", idDivisi)
        );
        const anggotaSnapshot = await getDocs(anggotaQuery);

        const anggotaIds = anggotaSnapshot.docs.map((doc) => doc.data().id_user);
        console.log("Daftar id_user anggota:", anggotaIds);

        if (anggotaIds.length > 0) {
          const usersRef = collection(db, "users");

          // Ambil nama untuk setiap anggota
          const anggotaNamaPromises = anggotaIds.map(async (id_user) => {
            const userQuery = query(usersRef, where("id_user", "==", id_user));
            const userSnapshot = await getDocs(userQuery);
            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data();
              console.log("Data user ditemukan:", userData);
              return userData.nama || "Nama tidak tersedia";
            } else {
              console.warn(`User dengan id_user ${id_user} tidak ditemukan.`);
              return "User tidak ditemukan";
            }
          });

          const anggotaNamaList = await Promise.all(anggotaNamaPromises);
          console.log("Daftar nama anggota:", anggotaNamaList);
          setAnggotaDivisi(anggotaNamaList);
        } else {
          console.log("Tidak ada anggota ditemukan untuk divisi ini.");
          setAnggotaDivisi([]);
        }

        // Fetch CO Divisi data
        if (coDivisiId) {
          const usersRef = collection(db, "users");
          const coQuery = query(usersRef, where("id_user", "==", coDivisiId));
          const coSnapshot = await getDocs(coQuery);
          if (!coSnapshot.empty) {
            setUserData(coSnapshot.docs[0].data());
          } else {
            console.warn("CO Divisi tidak ditemukan");
          }
        }

        // Fetch daftar user untuk dropdown
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUsersList(usersSnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idProker, idDivisi]);

  const handleAddAnggota = async () => {
    if (selectedUser) {
      try {
        const countersRef = doc(db, "counters", "detail_kepanitiaan");
        const countersSnap = await getDoc(countersRef);

        if (!countersSnap.exists()) {
          console.error("Counter untuk detail_kepanitiaan tidak ditemukan.");
          return;
        }

        const currentCounter = countersSnap.data().id_detail_kepanitiaan;
        const newIdDetailKepanitiaanProker = currentCounter + 1;

        await updateDoc(countersRef, { id_detail_kepanitiaan: newIdDetailKepanitiaanProker });

        const anggotaRef = doc(db, "detail_kepanitiaan_proker", `${newIdDetailKepanitiaanProker}`);
        const anggotaBaru = {
          id_detail_kepanitiaan_proker: newIdDetailKepanitiaanProker,
          id_divisi_proker: idDivisi,
          id_proker: idProker,
          id_user: selectedUser.id_user,
          role_proker: "Anggota",
        };

        await setDoc(anggotaRef, anggotaBaru);
        setAnggotaDivisi((prevAnggota) => [...prevAnggota, selectedUser.nama]);
        setShowModal(false);
        setSelectedUser(null);
        Alert.alert("Sukses", "Anggota berhasil ditambahkan!");
      } catch (error) {
        console.error("Error adding anggota:", error);
        Alert.alert("Error", "Gagal menambah anggota");
      }
    } else {
      Alert.alert("Input tidak valid", "Pilih anggota yang valid");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="p-4 border-2 rounded-lg">
        <Text className="text-3xl text-center text-gray-600 font-pextrabold">{namaDivisi}</Text>

        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          <Text className="text-gray-600">CO Divisi: {userData ? userData.nama : "Data tidak ditemukan"}</Text>
        </View>

        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          <Text className="font-semibold text-gray-600">Anggota Divisi:</Text>
          {anggotaDivisi.length > 0 ? (
            anggotaDivisi.map((anggota, index) => (
              <Text key={index} className="text-gray-500">{anggota}</Text>
            ))
          ) : (
            <Text className="text-gray-500">Belum ada anggota.</Text>
          )}
        </View>

        <Modal visible={showModal} animationType="slide" transparent={true}>
          <View className="items-center justify-center flex-1 bg-gray-500 bg-opacity-50">
            <View className="p-4 bg-white rounded-lg">
              <Text className="mb-3 text-xl font-semibold">Tambah Anggota</Text>
              <Picker
                selectedValue={selectedUser?.id_user}
                onValueChange={(itemValue) => setSelectedUser(usersList.find((user) => user.id_user === itemValue))}
                className="p-2 mb-3 border-2 border-gray-300 rounded-lg"
              >
                <Picker.Item label="Pilih anggota..." value={null} />
                {usersList.map((user) => (
                  <Picker.Item key={user.id_user} label={user.nama} value={user.id_user} />
                ))}
              </Picker>
              <Button title="Tambah" onPress={handleAddAnggota} />
              <Button title="Batal" onPress={() => setShowModal(false)} color="red" />
            </View>
          </View>
        </Modal>

        <ListJobdeskProker idProker={idProker} idDivisi={idDivisi} />
      </View>
    </ScrollView>
  );
};

export default DetailDivisiPage;
