import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-pmedium">{title}</Text>

      <View className={'flex flex-row items-center w-4/5 p-3 mb-2 bg-gray-300 rounded-2xl'}>
        <TextInput className="flex-1" value={value} placeholder={placeholder} placeholderTextColor="#7B7B8B" onChangeText={handleChangeText} secureTextEntry={title === "Password" && !showPassword} {...props} />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
