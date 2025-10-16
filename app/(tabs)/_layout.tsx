import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import { PlusButton } from './dummy';


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#ffff',
                    borderTopWidth: 0
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="dummy"
                options={{
                    title: 'Dummy',
                    tabBarButton: PlusButton
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
                    ),
                }}
            />
        </Tabs>
    );
}
