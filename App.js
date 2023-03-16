import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [originalList, setOriginalList] = useState([]);
  const [list, setList] = useState([]);
  const [name, setName] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const json = await response.json();
      setOriginalList(json.products)
      setList(json.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setList(originalList.filter(data => data.title.startsWith(name)))
  }, [name]);

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.text}>LIST OF ITEMS </Text>

      <View style={styles.icon_design}>
        <TextInput style={styles.input}
          selectionColor={'#006400'}
          onChangeText={(value) => setName(value)}
          keyboardType="default" />
        <Icon name="search" size={30} style={styles.icon} color="#006400" />
      </View>

      <View style={styles.list_height}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#008080" />
        ) : (
          <FlatList
            data={list}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View style={styles.list_body}>
                <Text style={styles.list_text_title}>
                  {item.title}
                </Text>
                <Text style={styles.list_text_desc}>
                  {item.description}
                </Text>
                <Text style={styles.list_text_price}>
                  <Text style={{ color: "#8b0000" }}>
                    Price : </Text> {item.price}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#8fbc8f",
    padding: 30,
    borderRadius: 10,
  },
  text: {
    fontSize: 36,
    color: "black",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderWidth: 3,
    width: 300,
    marginTop: 20,
    marginBottom: 20,
    color: "black",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 40,
  },
  list_body: {
    marginBottom: 30,
    backgroundColor: "#008080",
    borderRadius: 10,
    padding: 15,
  },
  list_text_title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#800000",
    textAlign: "center",
    fontStyle: "italic",
    paddingBottom: 15,
  },
  list_text_desc: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    paddingBottom: 5,
  },
  list_text_price: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    textAlign: "center"
  },
  icon_design: {
    justifyContent: "center"
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  list_height: {
    height: 650,
  }
})

export default App;