    import React, { useEffect, useState } from 'react';
    import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
    import { Text, TextInput, Button, HelperText } from 'react-native-paper';
    import { login, useMyContextController } from "../store";
    import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


    const Login = ({ navigation }) => {
        const [controller, dispatch] = useMyContextController();
        const { userLogin } = controller;
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [hiddenPassword, setHiddenPassword] = useState(true);
        const [errors, setErrors] = useState({});

        
        const validateForm = () => {
            let newErrors = {};
            if (!email.includes("@")) {
                newErrors.email = "Invalid email address";
            }
            if (password.length < 6) {
                newErrors.password = "Password must be at least 6 characters";
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleLogin = () => {
            if (validateForm()) {
                login(dispatch, email, password);
            }
        };

        useEffect(() => {
            if (userLogin != null) {
                if (userLogin.role === "admin")
                    navigation.navigate("Admin");
                else if (userLogin.role === "customer")
                    navigation.navigate("Customer");
            }
        }, [userLogin]);

        return (
            <ImageBackground 
                source={require('../assets/176849.jpg')} 
                style={styles.background}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.content}>
                            <Text style={styles.title}>Welcome Back!</Text>
                            <Text style={styles.subtitle}>Please sign in to your account</Text>

                            <TextInput
                                label="Email"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                theme={{ colors: { primary: 'white', text: 'white', placeholder: 'rgba(255,255,255,0.7)' } }}
                                keyboardType="email-address"
                            />
                            <HelperText type="error" visible={!!errors.email} style={styles.helperText}>
                                {errors.email}
                            </HelperText>

                            <TextInput
                                label="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={hiddenPassword}
                                right={<TextInput.Icon icon={hiddenPassword ? "eye-off" : "eye"} onPress={() => setHiddenPassword(!hiddenPassword)} color="white" />}
                                style={styles.input}
                                theme={{ colors: { primary: 'white', text: 'white', placeholder: 'rgba(255,255,255,0.7)' } }}
                            />
                            <HelperText type="error" visible={!!errors.password} style={styles.helperText}>
                                {errors.password}
                            </HelperText>

                            <Text style={styles.forgotPassword} onPress={() => navigation.navigate("ForgotPassword")}>
                                Forgot Password?
                            </Text>

                            <Button mode="contained" onPress={handleLogin} style={styles.signInButton} labelStyle={styles.buttonText}>
                                Sign In
                            </Button>

                            <Button mode="outlined" onPress={() => {/* Handle Google Sign In */}} style={styles.googleButton} icon={() => <Icon name="google" size={20} color="#000" />}>
                                Sign In With Google
                            </Button>

                            <Button mode="contained" onPress={() => {/* Handle Facebook Sign In */}} style={styles.facebookButton} icon={() => <Icon name="facebook" size={20} color="#fff" />}>
                                Sign In With Facebook
                            </Button>

                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Don't Have An Account? </Text>
                                <Text style={styles.signUpLink} onPress={() => navigation.navigate("Register")}>Sign Up</Text>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    };

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            width: '100%',
            height: '100%',
        },
        container: {
            flex: 1,
        },
        scrollViewContent: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        content: {
            padding: 20,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 16,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginBottom: 30,
        },
        input: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            marginBottom: 10,
        },
        helperText: {
            color: 'red',
        },
        forgotPassword: {
            color: 'white',
            textAlign: 'right',
            marginBottom: 20,
        },
        signInButton: {
            backgroundColor: '#4a69ff',
            marginBottom: 15,
        },
        googleButton: {
            backgroundColor: 'white',
            marginBottom: 15,
        },
        facebookButton: {
            backgroundColor: '#3b5998',
            marginBottom: 15,
        },
        buttonText: {
            fontSize: 16,
        },
        signUpContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
        },
        signUpText: {
            color: 'rgba(255,255,255,0.7)',
        },
        signUpLink: {
            color: '#4a69ff',
            fontWeight: 'bold',
        },
    });

    export default Login;