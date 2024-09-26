import { Image, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

const Service = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image source={require("../assets/favicon.png")}
        style={{
          alignSelf: "center",
          marginVertical: 50
        }}
      />
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Text style={{
          fontSize: 40,
          fontWeight: "bold"
        }}>Danh sach dich vu</Text>
        <IconButton icon={"plus-circle"} iconColor="red"
          size={40}
          onPress={() => navigation.navigate("AddNewService")}
        />
      </View>
    </View>
  )
}

export default Service;