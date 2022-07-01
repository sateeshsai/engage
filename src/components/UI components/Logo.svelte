<script>
  export let fontSize = "--fs5";
  export let letterSpacing = "0";
</script>

<div class="logo" style="--fontSize: var({fontSize}); --letterSpacing: {letterSpacing}em">
  Engage<span>.</span>
</div>

<style>
  .logo {
    font-size: var(--fontSize);
    font-weight: 800;
    color: var(--text-primary-color);
    letter-spacing: var(--letterSpacing);
  }

  span {
    color: var(--bright-green);
  }
</style>
