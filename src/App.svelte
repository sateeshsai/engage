<script>
  //COMPONENTS
  import Nav from "./Nav.svelte";
  import Home from "./components/sections/Home.svelte";
  import TileModal from "./components/sections/common/TileModal.svelte";
  import MyMeetings from "./components/sections/my meetings/MyMeetings.svelte";
  import Meeting from "./components/sections/meeting/Meeting.svelte";
  import CreateUpdateMeeting from "./components/sections/new meeting/CreateUpdateMeeting.svelte";

  //STORES
  import { activeSection, currentUser } from "./stores/stateStore.js";

  //SHAREPOINT API
  import { ensureUserByEmail, getRequestDigest, fetchQuery } from "./stores/API.js";

  //GET CURRENT USER
  fetchQuery("_api/web/currentuser").then((response) => {
    $currentUser = response.d;
  });
</script>

<!-- FONTS -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>

<!-- ELEMENTS -->
{#if $activeSection !== "home"}
  <Nav />
{/if}
<main>
  {#if $activeSection === "home"}
    <Home />
  {:else if $activeSection === "my meetings"}
    <MyMeetings />
  {:else if $activeSection === "meeting in progress"}
    <Meeting />
  {:else if $activeSection === "new meeting"}
    <CreateUpdateMeeting formMode="create" />
  {:else if $activeSection === "test meeting"}
    <CreateUpdateMeeting formMode="update" meetingID="18" />
  {/if}
</main>

<!-- <div class="colorPalette">
  <div style="background-color: var(--c1)" class="color">c1</div>
  <div style="background-color: var(--c2)" class="color">c1</div>
  <div style="background-color: var(--c3)" class="color">c1</div>
  <div style="background-color: var(--c4)" class="color">c1</div>
  <div style="background-color: var(--c5)" class="color">c1</div>
  <div style="background-color: var(--c6)" class="color">c1</div>
  <div style="background-color: var(--c7)" class="color">c1</div>
  <div style="background-color: var(--c8)" class="color">c1</div>
</div> -->
<style>
  /* GLOBAL STYLESHEET */
  /* RESETS */
  :global(html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video) {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  :global(article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section) {
    display: block;
  }

  :global(body) {
    line-height: 1;
  }

  :global(ol, ul) {
    list-style: none;
  }

  :global(blockquote, q) {
    quotes: none;
  }

  :global(blockquote:before, blockquote:after, q:before, q:after) {
    content: "";
    content: none;
  }

  :global(table) {
    border-collapse: collapse;
    border-spacing: 0;
  }

  :global(input[type="text"], textarea) {
    flex: 1;
    border: none;
  }

  :global(input[type="text"]:focus, textarea:focus) {
    border: none;
    outline: 0.1rem solid var(--accent-color);
  }

  :global(textarea) {
    font-family: inherit;

    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;
  }

  :global(input::placeholder, textarea::placeholder) {
    color: var(--text-dull-color);
    font-size: var(--fs3);
  }

  :global(a) {
    text-decoration: none;
    color: var(--text-primary-color);
  }

  /* HIDE SCROLLBAR */
  :global(html) {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }

  :global(html::-webkit-scrollbar) {
    display: none; /* Safari and Chrome */
  }

  :global(html) {
    /* THEME */
    /* FONT SIZES */

    --fs0: 0.5rem;
    --fs1: 0.75rem;
    --fs2: 1rem;
    --fs3: 1.1rem;
    --fs4: 1.25rem;
    --fs5: 1.5rem;
    --fs6: 2rem;
    --fs7: 2.5rem;
    --fs8: 3rem;
    --fs9: 3.5rem;

    /* SIZES */
    --size-000: -0.5rem;
    --size-00: -0.25rem;
    --size-1: 0.25rem;
    --size-2: 0.5rem;
    --size-3: 0.8rem;
    --size-4: 1.2rem;
    --size-5: 1.25rem;
    --size-6: 1.5rem;
    --size-7: 1.75rem;
    --size-8: 2rem;
    --size-9: 2.5rem;
    --size-95: 3rem;
    --size-10: 4rem;
    --size-11: 5rem;
    --size-12: 7.5rem;
    --size-13: 10rem;
    --size-14: 15rem;
    --size-15: 20rem;
    --size-16: 30rem;

    /* COLORS */
    --bright-green: hsl(122, 100%, 39%);
    --accent-color: hsl(215, 95%, 58%);
    --accent-dull-color: hsl(215, 62%, 35%);
    --accent-light-color: hsl(215, 95%, 70%);
    --hue: 215;
    --nav-color: hsl(var(--hue), 0%, 0%);
    --background-color: hsl(var(--hue), 11%, 7%);
    --tile-color: hsl(var(--hue), 12%, 11%);
    --tile-color1: hsl(var(--hue), 12%, 14%);
    --subtile-color1: hsl(var(--hue), 11%, 17%);
    --subtile-color2: hsl(var(--hue), 12%, 20%);
    --subtile-color3: hsl(var(--hue), 11%, 30%);
    --text-dull-color: hsl(var(--hue), 8%, 50%);
    --icon-stroke-color: hsl(var(--hue), 10%, 56%);
    --c8: hsl(var(--hue), 12%, 60%);
    --text-dull-color: hsl(var(--hue), 10%, 45%);
    --text-secondary-color: hsl(var(--hue), 15%, 70%);
    --text-primary-color: hsl(var(--hue), 10%, 90%);
    --text-bright-color: hsl(var(--hue), 0%, 100%);

    /* UTILITY COLORS */
    --red: hsl(0, 67%, 62%);

    /* STROKE WIDTHS */
    --stroke-width-0: 0.08rem;
    --stroke-width-1: 0.1rem;
    --stroke-width-2: 0.15rem;

    /* SHADOWS */
    --shadow-color: var(var(--nav-color));
    --shadow-strength: 10%;

    /* INNER */
    --inner-shadow-1: inset 0 0 0 1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 9%));

    /* MISC */
    --error-outline: 0.1rem var(--red) solid;

    /* PROPERTIES */
    font-size: clamp(8px, calc(0.4vw + 0.4vh + 0.1vmin), 22px);
    font-family: "Inter", sans-serif;
    font-weight: 300;
    color: var(--text-primary-color);
    background-color: var(--background-color);
  }

  :global(body) {
    font-size: var(--fs2);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    flex: 1;
    position: relative;
  }

  /* .colorPalette {
    display: flex;
  }

  .color {
    padding: 1rem;
  } */

  @media (min-width: 1280px) and (min-height: 720px) and (orientation: landscape) {
    main {
      max-height: 100vh;
    }
  }
</style>
