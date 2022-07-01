<script>
  //ANIMATION IMPORTS
  import { fly } from "svelte/transition";

  export let iconSize = "var(--size-8)";
  export let iconColor = "var(--subtile-color2)";
  export let iconType = "primary";
</script>

<div
  in:fly={{ x: 20 }}
  class="icon-wrapper"
  style="--iconsize: {iconSize}; --iconColor: {iconColor}"
  class:secondary={iconType === "secondary"}
  on:click
>
  <slot />
</div>

<style>
  .icon-wrapper {
    width: var(--iconsize);
    height: var(--iconsize);
    aspect-ratio: 1;
    background-color: var(--iconColor);
    display: grid;
    place-items: center;
    border-radius: var(--size-2);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .secondary {
    background: none;
    border: var(--iconColor) 0.2rem solid;
  }

  .icon-wrapper:hover {
    background-color: var(--subtile-color3);
    transform: scale(1.15);
  }
</style>
