<script>
  //COMPONENT IMPORTS
  import Logo from "../UI components/Logo.svelte";
  import Button from "../UI components/Button.svelte";
  import MyMeetingsWidget from "./Widgets/MyMeetingsWidget.svelte";
  import HomeIllustration from "./../UI components/HomeIllustration.svelte";

  //STORES
  import { activeSection, previousSection } from "../../stores/stateStore.js";

  //TRANSITIONS
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  $previousSection = String($activeSection);
</script>

<div class="container" in:fly={{ y: 30, duration: 500, easing: quintOut }}>
  <div class="home-left">
    <div class="intro-wrapper">
      <div class="logo" in:fly={{ y: 30, duration: 500, easing: quintOut }}>
        <Logo fontSize="--size-11" letterSpacing="-0.03" />
      </div>
      <div class="intro">Effective meetings, and beyond.</div>
    </div>
    <!-- <Button
      primary={true}
      large={true}
      alignSelf="flex-start"
      text="Test meeting"
      on:click={() => ($activeSection = "test meeting")}
    /> -->
    <Button
      primary={true}
      large={true}
      alignSelf="flex-start"
      text="New meeting"
      on:click={() => ($activeSection = "new meeting")}
    />
    <MyMeetingsWidget />
  </div>
  <div class="home-right">
    <div class="home-illustration">
      <HomeIllustration />
    </div>
  </div>
</div>

<style>
  .container {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  .home-illustration {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .home-left {
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: var(--size-10);
    padding-left: var(--size-13);
  }

  .intro-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--size-9);
    color: var(--text-secondary-color);
  }

  .intro {
    font-size: var(--fs6);
  }

  .home-right {
    align-self: flex-end;
    padding-right: var(--size-8);
  }
</style>
