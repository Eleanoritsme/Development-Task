import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type AccountDeletionScreenProp = NavigationProp<
  RootStackParamList,
  'AccountDeletion'
>;

const AccountDeletion = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigation = useNavigation<AccountDeletionScreenProp>();

  const handleDeleteClick = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      navigation.navigate('AccountDeletionSuccess');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.control}>
          <View style={styles.text}>
            <Text style={styles.header}>Account deletion</Text>
            <Text style={styles.subheader}>Manage your account</Text>
          </View>
          <View style={styles.crossButtonWrapper}>
            <TouchableOpacity style={styles.button} >
              <View style={styles.cross}>
                <View style={[styles.crossLine, styles.crossLine1]} />
                <View style={[styles.crossLine, styles.crossLine2]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.bodyText}>
            At any time or for any reason you can request to permanently delete your account.
          </Text>
          <Text style={styles.bodyText1}>
            What happens when my account is deleted?
          </Text>
          <Text style={styles.bodyText}>
            • You will no longer be able to sign in to the Engage mobile app.
          </Text>
          <Text style={styles.bodyText}>
            • Your data associated with Engage will be permanently deleted.
          </Text>
          <Text style={styles.bodyText}>
            • If you are enrolled in Engage research studies, deletion does not withdraw you from the research study. Please contact your research coordinator for more information.
          </Text>
          <Text style={styles.bodyText}>
          Account deletion is permanent. If you would like to proceed with the request for account deletion, please enter your credentials.
          </Text>
          <Text style={styles.warningText}>
          After confirming your account deletion, you will be automatically logged out, and your account will be permanently deleted.
          </Text>
        </View>
      </View>
      
      <View style={styles.footerButton}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.customButton, isDeleting && styles.hoverButton]}
            onPress={handleDeleteClick}
            disabled={isDeleting}
          >
            <Text style={[styles.buttonText, isDeleting && styles.hoverButtonText]}>
              {isDeleting ? 'Confirm Deletion' : 'Delete Account'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isDeleting && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.overlayText}>Loading...</Text>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#316BFF'
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    width: '100%',
    height: 142,
    paddingTop: 74,
    paddingBottom: 16,
  },
  control: { 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    height: 54
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    width: '80%',
    height: 54
  },
  header: {
    width: 297,
    height: 28,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 28,
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  subheader: {
    width: 297,
    height: 22,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF'
  },
  crossButtonWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '20%',
    height: 46,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 46,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  cross: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(37, 37, 37, 0.85)',
    alignSelf: 'center',
  },
  crossLine1: {
    transform: [{ rotate: '45deg' }],
  },
  crossLine2: {
    transform: [{ rotate: '-45deg' }],
  },
  content: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    paddingTop: 4,
    width: '100%',
    zIndex: 1
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 8,
    width: '100%',
    height: 532,
    backgroundColor: '#FFFFFF',
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  bodyText: {
    width: '100%',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(37, 37, 37, 0.85)',
    alignSelf: 'stretch',
    flexGrow: 0
  },
  bodyText1: {
    width: 351,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(37, 37, 37, 0.85)',
    alignSelf: 'stretch',
    flexGrow: 0
  },
  warningText: {
    width: 351,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(37, 37, 37, 0.45)',
    alignSelf: 'stretch',
    flexGrow: 0
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
    alignSelf: 'stretch',
    flexGrow: 0
  },
  customButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    height: 50,
    borderColor: '#FF0844',
    borderWidth: 1,
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
    color: '#FF0844', 
  },
  hoverButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    height: 50,
    backgroundColor: '#FF0844',
  },
  hoverButtonText: {
    width: '100%',
    height: 26,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: '#FFFFFF',
    flexGrow: 0   
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

export default AccountDeletion;
