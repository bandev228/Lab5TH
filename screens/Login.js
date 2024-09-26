import { View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { login, useMyContextController } from "../store";
import { useEffect, useState } from "react";

const Login = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const hasErrorEmail = () => !email.includes("@")
    const hasErrorPassword = () => password.length < 6
    const handeLogin = () => {
        login(dispatch, email, password)
    }
    useEffect(() => {
        console.log(userLogin)
        if (userLogin != null) {
            if (userLogin.role === "admin")
                navigation.navigate("Admin")
            else if (userLogin.role === "customer")
                navigation.navigate("Customer")
        }
    }, [userLogin])
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                alignSelf: "center",
                color: "pink",
                marginTop: 100,
                marginBottom: 50
            }}>Login</Text>
            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail} />
            <HelperText type="error" visible={hasErrorEmail()}>Dia Chi Email Khong Hop Le</HelperText>
            <TextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon={"eye"} onPress={() => setHiddenPassword(!hiddenPassword)} />} />
            <HelperText type="error" visible={hasErrorPassword()}>Password it nhat 6 ky tu</HelperText>
            <Button mode="contained" buttonColor="blue" onPress={handeLogin}>Login</Button>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text>Don't have an account ?</Text>
                <Button onPress={() => navigation.navigate("Register")}>Register</Button>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Button onPress={() => navigation.navigate("ForgotPassword")}>Forgot Password</Button>
            </View>
        </View>
    )
}
export default Login