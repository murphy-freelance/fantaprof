<script lang="ts">
  import { onMount } from "svelte";
  import { client } from "../store";
  import Button from "../components/Button.svelte";
  import Default from "../templates/Default.svelte";
  import Cookies from "js-cookie";
  import { push } from "svelte-spa-router";

  onMount(async () => {
    await client.getUser();
  });

  function createGame() {
    if (Cookies.get("token")) {
      push("/game/create");
    }
  }

  function joinGame() {
    if (Cookies.get("token")) {
      push("/game/" + gameId);
    }
  }

  let gameId: string = "";
</script>

<Default>
  <div class="main">
    <div class="content">
      <input
        type="text"
        class="form__input"
        placeholder="Game Id"
        style="text-align: center"
        bind:value={gameId}
      />
      <Button content="Partecipa" on:click={joinGame} />
      <Button content="Crea una nuova partita" on:click={createGame} />
    </div>
  </div>
</Default>

<style>
  .main-home {
    height: 90vh;
    width: 100vw;
    margin: 0;
    padding: 0 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 920px) {
    .content {
      display: flex;
      flex-direction: column;
    }
  }
</style>
