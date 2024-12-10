import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, doc, runTransaction, getDocs } from "firebase/firestore";

const TambahProker = () => {
  const [formData, setFormData] = useState({
    nama_proker: "",
    deskripsi_proker: "",
    tanggal_pelaksanaan: "",
    gambar: "",
    ketua_proker: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const userList = usersSnapshot.docs.map((doc) => ({
          id_user: doc.data().id_user,  // Correctly fetching id_user
          nama: doc.data().nama,        // Fetching the name (nama) of the user
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitProker = async () => {
    const { nama_proker, deskripsi_proker, tanggal_pelaksanaan, gambar, ketua_proker } = formData;

    if (
      !nama_proker.trim() ||
      !deskripsi_proker.trim() ||
      !tanggal_pelaksanaan.trim() ||
      !gambar.trim() ||
      !ketua_proker
    ) {
      alert("Semua field harus diisi.");
      return;
    }

    if (!/^https?:\/\/.+\..+/.test(gambar)) {
      alert("URL gambar tidak valid.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal_pelaksanaan)) {
      alert("Tanggal harus dalam format YYYY-MM-DD.");
      return;
    }

    setLoading(true);

    try {
      const newId = await runTransaction(db, async (transaction) => {
        const counterDoc = doc(db, "counters", "proker");
        const counterSnapshot = await transaction.get(counterDoc);

        if (!counterSnapshot.exists()) {
          throw new Error("Counter document does not exist!");
        }

        const newId = counterSnapshot.data().id_proker + 1;
        transaction.update(counterDoc, { id_proker: newId });
        return newId;
      });

      // Add Proker data to the 'proker' collection using newId
      const prokerRef = await addDoc(collection(db, "proker"), {
        id_proker: newId,
        nama_proker,
        deskripsi_proker,
        tanggal_pelaksanaan,
        gambar,
      });

      // Add Ketua Proker to 'detail_kepanitiaan_proker' collection
      try {
        await addDoc(collection(db, "detail_kepanitiaan_proker"), {
          id_proker: newId,  // Using newId for 'id_proker'
          id_user: ketua_proker,  // Using 'id_user' selected in the Picker for 'id_user'
          jabatan: "Ketua Proker",
        });
      } catch (error) {
        console.error("Error adding to detail_kepanitiaan_proker:", error);
        alert("Terjadi kesalahan saat menambahkan ketua proker.");
      }

      alert("Proker berhasil ditambahkan!");
      setFormData({
        nama_proker: "",
        deskripsi_proker: "",
        tanggal_pelaksanaan: "",
        gambar: "",
        ketua_proker: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Terjadi kesalahan saat menambahkan proker.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-200">
      <View className="items-center justify-center flex-1">
        <View className="w-11/12 p-6 bg-white border-2 border-green-500 rounded-lg">
          <Text className="text-2xl text-center text-green-500 font-extrabold mb-6">
            Tambah Program Kerja
          </Text>
          <View className="space-y-4">
            {/* Nama Proker */}
            <View>
              <Text className="text-sm text-green-500 font-medium">Nama Proker:</Text>
              <TextInput
                className="p-2 mt-2 text-black bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan nama proker"
                placeholderTextColor="#888"
                value={formData.nama_proker}
                onChangeText={(value) => handleChange("nama_proker", value)}
              />
            </View>

            {/* Deskripsi Proker */}
            <View>
              <Text className="text-sm text-green-500 font-medium">Deskripsi Proker:</Text>
              <TextInput
                className="p-2 mt-2 text-black bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan deskripsi"
                placeholderTextColor="#888"
                value={formData.deskripsi_proker}
                onChangeText={(value) => handleChange("deskripsi_proker", value)}
              />
            </View>

            {/* Tanggal Pelaksanaan */}
            <View>
              <Text className="text-sm text-green-500 font-medium">Tanggal Pelaksanaan:</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="p-2 mt-2 bg-gray-300 border border-green-500 rounded"
              >
                <Text>{formData.tanggal_pelaksanaan || "Pilih Tanggal"}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={
                    formData.tanggal_pelaksanaan
                      ? new Date(formData.tanggal_pelaksanaan)
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) handleChange("tanggal_pelaksanaan", date.toISOString().split("T")[0]);
                  }}
                />
              )}
            </View>

            {/* Gambar */}
            <View>
              <Text className="text-sm text-green-500 font-medium">Gambar (URL):</Text>
              <TextInput
                className="p-2 mt-2 text-black bg-gray-300 border border-green-500 rounded"
                placeholder="Masukkan URL gambar"
                placeholderTextColor="#888"
                value={formData.gambar}
                onChangeText={(value) => handleChange("gambar", value)}
              />
            </View>

            {/* Ketua Proker */}
            <View>
              <Text className="text-sm text-green-500 font-medium">Ketua Proker:</Text>
              <View className="p-2 mt-2 bg-gray-300 border border-green-500 rounded">
                <Picker
                  selectedValue={formData.ketua_proker}
                  onValueChange={(value) => handleChange("ketua_proker", value)}
                  style={{ color: "#000" }}
                >
                  <Picker.Item label="Pilih Ketua Proker" value="" />
                  {users.map((user) => (
                    <Picker.Item
                      key={user.id_user}  // Use id_user for key
                      label={user.nama || "Nama tidak tersedia"}  // Display user's name
                      value={user.id_user}  // Use id_user as value
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmitProker}
            disabled={loading}
            className={`items-center p-3 mt-6 rounded-lg ${loading ? "bg-gray-400" : "bg-green-500"}`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-medium">Tambah</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TambahProker;
