<script lang="ts">
  import Default from "../templates/Default.svelte";
  import Button from "../components/Button.svelte";
  import { client, game } from "../store";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";

  async function createGame() {
    const Game = await game.createGame(teachers, actions, users);
    console.log(Game);
    push(`/game/${Game.game_id}`);
  }

  let state: 0 | 1 | 2 | 3 = 0;

  let teacher = { name: "", value: 0 };
  let teachers = [];
  let action = { name: "", value: 0 };
  let actions = [];
  let users = [];

  onMount(async () => {
    await client.getUser();
  });

  let friends = $client.user.friends.map((el) => {
    return el.username;
  });
</script>

<Default>
  <div class="content">
    {#if state == 0}
      <div class="teachers container">
        <div class="top">
          <div class="teachers_list">
            <h3>Aggiungi professori</h3>
            <hr />
            <ul>
              {#each teachers as teacher}
                <li>
                  {teacher.name}
                  {teacher.value}<button
                    class="icon-btn"
                    on:click={() => {
                      teachers = teachers.filter((el) => {
                        return el != teacher;
                      });
                    }}
                  >
                    <i class="fa-solid fa-circle-xmark" />
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        </div>
        <div class="bottom">
          <hr />
          <form
            on:submit|preventDefault={() => {
              teachers = [...teachers, teacher];
              teacher = { name: "", value: 0 };
            }}
            style="margin-top:1rem;"
          >
            <div class="inputs">
              <input
                type="text"
                bind:value={teacher.name}
                class="form__input form__input--interface"
                placeholder="name"
              />
              <input
                type="number"
                bind:value={teacher.value}
                class="form__input form__input--interface"
                placeholder="value"
              />
              <button class="btn"> add </button>
            </div>
          </form>
          <hr class="mb-1" />
          <Button
            content="Avanti"
            on:click={() => {
              state = 1;
            }}
          />
        </div>
      </div>
    {:else if state == 1}
      <div class="actions container">
        <div class="top">
          <div class="actions_list">
            <h3>Aggiungi Azioni</h3>
            <hr />
            <ul>
              {#each actions as action}
                <li>
                  {action.name}
                  {action.value}
                  <button
                    class="icon-btn"
                    on:click={() => {
                      actions = actions.filter((el) => {
                        return el != action;
                      });
                    }}
                  >
                    <i class="fa-solid fa-circle-xmark" />
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        </div>
        <div class="bottom">
          <hr />
          <form
            on:submit|preventDefault={() => {
              actions = [...actions, action];
              action = { name: "", value: 0 };
            }}
            style="margin-top:1rem;"
          >
            <div class="inputs">
              <input
                type="text"
                bind:value={action.name}
                class="form__input form__input--interface"
                placeholder="name"
              />
              <input
                type="number"
                bind:value={action.value}
                class="form__input form__input--interface"
                placeholder="value"
              />
              <button class="btn"> add </button>
            </div>
          </form>
          <hr class="mb-1" />
          <Button
            content="Avanti"
            on:click={() => {
              state = 2;
            }}
          />
        </div>
      </div>
    {:else if state == 2}
      <div class="users container">
        <div class="top">
          <div class="users_list">
            <h3>Aggiungi Utenti</h3>
            <hr />
            <ul>
              {#each friends as friend}
                <li>
                  {friend}
                  <button
                    class="icon-btn"
                    on:click={() => {
                      users = [...users, friend];
                      friends = friends.filter((el) => {
                        return el != friend;
                      });
                    }}
                  >
                    <i class="fa-solid fa-circle-check" />
                  </button>
                </li>
              {/each}
            </ul>
            <ul>
              <h3>Utenti aggiunti</h3>
              <hr />
              {#each users as user}
                <li>
                  {user}
                  <button
                    class="icon-btn"
                    on:click={() => {
                      users = users.filter((el) => {
                        return el != user;
                      });
                      friends = [...friends, user];
                    }}
                  >
                    <i class="fa-solid fa-circle-xmark" />
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        </div>
        <div class="bottom">
          <hr class="mb-1" />
          <Button
            content="Avanti"
            on:click={() => {
              state = 3;
            }}
          />
        </div>
      </div>
    {:else if state == 3}
      <div class="recap">
        <div class="top">
          <h3>Professori aggiunti</h3>
          <hr />
          <ul>
            {#each teachers as teacher}
              <li>
                {teacher.name}
                {teacher.value}
              </li>
            {/each}
          </ul>
          <h3>Azioni aggiunte</h3>
          <hr />
          <ul>
            {#each actions as action}
              <li>
                {action.name}
                {action.value}
              </li>
            {/each}
          </ul>
          <h3>Utenti aggiunti</h3>
          <hr />
          <ul>
            {#each users as user}
              <li>
                {user}
              </li>
            {/each}
          </ul>
        </div>
        <div class="bottom">
          <hr class="mb-1" />
          <Button content="Inizia Partita" on:click={createGame} />
        </div>
      </div>
    {/if}
  </div>
</Default>

<style lang="scss">
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
