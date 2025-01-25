  import React, { useState } from 'react';
  import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
  import firebase from '../firebaseConfig'; // Import the Firebase config
  import { FirebaseError } from 'firebase/app'; // Import FirebaseError
  import {useRouter} from "expo-router";
  import {useAuth} from "../context/auth-context";

  export default function AuthScreen() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const {userId, setUserId} = useAuth();
    const {displayName, setDisplayName} = useAuth();

    // Handle sign-in with email and password
    const handleSignIn = async () => {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const userId = userCredential.user?.uid || null;
        const displayName = userCredential.user?.displayName || null;
  
        setUserId(userId); // This can be null or a string
        setDisplayName(displayName); // This can be null or a string
        Alert.alert('Success', 'Logged in successfully');
        // Navigate to home screen or other logic here

        router.push("../home/home");
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          Alert.alert('Error', error.message); // Now TypeScript knows error is a FirebaseError
        } else {
          Alert.alert('Error', 'An unexpected error occurred.');
        }
      }
    };

    // Handle sign-up with email and password
    const navigateSignup = async () => {

      router.push("./signup");
    
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Firebase Authentication</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button title="Sign In" onPress={handleSignIn} />
          <Button title="Sign Up" onPress={navigateSignup} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingLeft: 10,
    },
  });
