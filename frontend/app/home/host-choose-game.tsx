import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useLobby from "../hooks/use-lobby";
import { useAuth } from "../context/auth-context";

export default function HostChooseGameScreen() {
  const games = ["Game 1", "Game 2", "Game 3", "Game 4"];
  const router = useRouter();
  const { handleCreateLobby, handleJoinLobby } = useLobby();
  const { userId, displayName } = useAuth();

  const handleGameSelection = async (game: string) => {
    if (!userId) {
      alert("User is not authenticated. Please sign in.");
      return;
    }

    try {
      const createdLobbyId = await handleCreateLobby(userId);

      if (createdLobbyId) {
        await handleJoinLobby(createdLobbyId, userId, displayName || "Guest");

        router.push({
          pathname: "./host-lobby",
          params: { lobbyId: createdLobbyId, game },
        });
      }
    } catch (error) {
      console.error("Error during game selection:", error);
      alert("An error occurred while creating the lobby. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Game</Text>
      {games.map((game, index) => (
        <Button key={index} title={game} onPress={() => handleGameSelection(game)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
