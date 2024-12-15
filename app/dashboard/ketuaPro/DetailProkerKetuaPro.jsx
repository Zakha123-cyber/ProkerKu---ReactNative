import React, { useState, useEffect, use } from "react";
import { View, Text, Image, ScrollView, Pressable, TextInput, Alert, TouchableOpacity, Modal } from "react-native";
import CardDetailDivisi from "../../../components/CardDivisiProkerKetuaProker";
import { useRoute } from "@react-navigation/native";
import { doc, collection, getDocs, query, where, addDoc, orderBy, limit, deleteDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../../firebaseConfig";
import TambahDivisiProker from "../../../components/IconTambahDivisi";
import { useLocalSearchParams } from "expo-router";

const DetailProkerKetuaPro = () => {
  const { id_proker, nama_proker, tanggal_pelaksanaan, gambar, deskripsi } = useLocalSearchParams();
  const item = { id_proker, nama_proker, tanggal_pelaksanaan, gambar, deskripsi };
  console.log("ini item dari detail bro: ", item);
  const idProker = Number(item.id_proker);
  console.log("ini id proker: ", idProker);
  console.log(typeof  idProker);

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
    deskripsi: item.deskripsi,
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
        const q = query(collection(db, "detail_kepanitiaan_proker"), where("id_proker", "==", idProker));

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
        const detailQuery = query(collection(db, "detail_kepanitiaan_proker"), where("id_proker", "==", idProker), where("role_proker", "==", "Ketua Proker"));
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

  const handleDelete = async () => {
    Alert.alert("Hapus Proker", "Apakah Anda yakin ingin menghapus proker ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        onPress: async () => {
          try {
            // Hapus dokumen pada koleksi `proker` berdasarkan `id_proker`
            const prokerQuery = query(collection(db, "proker"), where("id_proker", "==", idProker));

            const querySnapshot = await getDocs(prokerQuery);

            if (querySnapshot.empty) {
              Alert.alert("Error", "Proker tidak ditemukan.");
              return;
            }

            querySnapshot.forEach(async (docSnapshot) => {
              console.log("Proker ID:", docSnapshot.id);
              await deleteDoc(doc(db, "proker", docSnapshot.id));
            });

            Alert.alert("Sukses", "Proker berhasil dihapus!");
          } catch (error) {
            console.error("Error saat menghapus proker:", error);
            Alert.alert("Error", "Gagal menghapus proker.");
          }
        },
      },
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
        role_proker: "Anggota",
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
        <Text className="mb-2 text-2xl font-bold">{proker.nama} ini ketupro</Text>

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

        {/* Tombol Aksi */}
        <View className="flex-row justify-between pb-3 mt-4 border-b-2 border-gray-300">
          <Pressable className="flex-1 p-2 mr-2 bg-blue-500 rounded-lg" onPress={() => setModalVisible(true)}>
            <Text className="text-center text-white">Edit Proker</Text>
          </Pressable>
          {/* <Pressable className="flex-1 p-2 ml-2 bg-red-500 rounded-lg" onPress={handleDelete}>
            <Text className="text-center text-white">Hapus Proker</Text>
          </Pressable> */}
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
                PageTujuan={"/dashboard/ketuaPro/DetailDivisiKetuaPro"}
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

      {/* Modal untuk mengedit proker */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "90%",
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Edit Proker
            </Text>
            <TextInput
              value={proker.nama}
              onChangeText={(text) => setProker({ ...proker, nama: text })}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginBottom: 20,
                fontSize: 16,
                padding: 5,
              }}
            />
            <TextInput
              value={proker.timeline}
              onChangeText={(text) => setProker({ ...proker, timeline: text })}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginBottom: 20,
                fontSize: 16,
                padding: 5,
              }}
            />
            <TextInput
              value={proker.deskripsi}
              onChangeText={(text) => setProker({ ...proker, deskripsi: text })}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginBottom: 20,
                fontSize: 16,
                padding: 5,
              }}
            />
            <TextInput
              value={proker.ketua}
              onChangeText={(text) => setProker({ ...proker, ketua: text })}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginBottom: 20,
                fontSize: 16,
                padding: 5,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Anggota:
            </Text>
            {proker.anggota.map((anggota, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  {index + 1}. {anggota}
                </Text>
                <Pressable onPress={() => removeAnggota(index)}>
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    Hapus
                  </Text>
                </Pressable>
              </View>
            ))}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Picker
                selectedValue={newAnggota}
                onValueChange={(itemValue) => setNewAnggota(itemValue)}
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                }}
              >
                <Picker.Item label="Pilih Anggota" value="" />
                {usersList.map((user) => (
                  <Picker.Item key={user.id} label={user.nama} value={user.id} />
                ))}
              </Picker>
              <Pressable
                style={{
                  backgroundColor: "green",
                  padding: 10,
                  borderRadius: 5,
                  marginLeft: 10,
                }}
                onPress={addAnggota}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Tambah
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={{
                backgroundColor: "green",
                padding: 15,
                borderRadius: 5,
                marginBottom: 10,
              }}
              onPress={handleSave}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Simpan
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "gray",
                padding: 15,
                borderRadius: 5,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Batal
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TambahDivisiProker idProker={idProker}/>
    </ScrollView>
  );
};

export default DetailProkerKetuaPro;

export async function getStaticProps() {
  return {
    props: {
      options: {
        headerShown: false, // Menyembunyikan header
      },
    },
  };
}