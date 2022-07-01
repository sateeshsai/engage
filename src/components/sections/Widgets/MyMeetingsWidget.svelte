<script>
  import TileHeader from "../common/TileHeader.svelte";
  import Tile from "../common/Tile.svelte";

  //ICONS
  import IconWrapper from "../../UI components/icons/IconWrapper.svelte";
  import Close from "../../UI components/icons/Close.svelte";
</script>

<Tile>
  <TileHeader title="My recent meetings" />
  <div class="container" />
</Tile>

<style>
  .container {
    display: flex;
    flex-direction: column;
    /* flex: 1; */
    height: 20rem;
  }
</style>
