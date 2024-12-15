import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Pressable, TextInput, Alert, TouchableOpacity, Modal } from "react-native";
import CardDetailDivisi from "../../../components/CardDivisiProker";
import { useRoute } from "@react-navigation/native";
import { collection, getDocs, query, where, addDoc, orderBy, limit } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../../firebaseConfig";
import TambahDivisiProker from "../../../components/IconTambahDivisi";

const DetailProkerCoDivisi = () => {
  const route = useRoute();
  const { item } = route.params;
  const idProker = item.id_proker;

  const formatDate = (timestamp) => {
    if (!timestamp) return "Tanggal tidak tersedia";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const initialProker = {
    image: "https://via.placeholder.com/400", // Ganti dengan URL gambar yang sesuai
    nama: item.nama_proker,
    timeline: formatDate(item.tanggal_pelaksanaan),
    ketua: "",
    anggota: [],
    deskripsi: item.deskripsi_proker,
  };

  const [proker, setProker] = useState(initialProker);
  const [isEditing, setIsEditing] = useState(false);
  const [newAnggota, setNewAnggota] = useState("");
  const [anggotaList, setAnggotaList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [divisiProker, setDivisiProker] = useState([]); // State untuk menyimpan data divisi
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const q = query(collection(db, "detail_kepanitiaan_proker"), where("id_proker", "==", item.id_proker));

        const querySnapshot = await getDocs(q);
        console.log("ID Proker:", item.id_proker);

        const anggotaList = await Promise.all(
          querySnapshot.docs
            .filter((doc) => doc.data().role_proker !== "Ketua Proker") // Filter untuk mengecualikan "Ketua Proker"
            .map(async (doc) => {
              // Ambil data user berdasarkan id_user
              const userSnapshot = await getDocs(query(collection(db, "users"), where("id_user", "==", doc.data().id_user)));

              // Pastikan ada data user yang sesuai
              if (!userSnapshot.empty) {
                return userSnapshot.docs[0].data().nama; // Ambil nama user
              }

              return null; // Jika tidak ditemukan, kembalikan null
            })
        );

        // Hapus anggota yang bernilai null (data user tidak ditemukan)
        const filteredAnggotaList = anggotaList.filter((nama) => nama !== null);

        // Simpan anggota ke dalam state
        setProker((prevProker) => ({
          ...prevProker,
          anggota: filteredAnggotaList,
        }));

        console.log("Anggota List:", filteredAnggotaList);
      } catch (error) {
        console.error("Error fetching anggota: ", error);
      }
    };

    const getKetuaProker = async () => {
      try {
        // Query untuk mendapatkan detail_kepanitiaan_proker dengan proker_id dan jabatan "Ketua Proker"
        const detailQuery = query(collection(db, "detail_kepanitiaan_proker"), where("id_proker", "==", item.id_proker), where("role_proker", "==", "Ketua Proker"));
        const detailSnapshot = await getDocs(detailQuery);

        if (!detailSnapshot.empty) {
          // Ambil id_user dari dokumen yang ditemukan
          const idUser = detailSnapshot.docs[0].data().id_user;

          // Query ke koleksi users untuk mendapatkan nama pengguna berdasarkan id_user
          const userQuery = query(collection(db, "users"), where("id_user", "==", idUser));
          const userSnapshot = await getDocs(userQuery);

          if (!userSnapshot.empty) {
            const ketuaNama = userSnapshot.docs[0].data().nama;

            // Set nama Ketua Proker ke state proker
            setProker((prevProker) => ({
              ...prevProker,
              ketua: ketuaNama,
            }));
          } else {
            console.warn("User dengan id_user tidak ditemukan");
          }
        } else {
          console.warn("Tidak ada Ketua Proker ditemukan untuk proker ini");
        }
      } catch (error) {
        console.error("Error fetching Ketua Proker: ", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"), where("role_id", "==", 4));
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.data().id_user,
          nama: doc.data().nama,
        }));
        setUsersList(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    const fetchDivisiProker = async () => {
      try {
        const q = query(collection(db, "divisi_proker"), where("id_proker", "==", idProker));

        const querySnapshot = await getDocs(q);
        const divisiList = querySnapshot.docs.map((doc) => ({
          id: doc.id, // ID dokumen
          ...doc.data(), // Data dokumen
        }));

        setDivisiProker(divisiList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching divisi_proker: ", error);
        setLoading(false);
      }
    };

    fetchAnggota();
    getKetuaProker();
    fetchUsers();
    fetchDivisiProker();
  }, [item.id]);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert("Hapus Proker", "Apakah Anda yakin ingin menghapus proker ini?", [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", onPress: () => console.log("Proker dihapus") },
    ]);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Proker disimpan:", proker);
    // Di sini Anda bisa menambahkan logika untuk menyimpan perubahan ke database atau state global
  };

  const addAnggota = async () => {
    if (!newAnggota) {
      Alert.alert("Error", "Pilih anggota dari dropdown.");
      return;
    }
    const selectedUser = usersList.find((user) => user.id === newAnggota);
    try {
      // Mendapatkan id_detail_kepanitiaan_proker terakhir untuk auto increment
      const lastIdQuery = query(collection(db, "detail_kepanitiaan_proker"), orderBy("id_detail_kepanitiaan_proker", "desc"), limit(1));
      const lastIdSnapshot = await getDocs(lastIdQuery);
      const lastId = lastIdSnapshot.docs.length > 0 ? lastIdSnapshot.docs[0].data().id_detail_kepanitiaan_proker + 1 : 1;

      await addDoc(collection(db, "detail_kepanitiaan_proker"), {
        id_detail_kepanitiaan_proker: Number(lastId),
        id_proker: Number(item.id_proker),
        id_user: Number(selectedUser.id),
      });
      setProker((prevProker) => ({
        ...prevProker,
        anggota: [...prevProker.anggota, selectedUser.nama],
      }));
      setNewAnggota("");
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding anggota: ", error);
    }
  };

  const removeAnggota = (index) => {
    setProker((prevProker) => {
      const updatedAnggota = prevProker.anggota.filter((_, i) => i !== index);
      return { ...prevProker, anggota: updatedAnggota };
    });
  };

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      {/* Pembungkus dengan garis hijau */}
      <View className="p-4 border-2 border-green-500 rounded-lg">
        {/* Gambar Proker */}
        <Image source={{ uri: proker.image }} className="w-full mb-4 rounded-lg h-60" resizeMode="cover" />

        {/* Nama Proker */}
        <Text className="mb-2 text-2xl font-bold">{proker.nama}</Text>

        {/* Timeline */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          <Text className="text-gray-600">Timeline: {proker.timeline}</Text>
        </View>

        {/* Deskripsi Proker */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          <Text className="text-gray-600">Deskripsi Proker: {proker.deskripsi}</Text>
        </View>

        {/* Ketua */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          <Text className="text-gray-600">Ketua: {proker.ketua}</Text>
        </View>

        {/* Anggota */}
        <View className="p-2 mb-2 border-2 border-gray-300 rounded-lg">
          <Text className="mb-1 text-gray-600">Anggota:</Text>
          {proker.anggota.map(
            (anggota, index) => (
              console.log("ini anggota", anggota),
              (
                <View key={index} className="flex-row items-center justify-between mb-1">
                  <Text className="text-gray-500">
                    {index + 1}. {anggota}
                  </Text>
                  {isEditing && (
                    <Pressable onPress={() => removeAnggota(index)}>
                      <Text className="text-red-500">Hapus</Text>
                    </Pressable>
                  )}
                </View>
              )
            )
          )}
        </View>

        {/* {Daftar Divisi} */}
        <View className="mt-5">
          <Text className="text-2xl text-center text-green-400 font-pbold">Daftar Divisi</Text>
        </View>
        <View className="mt-5">
          {divisiProker.length > 0 ? (
            divisiProker.map((divisi) => (
              <CardDetailDivisi
                key={divisi.id}
                PageTujuan={"DetailDivisiCoDivisi"}
                namaDivisi={divisi.nama_divisi}
                deskripsiDivisi={divisi.deskripsi_divisi}
                idDivisi={divisi.id_divisi_proker} // Kirim data tambahan jika diperlukan
                idProker={idProker}
              />
            ))
          ) : (
            <Text className="text-center text-gray-500">Tidak ada divisi.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailProkerCoDivisi;
