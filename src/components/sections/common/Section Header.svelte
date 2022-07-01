<script>
  export let title = undefined;
</script>

<div class="container">
  <h1>{title}</h1>
  <slot><!-- optional fallback --></slot>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-size: var(--fs5);
    font-weight: 600;
  }
</style>
