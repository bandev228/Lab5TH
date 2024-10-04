import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, useTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({ navigation }) => {
  const { colors } = useTheme();
  const [notifications, setNotifications] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    // Khôi phục trạng thái thông báo và Dark Mode từ bộ nhớ
    const restoreSettings = async () => {
      try {
        const notificationsValue = await AsyncStorage.getItem('notifications');
        const darkModeValue = await AsyncStorage.getItem('darkMode');
        setNotifications(notificationsValue === 'true');
        setDarkMode(darkModeValue === 'true');
      } catch (e) {
        console.error('Error restoring settings:', e);
      }
    };
    restoreSettings();
  }, []);

  const handleNotificationsChange = async (value) => {
    setNotifications(value);
    try {
      // Lưu trạng thái thông báo vào bộ nhớ
      await AsyncStorage.setItem('notifications', value.toString());
    } catch (e) {
      console.error('Error saving notifications setting:', e);
    }
  };

  const handleDarkModeChange = async (value) => {
    setDarkMode(value);
    try {
      // Lưu trạng thái Dark Mode vào bộ nhớ
      await AsyncStorage.setItem('darkMode', value.toString());
    } catch (e) {
      console.error('Error saving dark mode setting:', e);
    }
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (e) {
      console.error('Error logging out:', e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <List.Section>
        <List.Subheader>General</List.Subheader>
        <List.Item
          title="Notifications"
          right={() => <Switch value={notifications} onValueChange={handleNotificationsChange} />}
        />
        <List.Item
          title="Dark Mode"
          right={() => <Switch value={darkMode} onValueChange={handleDarkModeChange} />}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Change Password"
          onPress={handleChangePassword}
        />
        <List.Item
          title="Logout"
          onPress={handleLogout}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Setting;