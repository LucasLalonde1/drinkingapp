import React, { useEffect }from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {useAuth} from "../context/auth-context";
import { useLobbyContext } from "../context/lobby-context"
import useLobby from "../hooks/use-lobby";
import { Stack, useRouter, useLocalSearchParams, useGlobalSearchParams } from 'expo-router'

export default function HostLobbyScreen() {
  const { lobby, setLobby } = useLobbyContext(); // Use the lobby context
  const { handleFetchLobby } = useLobby(); // Assuming you still need the hook for fetching lobby data
  const { userId, displayName } = useAuth();
  const router = useRouter();

  const { lobbyId, game } = useLocalSearchParams(); // Extract lobbyId and game from the params
  const players = lobby?.players ? Object.values(lobby.players).map(player => player.name): [];

  useEffect(() => {
    if (lobbyId) {
      if (typeof lobbyId === 'string') {
        handleFetchLobby(lobbyId);
      } else {
        console.error("Invalid lobbyId:", lobbyId);
      }    }
  }, [lobbyId]);
  
  useEffect(() => {
    console.log("Updated Lobby State: ", lobby); // Log the lobby state after it updates
  }, [lobby]);

  const handleStartGame = () => {
    // Logic for starting the game
    console.log('Game Started!');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.code}>Game Code: {lobbyId}</Text>
      <Text style={styles.username}>Username: {displayName}</Text>
      <Text style={styles.username}>Game = {game}</Text>

      <Text style={styles.userListHeading}>Users in the Game:</Text>
      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.userItem}>{item}</Text>}
      />

      <Button title="Start Game" onPress={handleStartGame} />
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
