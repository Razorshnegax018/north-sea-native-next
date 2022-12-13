// @generated: @expo/next-adapter@2.1.52
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Main } from './src/types/imports'


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Expo + Next.js niig Boobies 👋</Text>
      <Button onPress={() => {alert("Niggg")}}>Biiiigg bluggies</Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
}); 
