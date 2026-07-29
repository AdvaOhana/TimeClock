import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export default function HistoryScreen() {
    const [shifts, setShifts] = useState([]);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            loadShifts();
        }, [])
    );

    const loadShifts = async () => {
        try {
            const data = await AsyncStorage.getItem('shifts_history');
            if (data) {
                setShifts(JSON.parse(data));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>היסטוריית משמרות</Text>
            {shifts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="documents-outline" size={64} color="#ccc" />
                    <Text style={styles.emptyText}>אין עדיין משמרות מתועדות</Text>
                    <LottieView source={require('../../../assets/animations/socialv no data.json')}
                        autoPlay
                        loop={true}
                        style={{ width: 200, height: 200 }}
                    />

                </View>
            ) : (
                <FlatList
                    data={shifts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push({ pathname: '/details', params: item })}
                        >
                            <Text style={styles.cardDate}>תאריך: {item.date}</Text>
                            <Text style={styles.cardInfo}>כניסה: {item.checkIn} | יציאה: {item.checkOut}</Text>
                            <Text style={styles.cardDuration}>משך: {item.duration}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { marginTop: 10, fontSize: 16, color: '#888' },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, elevation: 2 },
    cardDate: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    cardInfo: { fontSize: 14, color: '#555', marginVertical: 4 },
    cardDuration: { fontSize: 14, color: '#007AFF', fontWeight: '500' }
});