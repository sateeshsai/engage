<script>
  //TRANSITIONS
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div class="tile" in:scale={{ start: 0.5, duration: 500 }}>
  <slot><!-- optional fallback --></slot>
</div>

<style>
  .tile {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: var(--size-8);
    background-color: var(--tile-color);
    border-radius: var(--size-3);
    gap: var(--size-6);
  }
</style>
