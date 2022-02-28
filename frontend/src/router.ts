import Index from "./views/Index.svelte";
import Login from "./views/Login.svelte";
import Home from "./views/Home.svelte";
import Register from "./views/Register.svelte";
import User from "./views/User.svelte";

export const routes = {
  "/": Index,
  "/login": Login,
  "/home": Home,
  "/register": Register,
  "/user": User,
};
