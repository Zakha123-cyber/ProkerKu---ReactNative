import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, TextInput, Alert } from 'react-native';

const DetailProkerScreen = () => {
    // Data statis untuk proker
    const initialProker = {
        image: 'https://via.placeholder.com/400', // Ganti dengan URL gambar yang sesuai
        nama: 'Pengembangan Aplikasi Mobile',
        timeline: '1 Januari 2023 - 31 Maret 2023',
        ketua: 'Budi Santoso',
        anggota: ['Siti Aminah', 'Joko Widodo', 'Rina Susanti'],
    };

    const [proker, setProker] = useState(initialProker);
    const [isEditing, setIsEditing] = useState(false);
    const [newAnggota, setNewAnggota] = useState('');

    // Fungsi untuk menghapus proker
    const handleDelete = () => {
        Alert.alert("Hapus Proker", "Apakah Anda yakin ingin menghapus proker ini?", [
            { text: "Batal", style: "cancel" },
            { text: "Hapus", onPress: () => console.log("Proker dihapus") }
        ]);
    };

    // Fungsi untuk menyimpan perubahan
    const handleSave = () => {
        setIsEditing(false);
        console.log("Proker disimpan:", proker);
        // Di sini Anda bisa menambahkan logika untuk menyimpan perubahan ke database atau state global
    };

    // Fungsi untuk menambah anggota
    const addAnggota = () => {
        if (newAnggota.trim() === '') {
            Alert.alert("Error", "Nama anggota tidak boleh kosong.");
            return;
        }
        setProker((prevProker) => ({
            ...prevProker,
            anggota: [...prevProker.anggota, newAnggota],
        }));
        setNewAnggota('');
    };

    // Fungsi untuk menghapus anggota
    const removeAnggota = (index) => {
        setProker((prevProker) => {
            const updatedAnggota = prevProker.anggota.filter((_, i) => i !== index);
            return { ...prevProker, anggota: updatedAnggota };
        });
    };

    return (
        <ScrollView className='flex-1 bg-white p-4'>
            {/* Pembungkus dengan garis hijau */}
            <View className='border-2 border-green-500 rounded-lg p-4'>
                {/* Gambar Proker */}
                <Image 
                    source={{ uri: proker.image }} 
                    className='w-full h-60 rounded-lg mb-4' 
                    resizeMode='cover' 
                />
                
                {/* Nama Proker */}
                {isEditing ? (
                    <TextInput
                        value={proker.nama}
                        onChangeText={(text) => setProker({ ...proker, nama: text })}
                        className='text-2xl font-bold mb-2 border-b-2 border-gray-300'
                    />
                ) : (
                    <Text className='text-2xl font-bold mb-2'>{proker.nama}</Text>
                )}

                {/* Timeline */}
                <View className='border-2 border-gray-300 rounded-lg p-2 mb-2'>
                    {isEditing ? (
                        <TextInput
                            value={proker.timeline}
                            onChangeText={(text) => setProker({ ...proker, timeline: text })}
                            className='text-gray-600'
                        />
                    ) : (
                        <Text className='text-gray-600'>Timeline: {proker.timeline}</Text>
                    )}
                </View>

                {/* Ketua */}
                <View className='border-2 border-gray-300 rounded-lg p-2 mb-2'>
                    {isEditing ? (
                        <TextInput
                            value={proker.ketua}
                            onChangeText={(text) => setProker({ ...proker, ketua: text })}
                            className='text-gray-600'
                        />
                    ) : (
                        <Text className='text-gray-600'>Ketua: {proker.ketua}</Text>
                    )}
                </View>

                {/* Anggota */}
                <View className='border-2 border-gray-300 rounded-lg p-2 mb-2'>
                    <Text className='text-gray-600 mb-1'>Anggota:</Text>
                    {proker.anggota.map((anggota, index) => (
                        <View key={index} className='flex-row justify between items-center mb-1'>
                            <Text className='text-gray-500'>{index + 1}. {anggota}</Text>
                            {isEditing && (
                                <Pressable onPress={() => removeAnggota(index)}>
                                    <Text className='text-red-500'>Hapus</Text>
                                </Pressable>
                            )}
                        </View>
                    ))}
                    {isEditing && (
                        <View className='flex-row mb-4'>
                            <TextInput
                                value={newAnggota}
                                onChangeText={setNewAnggota}
                                placeholder='Nama Anggota Baru'
                                className='border-b-2 border-gray-300 flex-1 mr-2'
                            />
                            <Pressable className='bg-green-500 p-2 rounded-lg' onPress={addAnggota}>
                                <Text className='text-white'>Tambah</Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                {/* Tombol Aksi */}
                <View className='flex-row justify-between mt-4'>
                    {isEditing ? (
                        <>
                            <Pressable className='bg-green-500 p-2 rounded-lg flex-1 mr-2' onPress={handleSave}>
                                <Text className='text-white text-center'>Simpan</Text>
                            </Pressable>
                            <Pressable className='bg-gray-500 p-2 rounded-lg flex-1 ml-2' onPress={() => setIsEditing(false)}>
                                <Text className='text-white text-center'>Batal</Text>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <Pressable className='bg-blue-500 p-2 rounded-lg flex-1 mr-2' onPress={() => setIsEditing(true)}>
                                <Text className='text-white text-center'>Edit Proker</Text>
                            </Pressable>
                            <Pressable className='bg-red-500 p-2 rounded-lg flex-1 ml-2' onPress={handleDelete}>
                                <Text className='text-white text-center'>Hapus Proker</Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default DetailProkerScreen;