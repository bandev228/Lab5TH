import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const OrderService = ({ route, navigation }) => {
  const { service } = route.params;
  const [quantity, setQuantity] = useState('1');

  const handleOrder = async () => {
    const totalAmount = service.price * parseInt(quantity);
    
    // In a real app, you'd integrate with a payment gateway here
    Alert.alert(
      "Confirm Order",
      `Total amount: ${totalAmount.toLocaleString()} ₫\nProceed with payment?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Pay", 
          onPress: async () => {
            // Create a new transaction in Firestore
            await firestore().collection('transactions').add({
              serviceName: service.name,
              serviceId: service.id,
              quantity: parseInt(quantity),
              amount: totalAmount,
              customerName: "Current User", // You'd get this from user context
              createdAt: firestore.FieldValue.serverTimestamp(),
            });
            
            navigation.navigate('Home');
            Alert.alert("Success", "Your order has been placed successfully!");
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.price}>Price: {service.price.toLocaleString()} ₫</Text>
      <TextInput
        label="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.total}>Total: {(service.price * parseInt(quantity)).toLocaleString()} ₫</Text>
      <Button mode="contained" onPress={handleOrder} style={styles.button}>
        Place Order
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'pink',
  },
});

export default OrderService;