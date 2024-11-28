import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

type AccountDeletionSuccessScreenProp = NavigationProp<
  RootStackParamList,
  'AccountDeletionSuccess'
>;

const AccountDeletionSuccess = () => {
  const navigation = useNavigation<AccountDeletionSuccessScreenProp>();

  const continueWithEmail = () => {
      navigation.navigate('BloodPressure');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.control}>
          <TouchableOpacity style={styles.leftArrowButton} onPress={handleBackPress}>
          <Feather name="arrow-left" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <View style={styles.text}>
            <Text style={styles.bodyText1}>
              Welcome            
            </Text>
            <Text style={styles.bodyText}>
              To continue, please enter your email address.
            </Text>
          </View>

          <View style={styles.input}>
            <TextInput style={styles.inputBox} placeholder='jane@example.com' />
          </View>

          <View style={styles.noticeBar}>
            <Ionicons name="information-circle-outline" size={18} color="#316BFF" />
            <Text style={styles.bodyText2}>
              Your account was deleted. We sincerely hope to have the opportunity to serve you again in the future.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footerButton}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.customButton]}
            onPress={continueWithEmail}
          >
          <Text style={styles.buttonText}>
            Continue With Email
          </Text>
        </TouchableOpacity>
        </View>
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 64,
    paddingHorizontal: 10,
    gap: 48,
    width: '100%',
    height: 678,
    flexGrow: 1,
  },
  control: { 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    height: 44,
    gap: 10,
  },
  leftArrowButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24,
    width: '100%',
    height: 230,
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    width: 351,
    height: 58,
  },
  bodyText: {
    width: '100%',
    height: 22,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(37, 37, 37, 0.45)'
  },
  bodyText1: {
    width: 351,
    height: 32,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: 32,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(37, 37, 37, 0.85)',
    alignSelf: 'stretch'
  },
  input:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
    height: 42
  },
  inputBox:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 4,
    width: '100%',
    height: 42,
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 8
  },
  noticeBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    width: '100%',
    height: 82,
    backgroundColor: '#F2F4FF',
    borderRadius: 8
  },
  bodyText2: {
    width: 301,
    height: 66,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    color: '#316BFF',
    flexGrow: 1
  },
  footerButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 134,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 72,
    width: '100%',
    height: 134,
  },
  customButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    height: 50,
    backgroundColor: '#316BFF',
    borderRadius: 8,
    flexGrow: 1
  },
  buttonText: {
    width: '100%',
    height: 26,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: '#FFFFFF',
    flexGrow: 0,
  },
});

export default AccountDeletionSuccess;
