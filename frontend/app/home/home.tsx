import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback, Touchable } from 'react-native';
import { useRouter, Link } from 'expo-router';
import {useAuth} from "../context/auth-context";

export default function HomeScreen() {
  const [code, setCode] = useState<string>('');
  const router = useRouter();
  const { userId, displayName } = useAuth(); // Access the global userId

  const handleSubmitCode = () => {

    console.log('Entered Code:', code);
    router.push('./lobby');

  };

  const navigateHostChooseGame = () => {

    router.push('./host-choose-game');

  }

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>

      <Text>Hello {userId}</Text>

      <Button title="Host A Game" onPress={navigateHostChooseGame} />
      <Text style={styles.heading}>Enter Code</Text>
      
      <TextInput
        style={styles.textarea}
        multiline
        numberOfLines={4}
        placeholder="Enter your code here"
        value={code}
        onChangeText={setCode}
      />

      <Button title="Submit Code" onPress={handleSubmitCode} />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textarea: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});
