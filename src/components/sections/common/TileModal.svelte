<script>
  //ANIMATION
  import { slide } from "svelte/transition";
</script>

<div transition:slide class="tile">
  <slot><!-- optional fallback --></slot>
</div>

<style>
  .tile {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: var(--size-9);
    border-radius: var(--size-3);
    background-color: var(--tile-color);
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
  }
</style>
