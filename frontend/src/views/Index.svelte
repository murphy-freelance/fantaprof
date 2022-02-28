<script lang="ts">
  import Button from "../components/Button.svelte";
  import { push } from "svelte-spa-router";
  import Main from "../templates/Main.svelte";
  import Cookies from "js-cookie";

  function redirectLogin() {
    if (Cookies.get("token")) {
      push("/home");
    } else {
      push("/login");
    }
  }

  function redirectRegister() {
    if (Cookies.get("token")) {
      push("/home");
    } else {
      push("/register");
    }
  }
</script>

<Main>
  <Button content="Login" on:click={redirectLogin} />
  <Button content="Register" on:click={redirectRegister} />
</Main>
