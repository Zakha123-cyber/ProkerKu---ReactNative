import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import "../global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-300">
      <Text className="text-2xl text-slate-500 font-pextrabold">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Link href="/home" className="text-zinc-900 text-2xl font-psemibold">
        Go To Home
      </Link>
    </View>
  );
}
