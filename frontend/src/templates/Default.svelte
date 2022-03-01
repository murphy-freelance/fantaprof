<script lang="ts">
  import ProfileImage from "../components/ProfileImage.svelte";
  import { link } from "svelte-spa-router";
</script>

<div class="main">
  <div class="navbar">
    <a href="/user" use:link>
      <ProfileImage />
    </a>
    <h1 class="heading">Fantaprof</h1>
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  .main {
    height: 100vh;
    width: 100vw;
    margin: 0;
    background: linear-gradient(272.06deg, #7a0bc0 0%, #270082 100%);
  }

  .heading {
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    text-transform: uppercase;
    text-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    color: #fff;
  }

  .navbar {
    display: flex;
    padding: 0.5rem 2rem;
    height: 5vh;
  }
</style>
