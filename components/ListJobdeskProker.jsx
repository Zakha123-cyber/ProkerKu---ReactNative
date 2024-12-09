import React from "react";
import { View, Text, ScrollView } from "react-native";

const dummyData = [
  {
    id: "1",
    title: "Koordinator Acara",
    description: "Bertanggung jawab untuk merencanakan dan mengorganisir semua aspek acara.",
  },
  {
    id: "2",
    title: "Tim Logistik",
    description: "Mengatur semua kebutuhan logistik untuk acara, termasuk transportasi dan peralatan.",
  },
  {
    id: "3",
    title: "Humas",
    description: "Bertugas untuk berkomunikasi dengan media dan publik mengenai acara.",
  },
  {
    id: "4",
    title: "Tim Kreatif",
    description: "Bertanggung jawab untuk desain dan konsep acara, termasuk dekorasi dan tema.",
  },
];

const Jobsacara = () => {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      className="bg-gray-100 flex-1"
    >
      <Text className="text-2xl font-bold text-center mb-4">Job Divisi Acara</Text>
      {dummyData.map((item) => (
        <View key={item.id} className="bg-white p-4 my-2 rounded-lg shadow">
          <Text className="text-lg font-bold">{item.title}</Text>
          <Text className="text-sm text-gray-600">{item.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Jobsacara;
