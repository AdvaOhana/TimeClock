import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef(null);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('app_username') || 'kinneret';
            const storedPass = await AsyncStorage.getItem('app_password') || '1234';

            if (username === storedUser && password === storedPass) {
                router.replace('/(tabs)/home');
            } else {
                Alert.alert('שגיאת התחברות', 'שם משתמש או סיסמה שגויים');
            }
        } catch (error) {
            Alert.alert('שגיאה', 'אירעה שגיאה בבדיקת הנתונים');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>שעון נוכחות</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="שם משתמש"
                        placeholderTextColor="#888"
                        value={username}
                        onChangeText={setUsername}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        blurOnSubmit={false}
                        autoCapitalize="none"
                    />

                    <TextInput
                        ref={passwordRef}
                        style={styles.input}
                        placeholder="סיסמה"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>כניסה</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
    card: { width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 4 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
    input: { height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fafafa' },
    button: { height: 50, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});