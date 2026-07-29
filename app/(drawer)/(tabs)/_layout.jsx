import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF', headerShown: false }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'שעון נוכחות',
                    tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'היסטוריה',
                    tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}