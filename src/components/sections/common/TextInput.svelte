<script>
  //IMPLEMENTATION
  export let id = undefined;
  export let value = "";
  export let placeholder = "";

  export let attemptedSubmission = false;
  export let validate = false;
</script>

<input
  {id}
  type="text"
  bind:value
  {placeholder}
  on:change
  on:keyup
  class:error={attemptedSubmission && !value && validate}
/>

<style>
  input {
    padding: var(--size-3);
    border-radius: var(--size-2);
    background-color: var(--subtile-color1);
    color: var(--text-primary-color);
    font-size: var(--fs4);
  }

  input.error {
    outline: var(--error-outline);
  }
</style>
