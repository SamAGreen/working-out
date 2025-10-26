import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../styling/stylingStandards';
import CustomTextInput from './CustomTextInput';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    placeholder = 'Search...',
    onClear,
}) => {
    return (
        <View style={styles.container}>
            <CustomTextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={theme.Colors.text_800}
                value={value}
                onChangeText={onChangeText}
            />
            <Ionicons
                name="search-outline"
                size={20}
                color={theme.Colors.text_800}
                style={styles.icon}
            />
            {value.length > 0 && (
                <Pressable onPress={onClear} style={styles.clearButton}>
                    <Ionicons name="close-circle" size={20} color={theme.Colors.text_800} />
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.Colors.background_50,
        borderColor: theme.Colors.background_800,
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: theme.Spacing.sm,
        height: 44,
        marginBottom: theme.Spacing.sm,
    },
    icon: {
        marginRight: theme.Spacing.xs,
    },
    input: {
        flex: 1,
    },
    clearButton: {
        marginLeft: theme.Spacing.xs,
    },
});

export default SearchBar;
