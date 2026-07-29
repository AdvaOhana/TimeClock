import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';

export default function AboutScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>אודות האפליקציה</Text>
            <Text style={styles.text}>אפליקציית שעון נוכחות לניהול משמרות, תיעוד זמני כניסה ויציאה ומעקב אחר היסטוריה עסקית.</Text>
            <Text style={styles.developer}>מפתחת: אדווה אוחנה</Text>

            <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL('https://github.com/AdvaOhana/TimeClock')}>
                <Text style={styles.linkText}>קישור ל-Repository ב-GitHub</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>חזור</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
    text: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 15 },
    developer: { fontSize: 16, fontWeight: 'bold', marginBottom: 25, color: '#333' },
    linkButton: { marginBottom: 20 },
    linkText: { color: '#007AFF', fontSize: 16, textDecorationLine: 'underline' },
    backButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});