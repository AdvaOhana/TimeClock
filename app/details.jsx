import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DetailsScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>פרטי משמרת מורחבים</Text>
                <Text style={styles.label}>תאריך: <Text style={styles.value}>{params.date}</Text></Text>
                <Text style={styles.label}>שעת כניסה: <Text style={styles.value}>{params.checkIn}</Text></Text>
                <Text style={styles.label}>שעת יציאה: <Text style={styles.value}>{params.checkOut}</Text></Text>
                <Text style={styles.label}>משך המשמרת: <Text style={styles.value}>{params.duration}</Text></Text>

                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={20} color="#fff" />
                    <Text style={styles.backButtonText}>חזור</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
    card: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 5 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
    label: { fontSize: 16, color: '#666', marginBottom: 10 },
    value: { fontWeight: 'bold', color: '#333' },
    backButton: { flexDirection: 'row', backgroundColor: '#007AFF', padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});