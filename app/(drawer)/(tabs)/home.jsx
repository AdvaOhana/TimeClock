import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const router = useRouter();

    const triggerAnimation = () => {
        Animated.sequence([
            Animated.spring(scaleAnim, { toValue: 1.2, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
        ]).start();
    };

    const handlePressAction = async () => {
        triggerAnimation();
        const currentTime = new Date();

        if (!isCheckedIn) {
            setCheckInTime(currentTime);
            setIsCheckedIn(true);
        } else {
            if (checkInTime) {
                const diffMs = currentTime.getTime() - checkInTime.getTime();
                const diffMins = Math.floor(diffMs / 60000);
                const hours = Math.floor(diffMins / 60);
                const minutes = diffMins % 60;
                const durationStr = `${hours} שעות ו-${minutes} דקות`;

                const newShift = {
                    id: Date.now().toString(),
                    date: currentTime.toLocaleDateString('he-IL'),
                    checkIn: checkInTime.toLocaleTimeString('he-IL'),
                    checkOut: currentTime.toLocaleTimeString('he-IL'),
                    duration: durationStr,
                };

                try {
                    const existingData = await AsyncStorage.getItem('shifts_history');
                    const shifts = existingData ? JSON.parse(existingData) : [];
                    shifts.unshift(newShift);
                    await AsyncStorage.setItem('shifts_history', JSON.stringify(shifts));
                } catch (error) {
                    console.error('Failed to save shift', error);
                }
            }
            setIsCheckedIn(false);
            setCheckInTime(null);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.headerTitle}>מערכת נוכחות</Text>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                    style={[styles.mainButton, { backgroundColor: isCheckedIn ? '#FF3B30' : '#34C759' }]}
                    onPress={handlePressAction}
                >
                    <Text style={styles.mainButtonText}>{isCheckedIn ? 'יציאה מהמשמרת' : 'כניסה למשמרת'}</Text>
                </TouchableOpacity>
            </Animated.View>

            {isCheckedIn && checkInTime && (
                <Text style={styles.statusText}>נכנסת בשעה: {checkInTime.toLocaleTimeString('he-IL')}</Text>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
    profileBtn: { position: 'absolute', top: 50, right: 20 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 40, color: '#333' },
    mainButton: { width: 200, height: 200, borderRadius: 100, justifyContent: 'center', alignItems: 'center', elevation: 5 },
    mainButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    statusText: { marginTop: 30, fontSize: 16, color: '#666' },
    aboutBtn: { marginTop: 40 },
    aboutText: { color: '#007AFF', fontSize: 16 }
});