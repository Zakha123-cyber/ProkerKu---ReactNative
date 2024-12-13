import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Pastikan path relatif benar
import "../../global.css";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "../../context/UserContext";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [roleId, setRoleId] = useState(null);
  const navigation = useNavigation();
  const { setUser } = useUser(); // Ambil setUser dari context

  const handleLogin = async () => {
    try {
      const q = query(collection(db, "users"), where("email", "==", form.email), where("password", "==", form.password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log("User data:", userData);

        // Query untuk mendapatkan id_divisi dari detail_kepengurusan
        const kepengurusanQuery = query(collection(db, "detail_kepengurusan"), where("id_user", "==", userData.id_user));
        const kepengurusanSnapshot = await getDocs(kepengurusanQuery);

        if (!kepengurusanSnapshot.empty) {
          const kepengurusanDoc = kepengurusanSnapshot.docs[0];
          const id_divisi = kepengurusanDoc.data().divisi_id;

          // Query untuk mendapatkan nama divisi dari divisi_organisasi
          const divisiQuery = query(collection(db, "divisi_organisasi"), where("id_divisi", "==", id_divisi));
          const divisiSnapshot = await getDocs(divisiQuery);

          if (!divisiSnapshot.empty) {
            const divisiDoc = divisiSnapshot.docs[0];
            const namaDivisi = divisiDoc.data().nama_divisi;

            // Simpan data ke context dengan nama divisi
            setUser({
              role_id: userData.role_id,
              nama: userData.nama,
              id_user: userData.id_user,
              email: userData.email,
              nim: userData.nim,
              divisi: namaDivisi, // Tambahkan nama divisi
            });

            console.log("User Context Updated:", {
              role_id: userData.role_id,
              nama: userData.nama,
              id_user: userData.id_user,
              email: userData.email,
              nim: userData.nim,
              divisi: namaDivisi,
            });

            // Lanjutkan navigasi
            setRoleId(userData.role_id);
            handleclick(userData.role_id, userData.nama, userData.id_user);
          } else {
            Alert.alert("Error", "Divisi tidak ditemukan.");
          }
        } else {
          Alert.alert("Error", "Detail kepengurusan tidak ditemukan.");
        }
      } else {
        Alert.alert("Login Failed", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      Alert.alert("Login Failed", "An error occurred while logging in.");
    }
  };

  function handleclick(roleId, nama, id_user) {
    if (roleId) {
      router.push({ pathname: "/home", params: { role_id: roleId, nama: nama, id_user: id_user } });
      // console.log("Role ID: ", roleId);
    }
  }

  return (
    <View className="items-center justify-center flex-1 bg-white">
      {/* Logo */}
      <View className="items-center justify-center mb-6">
        <Image source={images.logoProkerKu} resizeMethod="contain" className="h-[165px] w-[350px] translate-x-20" />
      </View>

      <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} otherStyles="mt-5 mb-2" keyboardType="email-address" />

      <FormField title="Password" value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} otherStyles="mb-5" />

      {/* Login Button */}
      <TouchableOpacity className="items-center w-4/5 p-4 mb-6 bg-green-400 rounded-lg" onPress={() => handleLogin()}>
        <Text className="font-bold text-white">Login</Text>
      </TouchableOpacity>

      {/* Divider */}
    </View>
  );
};

export default SignIn;

export const config = {
  headerShown: false,
};
