import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [services, setServices] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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
      });

    const unsubscribeUser = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      subscriber();
      unsubscribeUser();
    };
  }, []);

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
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>Welcome, {currentUser?.displayName || 'Guest'}</Text> 
      </View>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10, // Thêm bo góc cho card
    elevation: 3, // Thêm bóng cho card (Android)
    shadowColor: '#000', // Bóng cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Home;