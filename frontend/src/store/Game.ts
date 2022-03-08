import { writable } from "svelte/store";
import { serverUrl, client } from "../store";
import Cookies from "js-cookie";

interface Teacher {
  name: string;
  value: number;
}

interface Action {
  name: string;
  value: number;
}

interface Game {
  game_id: string;
  startDate: string;
  actions: [{ name: string; value: number }];
  teachers: [{ name: string; value: number }];
  users: [{ user: { username: string }; points: number }];
}

function createGame() {
  const { subscribe, set, update } = writable({
    game_id: "",
    startDate: "",
    actions: [{ name: "", value: 0 }],
    teachers: [{ name: "", value: 0 }],
    users: [{ user: { username: "" }, points: 0 }],
  });

  return {
    subscribe,
    async createGame(
      teachers?: Teacher[],
      actions?: Action[],
      users?: string[]
    ): Promise<any> {
      if (!Cookies.get("token"))
        return { error: "You must first login or register" };

      const response = await fetch(serverUrl + "/game", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          teachers,
          actions,
          users,
        }),
      });
      await client.getUser();
      return await response.json();
    },
    async getGame(gameId: string) {
      const payload = await fetch(`${serverUrl}/game/${gameId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data: Game = await payload.json();
      set(data);
    },
  };
}

export const game = createGame();
