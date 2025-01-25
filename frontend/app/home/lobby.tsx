import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

export default function LobbyScreen() {
  // Sample data for the lobby
  const code = 'ABC123';
  const username = 'Player1';
  const users = ['Player1', 'Player2', 'Player3', 'Player4'];

  return (
    <View style={styles.container}>
      <Text style={styles.code}>Game Code: {code}</Text>
      <Text style={styles.username}>Username: {username}</Text>

      <Text style={styles.userListHeading}>Users in the Game:</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.userItem}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  code: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    marginBottom: 20,
  },
  userListHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});
