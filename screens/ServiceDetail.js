import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, IconButton, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ServiceDetail = ({ route, navigation }) => {
  const { service } = route.params;
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price.toString());

  const handleUpdate = async () => {
    await firestore().collection('services').doc(service.id).update({
      name,
      price: Number(price),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      "Xóa dịch vụ",
      "Bạn có muốn xóa dịch vụ này không?",
      [
        { text: "Không", style: "cancel" },
        { 
          text: "Đồng ý", 
          onPress: async () => {
            await firestore().collection('services').doc(service.id).delete();
            navigation.goBack();
          }
        }
      ]
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="delete"
          onPress={handleDelete}
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Tên dịch vụ"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Giá"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.detail}>Người tạo: {service.creator || 'Admin'}</Text>
      <Text style={styles.detail}>Thời gian: {service.createdAt ? new Date(service.createdAt.toDate()).toLocaleString() : 'Unknown'}</Text>
      <Text style={styles.detail}>Lần cuối cập nhật: {service.updatedAt ? new Date(service.updatedAt.toDate()).toLocaleString() : 'Not updated'}</Text>
      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Update
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 10,
  },
  detail: {
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'pink',
  },
});

export default ServiceDetail;