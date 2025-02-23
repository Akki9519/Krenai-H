import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Button,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const LeaveRequestModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleDateTime = (event:any, selectedDate:any) => {
    setShow(Platform.OS === "android"); // Keep open only for iOS picker
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Shake animation for error handling
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // Handle Submit
  const handleSubmit = () => {
    if (!reason.trim()) {
      triggerShake();
      showToastMessage("Please enter a reason");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setModalVisible(false);
      showToastMessage("Leave Request Submitted!");
      setReason("");
    }, 2000);
  };

  // Show Custom Toast
  const showToastMessage = (message:any) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <View style={styles.container}>
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Custom Bottom Sheet Modal */}
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Animated.View style={[styles.innerContent, { transform: [{ translateX: shakeAnim }] }]}>
              <Text style={styles.heading}>Request Leave</Text>

              {/* Date Picker */}
              <View style={{ alignItems: 'center' }}>
                <Button  title="Select Date" onPress={() => setShow(true)} />
                <Text style={{ marginTop: 10 }}>Selected Date: {date.toDateString()}</Text>
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateTime}
                  />
                )}
              </View>

              {/* Reason Input */}
              <TextInput
                style={styles.input}
                placeholder="Enter reason for leave"
                value={reason}
                onChangeText={setReason}
              />

              {/* Submit Button */}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitting}>
                <Text style={styles.submitText}>{isSubmitting ? "✔" : "Submit"}</Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Modal>

      {/* Custom Toast Message */}
      {showToast && <View style={styles.toast}><Text style={styles.toastText}>{toastMessage}</Text></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#1D56A5",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: { color: "white", fontSize: 24, fontWeight: "bold" },
  modalOverlay: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.4)" },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  innerContent: { width: "100%", alignItems: "center" },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#1D56A5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  submitText: { color: "white", fontSize: 16, fontWeight: "bold" },
  closeButton: { marginTop: 10, padding: 8 },
  closeText: { color: "#FF3B30", fontWeight: "bold" },
  toast: {
    position: "absolute",
    bottom: 80,
    backgroundColor: "#1D56A5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  toastText: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default LeaveRequestModal;
