import { createContext, useContext, useMemo, useReducer } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

// Tạo Context
const MyContext = createContext();
MyContext.displayName = "MyContext";

// Reducer để quản lý state
const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userLogin: action.value };
        case "LOGOUT":
            return { ...state, userLogin: null };
        default:
            return state;  // Trả về state hiện tại nếu không có action phù hợp
    }
};

// Provider để bọc toàn bộ ứng dụng với context
const MyContextControllerProvider = ({ children }) => {
    const initialState = {
        userLogin: null,
        services: [],  // Cũng có thể thêm các service khác vào đây nếu cần
    };
    const [controller, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

// Hook để truy xuất context
const useMyContextController = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContextControllerProvider");
    }
    return context;
};

// Collection của Firestore
const USERS = firestore().collection("USERS");

// Hàm login
const login = (dispatch, email, password) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
            USERS.where("email", "==", email)  // Lấy thông tin người dùng dựa trên email
                .get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach(doc => {
                            dispatch({ type: "USER_LOGIN", value: doc.data() });
                        });
                    } else {
                        Alert.alert("Không tìm thấy người dùng.");
                    }
                });
        })
        .catch(e => Alert.alert("Sai email và password"));
};

// Hàm logout
const logout = (dispatch) => {
    auth().signOut()
        .then(() => dispatch({ type: "LOGOUT" }))
        .catch(e => Alert.alert("Lỗi khi đăng xuất"));
};

// Xuất các thành phần
export {
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout
};
