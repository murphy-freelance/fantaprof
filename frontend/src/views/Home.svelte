<script lang="ts">
  import { onMount } from "svelte";
  import { client } from "../store";
  import Button from "../components/Button.svelte";
  import Default from "../templates/Default.svelte";

  onMount(async () => {
    await client.getUser();
  });

  function createGame() {
    console.log("newgame");
  }

  function joinGame() {
    console.log("joining");
  }
</script>

<Default>
  <Button content="Crea una nuova partita" on:click={createGame} />
  <Button content="Partecipa a una partita" on:click={joinGame} />
</Default>
