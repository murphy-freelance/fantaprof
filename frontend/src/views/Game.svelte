<script lang="ts">
  import { onMount } from "svelte";
  import Default from "../templates/Default.svelte";
  import { game } from "../store";

  export let params: { id?: string } = {};

  onMount(async () => {
    await game.getGame(params.id);
    console.log($game);
  });
</script>

<Default>
  <div class="container">
    <div class="top">
      <h3>Professori</h3>
      <hr />
      <ul>
        {#each $game.teachers as teacher}
          <li>{teacher.name} {teacher.value}</li>
        {/each}
      </ul>
    </div>
  </div>
</Default>

<style lang="scss" scoped>
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
    padding-left: 0;

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
    padding: 0.2rem;
    border-radius: 10px;
    border: none;
    width: 30%;

    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    text-align: center;
    text-transform: capitalize;
    font-size: 1.1rem;

    color: #000000;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    align-items: center;

    * {
      width: 90%;
      margin: 0.2rem 0;
    }

    .btn {
      margin-top: 0.3rem;
    }
  }
</style>
