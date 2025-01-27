import type React from "react"
import { View, Text, TouchableOpacity, Platform, StatusBar, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialIcons } from "@expo/vector-icons"

interface HeaderGradientProps {
    title: string
    rightButtonText?: string
    rightButtonIcon?: keyof typeof MaterialIcons.glyphMap
    onRightButtonPress?: () => void
    showBackButton?: boolean
    onBackPress?: () => void
}

const HeaderGradient: React.FC<HeaderGradientProps> = ({
    title,
    rightButtonText,
    rightButtonIcon,
    onRightButtonPress,
    showBackButton,
    onBackPress,
}) => {
    return (
        <LinearGradient
            colors={["#0A0A0A", "#0A0A0A", "#0A0A0A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.container, showBackButton ? styles.containerWithBackButton : styles.containerWithoutBackButton]}
        >
        {showBackButton && (
            <TouchableOpacity onPress={onBackPress}>
                <MaterialIcons name="arrow-back" size={24} color="#E0B942" />
            </TouchableOpacity>
        )}
        <Text style={[styles.title, showBackButton ? styles.titleWithBackButton : styles.titleWithoutBackButton]}>
            {title}
        </Text>
        {rightButtonText && (
            <TouchableOpacity style={styles.button} onPress={onRightButtonPress}>
                <Text style={styles.buttonText}>{rightButtonText}</Text>
                {rightButtonIcon && <MaterialIcons name={rightButtonIcon} size={20} color="#FFFFFF" />}
            </TouchableOpacity>
        )}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 40,
        paddingHorizontal: 16,
        alignItems: "center",
        height: Platform.OS === "ios" ? 110 : 88 + (StatusBar.currentHeight || 0),
    },
    containerWithBackButton: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    containerWithoutBackButton: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    titleWithBackButton: {
        marginLeft: 16,
    },
    titleWithoutBackButton: {
        marginLeft: 0,
    },
    button: {
        backgroundColor: "#E0B942",
        padding: 10,
        borderRadius: 5,
        width: 90,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
})

export default HeaderGradient

