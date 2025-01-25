/**
 * Bridge Between lobby-context (frontend) and lobby-services (Bakend)
 * This hook allows the pages to call these functions to join / create / leave lobbies
 */

import { useLobbyContext } from "../context/lobby-context";
import { createLobby, joinLobby, fetchLobby } from "../services/lobby-services";

const useLobby = () => {
  const { lobby, setLobby } = useLobbyContext();

  const handleCreateLobby = async (userId: string | null) => {
    try {
      const lobbyId = await createLobby(userId);
      return lobbyId;
    } catch (error) {
      console.error("Error creating lobby: (use-lobby.tsx)", error);
    }
  };

  const handleJoinLobby = async (lobbyId: string, userId: string, displayName: string): Promise<void> => {
    try {
      await joinLobby(lobbyId, userId, displayName);
    } catch (error) {
      console.error("Error joining the lobby: (use-lobby.tsx)", error);
    }
  };

  const handleFetchLobby = async (lobbyId: string): Promise<() => void> => {
    try {
      const cleanUp = await fetchLobby(lobbyId, setLobby);
      return cleanUp;
    } catch (error) {
      console.error("Error fetching lobby data: (use-lobby.tsx)", error);
      return () => {};
    }
  };

  return { lobby, handleCreateLobby, handleJoinLobby, handleFetchLobby };
};

export default useLobby;
