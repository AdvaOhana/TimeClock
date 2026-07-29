import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        const savedUser = await AsyncStorage.getItem('app_username');
        const savedPass = await AsyncStorage.getItem('app_password');
        const savedImage = await AsyncStorage.getItem('profile_image');
        if (savedUser) setUsername(savedUser);
        if (savedPass) setPassword(savedPass);
        if (savedImage) setImage(savedImage);
    };

    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await AsyncStorage.setItem('profile_image', result.assets[0].uri);
        }
    };

    const takePhotoWithCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('שגיאה', 'יש לאשר גישה למצלמה');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await AsyncStorage.setItem('profile_image', result.assets[0].uri);
        }
    };

    const saveChanges = async () => {
        await AsyncStorage.setItem('app_username', username);
        await AsyncStorage.setItem('app_password', password);
        Alert.alert('הצלחה', 'הפרטים עודכנו בהצלחה!');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImageFromGallery}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>הוסף תמונה</Text></View>
                )}
            </TouchableOpacity>

            <View style={styles.btnRow}>
                <TouchableOpacity style={styles.smallBtn} onPress={pickImageFromGallery}><Text style={styles.smallBtnText}>בחר מהגלריה</Text></TouchableOpacity>
                <TouchableOpacity style={styles.smallBtn} onPress={takePhotoWithCamera}><Text style={styles.smallBtnText}>צלם תמונה</Text></TouchableOpacity>
            </View>

            <TextInput style={styles.input} placeholder="שם משתמש חדש" value={username} onChangeText={setUsername} autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="סיסמה חדשה" secureTextEntry value={password} onChangeText={setPassword} />

            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.saveButtonText}>שמור שינויים</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>חזור</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60, alignItems: 'center', backgroundColor: '#fff' },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
    avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    avatarText: { color: '#555', fontSize: 12 },
    btnRow: { flexDirection: 'row', marginBottom: 20 },
    smallBtn: { backgroundColor: '#e0e0e0', padding: 8, borderRadius: 6, marginHorizontal: 5 },
    smallBtnText: { color: '#333', fontSize: 14 },
    input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
    saveButton: { width: '100%', height: 50, backgroundColor: '#34C759', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 10 },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    backButton: { width: '100%', height: 50, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});