<script lang="ts">
  import { onMount } from "svelte";

  import { client } from "../store";

  import Default from "../templates/Default.svelte";

  let friendUsername: string = "";

  onMount(async () => {
    await client.getUser();
  });

  async function addFriend() {
    await client.addFriend(friendUsername);
  }
</script>

<Default>
  <div class="container">
    <h2>Hello {$client.user.username}</h2>
    <h3>Your Friends:</h3>
    <ul>
      {#each $client.user.friends as friend}
        <li>{friend.username}</li>
      {/each}
    </ul>
    <h3>Send Friend Request</h3>
    <form class="add--friend" on:submit|preventDefault={addFriend}>
      <input
        type="text"
        class="form__input form__input--small"
        bind:value={friendUsername}
      />
      <button class="btn">add</button>
    </form>
  </div>
</Default>

<style lang="scss" scoped>
  h2 {
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    color: #fff;
    text-transform: capitalize;
  }

  h3 {
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    color: #fff;
    margin-top: 1rem;
    text-transform: capitalize;
  }

  .container {
    padding: 2rem;
  }

  ul {
    color: white;
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    text-transform: capitalize;
    list-style: none;
  }

  .add--friend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

  .btn {
    background: #ffffff;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    padding: 0.3rem;
    border-radius: 10px;
    border: none;
    width: 30%;

    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    text-align: center;
    text-transform: capitalize;

    color: #000000;
  }
</style>
