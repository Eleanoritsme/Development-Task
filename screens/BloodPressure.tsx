import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { PickerView } from '@ant-design/react-native';

type BloodPressureScreenProp = NavigationProp<
  RootStackParamList,
  'BloodPressure'
>;
type BloodPressureValues = [number | null, number | null, number | null];

const BloodPressure = () => {
  const navigation = useNavigation<BloodPressureScreenProp>();
  const [values, setValues] = useState<BloodPressureValues>([null, null, null]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<'systolic' | 'diastolic' | 'heartRate' | 'date' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const [selectedDate, setSelectedDate] = useState(formattedToday);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.navigate('BloodPressureSuccess');
    }, 2000);
  };

  const bloodPressureData = Array.from({ length: 200 }, (_, i) => ({
    label: `${i}`,
    value: i,
  }));

  const unitData = [
    {
      label: currentType === 'systolic' || currentType === 'diastolic' ? 'mmHg' : 'bpm',
      value: currentType === 'systolic' || currentType === 'diastolic' ? 'mmHg' : 'bpm',
    },
  ];
  
  const columns = [
    bloodPressureData,
    unitData           
  ];


  const handleChange = (value: any[]) => {
    const numericValue = value.map((v) => Number(v));
    if (currentType === 'systolic') {
      setValues([numericValue[0], values[1], values[2]]);
    } else if (currentType === 'diastolic') {
      setValues([values[0], numericValue[0], values[2]]);
    } else if (currentType === 'heartRate') {
      setValues([values[0], values[1], numericValue[0]]);
    }
  };
  
  const isFormComplete = values.every((value) => value !== null);

  const openModal = (type: 'systolic' | 'diastolic' | 'heartRate' ) => {
    setCurrentType(type);
    setModalVisible(true);
  };

  const openDatePickerModal = () => setDateModalVisible(true);

  const closeDatePickerModal = () => setDateModalVisible(false);

  const formattedDate = selectedDate;
  
  const months = [
    { label: 'Jan', value: 'Jan', days: 31 },
    { label: 'Feb', value: 'Feb', days: 29 },
    { label: 'Mar', value: 'Mar', days: 31 },
    { label: 'Apr', value: 'Apr', days: 30 },
    { label: 'May', value: 'May', days: 31 },
    { label: 'Jun', value: 'Jun', days: 30 },
    { label: 'Jul', value: 'Jul', days: 31 },
    { label: 'Aug', value: 'Aug', days: 31 },
    { label: 'Sep', value: 'Sep', days: 30 },
    { label: 'Oct', value: 'Oct', days: 31 },
    { label: 'Nov', value: 'Nov', days: 30 },
    { label: 'Dec', value: 'Dec', days: 31 },
  ];

  const weekday = [
    { label: 'Mon', value: 'Mon' },
    { label: 'Tue', value: 'Tue' },
    { label: 'Wed', value: 'Wed' },
    { label: 'Thu', value: 'Thu' },
    { label: 'Fri', value: 'Fri' },
    { label: 'Sat', value: 'Sat' },
    { label: 'Sun', value: 'Sun' },
  ];

  const currentYear = new Date().getFullYear(); 
  
  type DateItem = { label: string; value: string };

  const date: DateItem[] = [];
  let dayCount = 0;

  months.forEach((month) => {
    for (let day = 1; day <= month.days; day++) {
      const weekdayIndex = dayCount % 7; 
      const weekdayName = weekday[weekdayIndex].label;

      date.push({
        label: `${weekdayName} ${day} ${month.label}`,
        value: `${weekdayName} ${day} ${month.label}`,
      });

      dayCount++; 
    }
  });

  const hours = Array.from({ length: 13 }, (_, i) => ({
    label: `${i < 10 ? i : i}`,
    value: `${i < 10 ? i : i}`,
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: `${i < 10 ? '0' + i : i}`,
    value: `${i < 10 ? '0' + i : i}`,
  }));

  const time = [
    { label: 'AM', value: 'AM' },
    { label: 'PM', value: 'PM' },
  ];

  const dateColumns = [
    date,
    hours,
    minutes,
    time
  ];

  const handleDateChange = (value: any[]) => {
    const [date, hours, minutes, time] = value
    const dateString = `${date} ${currentYear}, ${hours}:${minutes} ${time}`;
    setSelectedDate(dateString)
  };

  const handleBackPress = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.control}>
          <View style={styles.progress}>
            <Text style={styles.progressText}>
              1 of 1
            </Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.crossButtonWrapper}>
            <TouchableOpacity style={styles.button} onPress={handleBackPress}>
              <View style={styles.cross}>
                <View style={[styles.crossLine, styles.crossLine1]} />
                <View style={[styles.crossLine, styles.crossLine2]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
          

        <View style={styles.question}>
            <Text style={styles.bodyText1}>
              What was the readings shown on the blood pressure monitor?            
            </Text>
            <Text style={styles.bodyText}>
              Readings for blood pressure log.
            </Text>
        </View>

        <View style={styles.input}>
          <View style={styles.picker}>
            <Text style={styles.dscp}>Systolic</Text>
            <View style={styles.reading}>
              <Text style={styles.readingText}>
                {values[0] ?? '--'} mmHg
              </Text>
              <TouchableOpacity onPress={() => openModal('systolic')}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.picker}>
            <Text style={styles.dscp}>Diastolic</Text>
            <View style={styles.reading}>
              <Text style={styles.readingText}>
                {values[1] ?? '--'} mmHg
              </Text>
              <TouchableOpacity onPress={() => openModal('diastolic')}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.input}>
          <View style={styles.picker}>
            <Text style={styles.dscp}>Heart Rate</Text>
            <View style={styles.reading}>
              <Text style={styles.readingText}>
                {values[2] ?? '--'} bpm
              </Text>
              <TouchableOpacity onPress={() => openModal('heartRate')}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.datePicker}>
        <View style={styles.info}>
          <Text style={styles.subheader}>
            Log Date & Time
          </Text>
          <Text style={styles.header}>
            {formattedDate}
          </Text>
        </View>
        <TouchableOpacity style={styles.dateButton} onPress={openDatePickerModal}>
          <Text style={styles.dateButtonText}>Change</Text>
        </TouchableOpacity>
      </View>

      {isDateModalVisible && (
        <Modal
          transparent={true}
          visible={isDateModalVisible}
          animationType="slide"
          onRequestClose={closeDatePickerModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.bodyText1}>
                    Select Date & Time
                  </Text>
                  <Text style={styles.bodyText}>
                    Date and time for the log.
                  </Text>
                </View>
                <View style={styles.crossButtonWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => setDateModalVisible(false)}>
                  <View style={styles.cross}>
                    <View style={[styles.crossLine, styles.crossLine1]} />
                    <View style={[styles.crossLine, styles.crossLine2]} />
                  </View>
                </TouchableOpacity>
              </View>
              </View>
              <PickerView
                data={dateColumns}
                cols={4}
                cascade={false}
                onChange={(value) => handleDateChange(value)}
                style={styles.pickerStyle}
                
              />
              <View style={styles.footerButton}>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.customButton}
                  onPress={() => setDateModalVisible(false)}
                >
                  <Text style={styles.buttonText}>
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            </View>
          </View>
        </Modal> 
      )}

      <View style={styles.footerButton}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.customButton, { opacity: isFormComplete ? 1 : 0.4 }]}
            onPress={isFormComplete ? handleSubmit : undefined}
            disabled={!isFormComplete}
          >
            <Text style={styles.buttonText}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isSubmitting && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.overlayText}>Loading...</Text>
        </View>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.bodyText1}>
                  {currentType === 'systolic'
                    ? 'Select Systolic'
                    : currentType === 'diastolic'
                    ? 'Select Diastolic'
                    : 'Select Heart Rate'}
                </Text>
                <Text style={styles.bodyText}>
                  {currentType === 'systolic'
                    ? 'Select your systolic reading'
                    : currentType === 'diastolic'
                    ? 'Select your diasolic reading'
                    : 'Select your heart rate reading'}
                </Text>
              </View>
              <View style={styles.crossButtonWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                  <View style={styles.cross}>
                    <View style={[styles.crossLine, styles.crossLine1]} />
                    <View style={[styles.crossLine, styles.crossLine2]} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            
            
            <PickerView
              value={[values[currentType === 'systolic' ? 0 : currentType === 'diastolic' ? 1 : 2] ?? 0]}
              data={columns}
              cascade={false}
              onChange={(value) => handleChange(value)}
              style={styles.pickerStyle}
            />
            
            <View style={styles.footerButton}>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.customButton}
                  onPress={() => setModalVisible(false)}
                >
                <Text style={styles.buttonText}>
                  Select
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    gap: 24,
    width: '100%',
    height: 608,
    flexGrow: 1,
  },
  control: { 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 46,
  },
  progress: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    height: 46,
  },
  progressText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: 52,
    height: 20,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(37, 37, 37, 0.65)'
  },
  horizontalLine: {
    borderRadius: 2.5,
    width: 100,
    height: 5, 
    backgroundColor: '#316BFF', 
  },
  crossButtonWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    height: 46,
    width: '100%'
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
  question: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    width: '100%',
    height: 82,
  },
  bodyText1: {
    width: '100%',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 28,
    color: 'rgba(37, 37, 37, 0.85)',
    alignSelf: 'stretch'
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
    color: 'rgba(37, 37, 37, 0.65)'
  },
  input:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 12,
    width: '100%',
    height: 88
  },
  picker: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
    width: '50%',
    height: '100%',
    flexGrow: 1
  },
  dscp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '50%',
    height: '25%',
    alignSelf: 'stretch',
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 600,
    color: 'rgba(37, 37, 37, 0.45)'
  },
  reading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
    width: 172,
    height: '65%',
    alignSelf: 'stretch'
  },
  readingText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 28,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(37, 37, 37, 0.85)'
  },
  edit: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    color: '#316BFF',
    textDecorationLine: 'underline'
  },
  datePicker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    width: '100%',
    height: 70,
    backgroundColor: '#F2F4FF'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    width: 283,
    height: 46,
    flexGrow: 1
  },
  subheader: {
    width: '100%',
    height: 20,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 20,
    display: 'flex',
    alignItems: 'center',
    color: '#316BFF',
    alignSelf: 'stretch'
  },
  header: {
    width: '100%',
    height: 22,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(37, 37, 37, 0.85)',
    alignSelf: 'stretch'
  },
  dateButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: 65,
    height: 28,
    borderWidth: 1,
    borderColor: '#316BFF',
    borderRadius: 4
  },
  dateButtonText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: '#316BFF'
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '30%'
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  pickerStyle: {
    width: '100%',
    height: 400,
  },
  selectButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#316BFF',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 72,
    width: '100%',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexGrow: 1
  },
  selectButtonText: {
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



export default BloodPressure;
