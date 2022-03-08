<script lang="ts">
  import { link } from "svelte-spa-router";

  export let size: number = 3;
</script>

<a href="/" use:link>
  <h1 style="--size:{size + 'rem'}">Fantaprof</h1>
</a>

<style lang="scss">
  h1 {
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    font-size: var(--size);
    line-height: 57px;
    text-align: center;
    text-transform: uppercase;

    color: #ffffff;

    text-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);

    margin-bottom: 2rem;
  }
</style>
