import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import SearchInput from "../../../components/SearchInput";
import TambahProker from "../../../components/IconTambahProker";
import ManagemenUser from "../../../components/IconManagementUser";
import CardProker from "../../../components/CardProker";
import { useRoute } from "@react-navigation/native";
import { useUser } from "../../../context/UserContext";

const Home = () => {
  const { user } = useUser();
  console.log("id user: ", user.id_user);
  console.log("Role ID: ", user.role_id);

  const route = useRoute();
  const { role_id, nama, id_user } = route.params || {};
  const renderHeader = () => (
    <View className="px-4 my-6 space-y-6 bg-green-400">
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="mt-2 mb-2 text-lg text-white font-pmedium">Selamat Datang</Text>
          <Text className="text-2xl text-white font-pextrabold" style={{ fontSize: 25 }}>
            {user.nama}
          </Text>
          <Text className="text-2xl text-white font-pregular" style={{ fontSize: 15 }}>
            {user.divisi}
          </Text>
        </View>
        <View className="mt-1.5">
          <Image source={images.logoProkerKu} style={{ width: 150, height: 100, transform: [{ translateX: 30 }] }} resizeMode="contain" />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {renderHeader()}
      <View className="px-2">
        <View className="flex-row justify-center gap-10 pb-2 mx-3 my-3 border-b-2 border-gray-300">
          <TambahProker />
          <ManagemenUser />
        </View>
        <View className="py-3">
          <Text className="text-2xl text-center text-green-400 font-pextrabold">Daftar Proker</Text>
        </View>
        <CardProker id_role={user.role_id} id_user={user.id_user} Tujuan={"DetailProkerKetum"} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
