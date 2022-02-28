import { writable } from "svelte/store";
import Cookies from "js-cookie";

const serverUrl = "http://127.0.0.1:5000";

function createClient() {
  const { subscribe, set, update } = writable({
    user: { username: "", friends: [] },
  });

  return {
    subscribe,
    async login(
      username: string,
      password: string
    ): Promise<{ error: boolean }> {
      console.log(
        JSON.stringify({
          username: username,
          password: password,
        })
      );
      const query = await fetch(serverUrl + "/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await query.json();
      if (!data.error) {
        Cookies.set("token", data.token);
        return { error: false };
      } else {
        return { error: true };
      }
    },
    async register(
      username: string,
      password: string
    ): Promise<{ error: boolean }> {
      console.log(
        JSON.stringify({
          username: username,
          password: password,
        })
      );
      const query = await fetch(serverUrl + "/user/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await query.json();
      if (!data.error) {
        Cookies.set("token", data.token);
        return { error: false };
      } else {
        return { error: true };
      }
    },
    async getUser() {
      if (!Cookies.get("token"))
        return { error: "You must first login or register" };

      const payload = await fetch(serverUrl + "/user", {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      });
      const data = await payload.json();

      if (data.error) return data.errorMessage;

      set({ user: data });

      return data;
    },
    async addFriend(username: string) {
      if (!Cookies.get("token"))
        return { error: "You must first login or register" };

      await fetch(serverUrl + "/user/add-friend", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          friendUsername: username,
        }),
      });
      await client.getUser();
    },
  };
}

export const client = createClient();
