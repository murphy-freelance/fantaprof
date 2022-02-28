<script lang="ts">
  export let content: string = "Login";
</script>

<button class="btn" on:click>
  {content}
</button>

<style>
  .btn {
    background: #ffffff;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    border-radius: 10px;
    border: none;
    width: 100%;
    margin-bottom: 1rem;

    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 1.1rem;
    line-height: 21px;
    text-align: center;
    text-transform: capitalize;

    color: #000000;
  }
</style>
