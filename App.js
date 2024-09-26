import { MyContextControllerProvider } from "./store/index";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./router/Router";

const App = () => {
  const USERS = firestore().collection("USERS")
  const admin = {
    fullName: "admin",
    email: "admin@gmail.com",
    password: "admin123",
    phone: "08123456789",
    address: "Jl. Admin",
    role: "admin"
  }
  useEffect(() => {
    USERS.doc(admin.email)
      .onSnapshot(
        u => {
          if (!u.exists) {
            auth().createUserWithEmailAndPassword(admin.email, admin.password)
              .then(respone => {
                USERS.doc(admin.email).set(admin)
                console.log("Add new account admin")
              }
              )
          }
        }
      )
  }, [])
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}
export default App
