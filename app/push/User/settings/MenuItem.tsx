import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './settings';

interface MenuItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
  onPress?: () => void;
  style?: object;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.menuItem, style]} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <MaterialIcons name={icon} size={24} color="#E0B942" />
        <Text style={styles.menuItemText}>{text}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#E0B942" />
    </TouchableOpacity>
  );
};

export default MenuItem;