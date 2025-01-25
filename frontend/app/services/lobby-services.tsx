/**
 * Manages API Calls to the BACKEND
 */

import firebase from "../firebaseConfig";

// Create a new lobby and return the unique lobby ID
export const createLobby = async (userId: string | null): Promise<string | null> => {
  if (!userId) {
    throw new Error("User ID cannot be null or null");
  }

  const lobbyRef = firebase.database().ref("lobbies");
  const newLobbyRef = lobbyRef.push(); // Create a new lobby with a unique ID

  // Set the initial data for the lobby
  await newLobbyRef.set({
    userId,
    players: {
      [userId]: { name: "Host", score: 0 }, // Automatically add the host as the first player
    },
  });

  // Return the unique ID of the created lobby
  // Ensure that the key is not null before returning
    if (newLobbyRef.key) {
      return newLobbyRef.key; // This is the unique lobby ID
  } else {
      throw new Error("Failed to create lobby: key is null");
  }
};



export const joinLobby = async (lobbyId: string | null, userId: string | null, displayName: string | null) => {
  const playerRef = firebase.database().ref(`lobbies/${lobbyId}/players/${userId}`);
  await playerRef.set({ name: displayName, score: 0 });
}

// Fetch the data from the lobbys real time state
export const fetchLobby = async (lobbyId: string | null, setLobby: React.Dispatch<React.SetStateAction<any>>
): Promise<() => void> => {
  const LobbyRef = firebase.database().ref(`lobbies/${lobbyId}`);
  LobbyRef.on("value", (snapshot) => {
    setLobby(snapshot.val()); // Update state whenever lobby changes
  });

  return () => LobbyRef.off();
}