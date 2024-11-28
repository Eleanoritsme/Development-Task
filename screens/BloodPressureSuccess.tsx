import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const BloodPressureSuccess = () => {

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
          <Ionicons name="checkmark" size={40} color="#FFFFFF" />
          <Text style={styles.overlayText}>Logged</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  overlay: {
    width: 150,
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
    zIndex: 3
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
});



export default BloodPressureSuccess;

