<script>
  export let title = undefined;
</script>

<div class="container">
  <h2>{title}</h2>
  <slot><!-- optional fallback --></slot>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    font-size: var(--fs4);
    font-weight: 600;
    color: var(--text-secondary-color);
  }

  h2 {
    font-size: var(--fs4);
  }
</style>
