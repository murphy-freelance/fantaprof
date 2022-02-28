<script lang="ts">
  import { client } from "../store";
</script>

<div class="profile__image">
  <img
    src={`https://avatars.dicebear.com/api/croodles-neutral/${$client.user.username}.svg?scale=75`}
    alt=""
  />
</div>

<style lang="scss">
  .profile__image {
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 100rem;
    background-color: #fff;
    margin-right: 1rem;
  }
</style>
