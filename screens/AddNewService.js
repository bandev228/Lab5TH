import React, { useState } from 'react';
import { View, StyleSheet, Text  } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const AddNewService = ({ navigation }) => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    if (name && price) {
      await firestore().collection('services').add({
        name,
        price: Number(price),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>Add New Service</Text> */}
      {/* </View> */}
      <View style={styles.content}>
        <TextInput
          label="Tên dịch vụ"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Giá"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleAdd}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          Thêm
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  // headerTitle: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
});

export default AddNewService;