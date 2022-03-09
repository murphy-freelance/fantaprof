import { writable } from "svelte/store";
import Cookies from "js-cookie";
import { serverUrl } from "../store";

function createClient() {
  const { subscribe, set, update } = writable({
    user: { username: "", friends: [] },
    requests: [],
  });
  return {
    subscribe,
    async login(
      username: string,
      password: string
    ): Promise<{ error: boolean }> {
      console.log("gino " + serverUrl);
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

      set(data);

      return data;
    },
    async sendFriendRequest(username: string) {
      if (!Cookies.get("token"))
        return { error: "You must first login or register" };

      await fetch(serverUrl + "/friend/send-request", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
        }),
      });
      await client.getUser();
    },
    logout() {
      Cookies.remove("token");
    },
    async setRequest(request: any, accept: boolean) {
      if (!Cookies.get("token"))
        return { error: "You must first login or register" };

      await fetch(serverUrl + "/friend/request/" + request.requestId, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          accept,
        }),
      });
      await client.getUser();
    },
    async removeFriend(username: string) {
      if (!Cookies.get("token"))
        return { error: "You must first login or register" };

      await fetch(serverUrl + "/friend/remove", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
        }),
      });
      await client.getUser();
    },
  };
}

export const client = createClient();
