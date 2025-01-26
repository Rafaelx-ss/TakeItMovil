import React from 'react';
import { View, Text, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface HeaderGradientProps {
    title: string;
    rightButtonText?: string;
    rightButtonIcon?: keyof typeof MaterialIcons.glyphMap;
    onRightButtonPress?: () => void;
}

const HeaderGradient: React.FC<HeaderGradientProps> = ({
    title,
    rightButtonText,
    rightButtonIcon,
    onRightButtonPress,
}) => {
    return (
        <LinearGradient
            colors={['#0A0A0A', '#0A0A0A', '#0A0A0A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
        <Text style={styles.title}>{title}</Text>
        {rightButtonText && (
            <TouchableOpacity
                style={styles.button}
                onPress={onRightButtonPress}
            >
                <Text style={styles.buttonText}>{rightButtonText}</Text>
                {rightButtonIcon && (
                    <MaterialIcons name={rightButtonIcon} size={20} color="#FFFFFF" />
                )}
            </TouchableOpacity>
        )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 40,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? 88 : 88 + (StatusBar.currentHeight || 0),
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    button: {
        backgroundColor: '#E0B942',
        padding: 10,
        borderRadius: 5,
        width: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default HeaderGradient;