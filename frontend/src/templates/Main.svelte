<script lang="ts">
  import Heading from "../components/Heading.svelte";
</script>

<div class="main">
  <div class="content">
    <Heading />
    <slot />
  </div>
</div>

<style>
  .main {
    height: 100vh;
    width: 100vw;
    margin: 0;
    background: linear-gradient(272.06deg, #7a0bc0 0%, #270082 100%);
    padding: 0 4rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    text-align: center;
  }
</style>
