import Transaction from "./Transaction";
import Customer from "./Customer";
import Setting from "./Setting";
import Customers from "./Customers";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "../router/RouterService";

const Tab =  createMaterialBottomTabNavigator();

const Admin = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="RouterService" component={RouterService} 
            options={{
                title: "Home",
                tabBarIcon: "home"
            }}/>

            <Tab.Screen name="Transaction" component={Transaction} 
            options={{
                tabBarIcon: "cash"
            }}/>
            <Tab.Screen name="Customer" component={Customer}
            options={{
                tabBarIcon: "account"
            }} />
            <Tab.Screen name="Setting" component={Setting} 
            options={{
                tabBarIcon: "cog"
            }}/>
        </Tab.Navigator>
    )
}

export default Admin