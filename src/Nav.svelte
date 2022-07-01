<script>
  //SVELTE IMPORTS
  import { fly } from "svelte/transition";
  //COMPONENTS
  import Logo from "./components/UI components/Logo.svelte";
  import { activeSection } from "./stores/stateStore";
</script>

<header in:fly={{ y: -10 }}>
  <div class="nav-left">
    <Logo />
  </div>
  <div class="nav-right">
    <nav>
      <ul>
        <li class:active={$activeSection === "home"} on:click={() => ($activeSection = "home")}>Home</li>
        <li class:active={$activeSection === "my meetings"} on:click={() => ($activeSection = "my meetings")}>
          My meetings
        </li>
        <li
          class:active={$activeSection === "meeting in progress"}
          on:click={() => ($activeSection = "meeting in progress")}
        >
          Meeting-in-progress
        </li>
      </ul>
      <div class="current-user-avatar">.</div>
    </nav>
  </div>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--nav-color);
    padding-left: var(--size-9);
    padding-right: var(--size-9);
  }

  nav {
    display: flex;
    align-items: center;
    gap: var(--size-5);
    color: var(--text-dull-color);
  }

  ul {
    display: flex;
    font-weight: 400;
    /* font-size: var(--fs2); */
    gap: var(--size-6);
    flex: 1;
  }

  li {
    padding: var(--size-2) 0;
    cursor: pointer;
    border-bottom: var(--nav-color) solid var(--size-1);
    transition: all 0.2s ease-in-out;
  }

  li:hover {
    color: var(--accent-color);
    font-weight: 600;
    /* border-bottom: var(--accent-color) solid var(--size-1); */
    cursor: pointer;
  }

  .current-user-avatar {
    display: flex;
    align-items: center;
    height: var(--size-5);
    aspect-ratio: 1;
    border-radius: var(--size-1);
    background-color: cadetblue;
  }

  @media (min-width: 1280px) and (orientation: landscape) {
    header {
      height: 5vh;
    }
  }
</style>
