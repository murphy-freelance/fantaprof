<script lang="ts">
  import Main from "../templates/Main.svelte";
  import Button from "../components/Button.svelte";
  import { client } from "../store";
  import { push } from "svelte-spa-router";

  $: username = "";
  $: password = "";
  let showError = false;

  async function login() {
    console.log("login tried");
    let result = await client.login(username, password);

    if (result.error) {
      showError = true;
    } else {
      push("/home");
    }
  }
</script>

<Main>
  <form on:submit|preventDefault>
    <input
      type="text"
      bind:value={username}
      placeholder="username"
      class="form__input"
    />
    <input
      type="text"
      bind:value={password}
      class="form__input last_input"
      placeholder="password"
    />
    {#if showError}
      <p class="error">wrong username or password</p>
    {/if}
    <Button on:click={login} content="login" />
  </form>
</Main>
