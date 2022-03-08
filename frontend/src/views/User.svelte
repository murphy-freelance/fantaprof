<script lang="ts">
  import { onMount } from "svelte";
  import { client } from "../store";
  import Default from "../templates/Default.svelte";
  import Button from "../components/Button.svelte";
  import { push } from "svelte-spa-router";

  let friendUsername: string = "";

  onMount(async () => {
    await client.getUser();
  });

  async function addFriend() {
    await client.sendFriendRequest(friendUsername);
    friendUsername = "";
  }

  function logout() {
    client.logout();
    push("/");
  }

  async function acceptRequest(request: any) {
    await client.setRequest(request, true);
  }

  async function refuseRequest(request: any) {
    await client.setRequest(request, false);
  }

  async function removeFriend(username: string) {
    await client.removeFriend(username);
  }
</script>

<Default>
  <div class="container">
    <div class="top">
      <h2>Hello {$client.user.username}</h2>
      <h3>Your Friends:</h3>
      <hr />
      <ul>
        {#each $client.user.friends as friend}
          <li>
            {friend.username}
            <button
              class="icon-btn"
              on:click={() => {
                removeFriend(friend.username);
              }}><i class="fa-solid fa-circle-xmark" /></button
            >
          </li>
        {/each}
      </ul>
      <h3>Incoming</h3>
      <hr />
      <ul>
        {#each $client.requests as request}
          <li>
            <p>{request.sender.username}</p>
            <div class="">
              <button
                class="icon-btn"
                on:click={() => {
                  acceptRequest(request);
                }}><i class="fa-solid fa-circle-check" /></button
              >
              <button
                class="icon-btn"
                on:click={() => {
                  refuseRequest(request);
                }}><i class="fa-solid fa-circle-xmark" /></button
              >
            </div>
          </li>
        {/each}
      </ul>
    </div>
    <div class="bottom">
      <div class="add-friend-container">
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
      <Button content="Logout" on:click={logout} />
    </div>
  </div>
</Default>

<style lang="scss" scoped>
  .add-friend-container {
    margin-bottom: 2rem;
  }

  hr {
    border-top: 1px solid #fff;
  }
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
    font-size: 1.6rem;

    color: #fff;
    margin-top: 1rem;
    text-transform: capitalize;
  }

  .icon-btn {
    border: none;
    background: none;
    color: #fff;
    font-size: 1.4rem;
  }

  .container {
    display: flex;
    height: 90vh;
    flex-direction: column;
    justify-content: space-between;
  }

  ul {
    color: white;
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 1.4rem;
    text-transform: capitalize;
    list-style: circle;

    li {
      margin: 0.3rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
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
