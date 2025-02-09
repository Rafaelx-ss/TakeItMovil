import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';



const SkeletonLoader = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <View style={[styles.image, styles.skeletonBg]} />
        <LinearGradient
          colors={['transparent', 'rgba(26, 26, 26, 0.8)', '#1A1A1A']}
          style={styles.gradient}
        />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
  
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.skeletonBg, { height: 32, width: '80%', marginBottom: 12 }]} />
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeItem}>
              <View style={[styles.skeletonBg, { height: 20, width: 120 }]} />
            </View>
            <View style={styles.dateTimeItem}>
              <View style={[styles.skeletonBg, { height: 20, width: 80 }]} />
            </View>
          </View>
        </View>
  
        <View style={styles.mainInfoCard}>
          {[1, 2, 3, 4].map((_, index) => (
            <React.Fragment key={index}>
              <View style={styles.infoRow}>
                <View style={[styles.iconContainer, styles.skeletonBg]} />
                <View style={styles.infoContent}>
                  <View style={[styles.skeletonBg, { height: 14, width: '30%', marginBottom: 4 }]} />
                  <View style={[styles.skeletonBg, { height: 16, width: '60%' }]} />
                </View>
              </View>
              {index < 3 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>
  
        <View style={styles.section}>
          <View style={[styles.skeletonBg, { height: 22, width: '60%', marginBottom: 16 }]} />
          <View style={[styles.skeletonBg, { height: 16, width: '100%', marginBottom: 8 }]} />
          <View style={[styles.skeletonBg, { height: 16, width: '90%', marginBottom: 8 }]} />
          <View style={[styles.skeletonBg, { height: 16, width: '95%' }]} />
        </View>
  
        <View style={styles.section}>
          <View style={[styles.skeletonBg, { height: 22, width: '50%', marginBottom: 16 }]} />
          <View style={styles.kitContainer}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.kitItem}>
                <View style={[styles.skeletonBg, { height: 20, width: 20, borderRadius: 10 }]} />
                <View style={[styles.skeletonBg, { height: 16, width: '60%', marginLeft: 12 }]} />
              </View>
            ))}
          </View>
        </View>
  
        <View style={styles.section}>
          <View style={[styles.skeletonBg, { height: 22, width: '40%', marginBottom: 16 }]} />
          <View style={[styles.contactButton, styles.skeletonBg]} />
        </View>
  
        <View style={[styles.registerButton, styles.skeletonBg, { marginBottom: 32 }]} />
      </View>
    </ScrollView>
  );

export default SkeletonLoader;


const styles = StyleSheet.create({
  skeletonBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  imageContainer: {
    height: 350,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    marginTop: -50,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateTimeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  mainInfoCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: '#E0B942',
    fontSize: 14,
    marginBottom: 4,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  infoSubtext: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#3A3A3A',
    marginVertical: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  kitContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
  },
  kitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  kitText: {
    color: '#FFFFFF',
    marginLeft: 12,
    fontSize: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#E0B942',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 32,
    gap: 8,
  },
  registeringButton: {
    backgroundColor: '#CC8400',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});