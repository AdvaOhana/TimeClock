import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{ headerShown: true }}>
            <Drawer.Screen
                name="(tabs)"
                options={{
                    title: 'דף בית',
                    drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />
                }}
            />

            <Drawer.Screen
                name="profile"
                options={{
                    title: 'פרופיל משתמש',
                    drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />
                }}
            />

            <Drawer.Screen
                name="about"
                options={{
                    title: 'אודות',
                    drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />
                }}
            />
        </Drawer>
    );
}