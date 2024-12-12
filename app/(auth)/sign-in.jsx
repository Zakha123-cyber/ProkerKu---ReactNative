import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Pastikan path relatif benar
import "../../global.css";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import Home from "../(tabs)/home";
import { router } from "expo-router";


const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [roleId, setRoleId] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", form.email),
        where("password", "==", form.password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        // Simpan data pengguna ke state atau context global jika diperlukan
        console.log("User data:", userData);

        setRoleId(userData.role_id);
      } else {
        Alert.alert("Login Failed", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      Alert.alert("Login Failed", "An error occurred while logging in.");
    }
  };

  // if (roleId !== null) {
  //   return <Home role_id={roleId} />;
  // }

  return (
    <View className="items-center justify-center flex-1 bg-white">
      {/* Logo */}
      <View className="items-center justify-center mb-6">
        <Image
          source={images.logoProkerKu}
          resizeMethod="contain"
          className="h-[165px] w-[350px] translate-x-20"
        />
      </View>

      <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        otherStyles="mt-5 mb-2"
        keyboardType="email-address"
      />

      <FormField
        title="Password"
        value={form.password}
        handleChangeText={(e) => setForm({ ...form, password: e })}
        otherStyles="mb-5"
      />

      {/* Login Button */}
      <TouchableOpacity
        className="items-center w-4/5 p-4 mb-6 bg-green-400 rounded-lg"
        onPress={() => router.push("/home")}
      >
        <Text className="font-bold text-white">Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text className="my-4 text-black">-OR-</Text>
    </View>
  );
};

export default SignIn;

export const config = {
  headerShown: false,
};
