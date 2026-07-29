// app/+not-found.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>דף זה לא קיים</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/home')}>
                <Text style={styles.buttonText}>חזור למסך הבית</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#FF3B30' },
    button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});