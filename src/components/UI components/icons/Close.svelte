<script>
  import { draw } from "svelte/transition";
  export let strokeColor = "var(--text-dull-color)";
  export let strokeWidth = "var(--stroke-width-1)";
</script>

<svg
  id="Layer_2"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 25 25"
  style="--strokeColor: {strokeColor}; --strokeWidth: {strokeWidth}"
>
  ><defs
    ><style>
      .close {
        fill: none;
        stroke: var(--strokeColor);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: var(--strokeWidth);
      }
    </style></defs
  ><g id="Layer_1-2"
    ><rect width="25" height="25" rx="5" ry="5" fill="none" /><path
      in:draw
      class="close"
      d="m7.55 7.55 9.9 9.9M7.55 17.45l9.9-9.9"
    /></g
  ></svg
>
