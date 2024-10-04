import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { Button, TextInput, useTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");

  const handleSendResetEmail = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        "Thông báo quên mật khẩu",
        `Mật khẩu đã được gửi về email đăng ký, bạn vui lòng kiểm tra hộp thư email ! ${email}.`
      );
      navigation.navigate("Login"); // Chuyển hướng về Login sau khi gửi email
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Forgot Password</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSendResetEmail}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          Send Reset Email
        </Button>

        <View style={styles.loginContainer}>
          <Text>Remember your password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default ForgotPassword;