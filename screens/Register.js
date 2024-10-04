import React, { useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import {
  Button,
  HelperText,
  TextInput,
  useTheme
} from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const Register = ({ navigation }) => {
  const { colors } = useTheme();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);

  const [errors, setErrors] = useState({});

  const USERS = firestore().collection("USERS");

  const validateForm = () => {
    let newErrors = {};

    if (fullName.trim() === "") {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async () => {
    if (validateForm()) {
      try {
        const response = await auth().createUserWithEmailAndPassword(email, password);
        await USERS.doc(email).set({
          fullName,
          email,
          password, // Remember to hash the password securely!
          phone,
          address,
          role: "customer",
        });
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      } catch (e) {
        Alert.alert("Error", e.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <RNText style={[styles.title, { color: colors.primary }]}>Create Account</RNText>

          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            mode="outlined"
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.fullName}>
            {errors.fullName}
          </HelperText>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            mode="outlined"
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hiddenPassword}
            mode="outlined"
            style={styles.input}
            right={
              <TextInput.Icon
                icon={hiddenPassword ? "eye-off" : "eye"}
                onPress={() => setHiddenPassword(!hiddenPassword)}
              />
            }
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>

          <TextInput
            label="Confirm Password"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry={hiddenPasswordConfirm}
            mode="outlined"
            style={styles.input}
            right={
              <TextInput.Icon
                icon={hiddenPasswordConfirm ? "eye-off" : "eye"}
                onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)}
              />
            }
          />
          <HelperText type="error" visible={!!errors.passwordConfirm}>
            {errors.passwordConfirm}
          </HelperText>

          <TextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            mode="outlined"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleCreateAccount}
            style={styles.button}
          >
            Create Account
          </Button>

          <View style={styles.loginContainer}>
            <RNText>Already have an account?</RNText>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <RNText style={styles.loginLink}> Login</RNText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
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

export default Register;