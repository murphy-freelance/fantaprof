//@index('./views/*', f => `import ${f.name} from '${f.path}.svelte'`)
import CreateGame from "./views/CreateGame.svelte";
import Game from "./views/Game.svelte";
import Home from "./views/Home.svelte";
import Index from "./views/Index.svelte";
import Login from "./views/Login.svelte";
import Register from "./views/Register.svelte";
import User from "./views/User.svelte";
//@endindex

export const routes = {
  "/": Index,
  "/login": Login,
  "/home": Home,
  "/register": Register,
  "/user": User,
  "/game/create": CreateGame,
  "/game/:id": Game,
};
