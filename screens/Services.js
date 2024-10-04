import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Services = ({ navigation }) => {
  const { colors } = useTheme();
  const [services, setServices] = useState([]);

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

    return () => subscriber();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ServiceDetail', { service: item })}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price.toLocaleString()} ₫</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>Danh Sách Dịch Vụ</Text> 
      </View>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddNewService')}
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
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'white', // Màu sắc của button Login
  },
});

export default Services;
