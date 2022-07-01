<script>
  import SveltyPicker from "svelty-picker";

  export let value = undefined;
  export let attemptedSubmission = false;
  export let placeholder = "";
  let options = {};
</script>

<div class="date-input-container" class:error={attemptedSubmission && !value}>
  <SveltyPicker
    inputClasses="form-control"
    theme={"sdt-calendar-colors"}
    {placeholder}
    format="yyyy-mm-dd hh:ii"
    bind:value
  />
</div>

<style>
  :global(.sdt-calendar-colors) {
    --sdt-primary: #286090;
    --sdt-color: #000;
    --sdt-bg-main: var(--subtile-color2);
    --sdt-bg-today: var(--sdt-primary);
    --sdt-bg-clear: #dc3545;
    --sdt-today-bg: #1e486d;
    --sdt-clear-color: #dc3545;
    --sdt-btn-bg-hover: #eee;
    --sdt-btn-header-bg-hover: #dfdfdf;
    --sdt-clock-bg: #eeeded;
    --sdt-clock-bg-minute: rgb(238, 237, 237, 0.25);
    --sdt-clock-bg-shadow: 0 0 128px 2px #ddd inset;
    --sdt-shadow: #ccc;
  }

  :global(.form-control) {
    padding: var(--size-3);
    color: var(--text-primary-color);
    font-size: var(--fs4);
    background-color: var(--subtile-color1);
    border-radius: var(--size-2);
  }

  :global(.form-control:focus) {
    border: none;
    outline: 0.1rem solid var(--accent-color);
  }

  :global(.error .form-control) {
    outline: var(--error-outline);
  }

  .date-input-container {
    display: flex;
  }
</style>
