<script>
  import { draw } from "svelte/transition";
  export let strokeColor = "var(--text-dull-color)";
  export let strokeWidth = "var(--stroke-width-1)";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  style="--strokeColor: {strokeColor}; --strokeWidth: {strokeWidth}"
  viewBox="0 0 25 25"
  ><defs
    ><style>
      .add {
        fill: none;
        stroke: var(--strokeColor);
        stroke-width: var(--strokeWidth);
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    </style></defs
  ><g
    ><path fill="none" d="M0 0h25v25H0z" />
    <path in:draw class="add" d="M5.5 12.52h14M12.5 19.52v-14" /></g
  ></svg
>
