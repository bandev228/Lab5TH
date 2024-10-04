import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('transactions')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const transactions = [];
        querySnapshot.forEach(documentSnapshot => {
          transactions.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setTransactions(transactions);
      });

    return () => subscriber();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.serviceName}</Title>
        <Paragraph>Amount: {item.amount.toLocaleString()} ₫</Paragraph>
        <Paragraph>Customer: {item.customerName}</Paragraph>
        <Paragraph>Date: {new Date(item.createdAt.toDate()).toLocaleString()}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 10,
  },
});

export default Transaction;