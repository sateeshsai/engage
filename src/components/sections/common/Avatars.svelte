<script>
  //COMPONENTS
  import Avatar from "./Avatar.svelte";

  //IMPLEMENTATION
  export let people = [];
  export let direction = "row";
  export let editable = false;
  export let gap = "var(--size-6)";
</script>

<div class="avatars-container" style="flex-direction: {direction}; --gap:{gap}">
  {#each people as person (person.Id)}
    <Avatar {person} {editable} on:deleteperson />
  {/each}
</div>

<style>
  .avatars-container {
    display: flex;
    gap: var(--gap);
    flex-wrap: wrap;
  }
</style>
