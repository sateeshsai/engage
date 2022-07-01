<script>
  //COMPONENTS
  import SectionHeader from "../common/Section Header.svelte";
  import TileHeader from "../common/TileHeader.svelte";
  import MeetingSummary from "./MeetingSummary.svelte";

  // STORES
  import { myMeetings } from "../../../stores/meetings.js";

  $myMeetings = [
    {
      id: "M1234",
      title: "Project Morpheus",
    },
    {
      id: "M1235",
      title: "Project Anderson",
    },
  ];
</script>

<div class="container">
  <SectionHeader title="My meetings" />
  <div class="container-meetings">
    {#each $myMeetings as meeting (meeting.id)}
      <MeetingSummary {meeting} />
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: var(--size-9);
  }
</style>
