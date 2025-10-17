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
                name="planning"
                options={{
                    title: 'Planning',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'pencil-sharp' : 'pencil-outline'} color={color} size={24} />
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

            <Tabs.Screen name="exercises"
                options={{
                    title: 'Exercises',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'barbell-sharp' : 'barbell-outline'} color={color} size={24} />
                    )
                }} />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
                    ),
                }}
            />
        </Tabs>
    );
}
