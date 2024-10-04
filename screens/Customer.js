import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, FAB } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Customer = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('services')
      .onSnapshot(querySnapshot => {
        const services = [];
        querySnapshot.forEach(documentSnapshot => {
          services.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setServices(services);
        setFilteredServices(services);
      });

    return () => subscriber();
  }, []);

  const onChangeSearch = query => {
    setSearchQuery(query);
    const filtered = services.filter(service => 
      service.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>Price: {item.price.toLocaleString()} ₫</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('OrderService', { service: item })}>Order Now</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search services"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredServices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="history"
        onPress={() => navigation.navigate('OrderHistory')}
        label="Order History"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 10,
  },
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Customer;