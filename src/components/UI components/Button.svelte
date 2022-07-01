<script>
  export let text = undefined;
  export let primary = true;
  export let large = false;
  export let alignSelf = "center";
</script>

<button class:primary class:large style="--align-self: {alignSelf}" on:click|preventDefault>
  {text}
</button>

<style>
  button {
    font-size: var(--fs3);
    padding: var(--size-3) var(--size-4);
    width: fit-content;
    border: none;
    border-radius: var(--size-2);
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    color: var(--text-secondary-color);
    background-color: var(--subtile-color3);
    cursor: pointer;
    align-self: var(--align-self);
  }

  button:hover {
    transform: scale(1.05);
  }

  .primary {
    background-color: var(--accent-color);
    color: var(--text-bright-color);
  }

  .large {
    padding: var(--size-3) var(--size-5);
    font-size: var(--fs4);
  }
</style>
