<script>
  //SVELTE IMPORTS
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  //COMPONENT IMPORTS
  import IconWrapper from "../../UI components/icons/IconWrapper.svelte";
  import Close from "../../UI components/icons/Close.svelte";

  //HELPERS
  import { checkImage } from "../../../utilities/helpers.js";

  //ANIMATION
  import { fly } from "svelte/transition";

  //PROPS
  export let person = {};
  export let editable = false;
  export let picHeight = "var(--size-9)";
  export let dpn = false;

  $: targetWindow = dpn === true ? "blank" : "self";

  //IMPLEMENTATION
  let personEmailFull = person.Email || person.EMail;
  let personEmailID = personEmailFull.split("@")[0];
  let personInitials = undefined;

  let imageURL = `https://dpn.m.us.deloitte.com/Photos/Index/i_0%C7%B5.t_adfs_${personEmailID}_MThumb`;
  checkImage(imageURL).then((response) => {
    if (response === false) {
      if (person.Title.includes("@")) {
        personInitials = person.Title.slice(0, 2);
      } else {
        let firstName = person.Title.split(", ")[1];
        let lastName = person.Title.split(", ")[0];
        personInitials = firstName.slice(0, 1) + lastName.slice(0, 1);
      }
    }
  });

  //UI FLAGS
  let showName = false;
</script>

<div class="person-wrapper" in:fly={{ y: -10 }}>
  <div
    on:click={() => (showName = !showName)}
    class="person-pic"
    style="background-image: url({imageURL}); --pic-height: {picHeight}"
  >
    {#if personInitials !== undefined}
      {personInitials.toUpperCase()}
    {/if}
  </div>

  {#if editable === true}
    <div class="delete">
      <IconWrapper on:click={() => dispatch("deleteperson", person)} iconSize="var(--size-4)" iconColor="var(--red)">
        <Close strokeColor="var(--text-primary-color)" strokeWidth="var(--stroke-width-1)" />
      </IconWrapper>
    </div>
  {/if}

  {#if showName === true}
    <a href="https://people.deloitte/profile/{personEmailID}" target={"_blank"}>
      <div class="person-name" transition:fly={{ y: -10 }}>
        {person.Title}
      </div>
    </a>
  {/if}
</div>

<style>
  .person-wrapper {
    display: flex;
    gap: var(--size-3);
    position: relative;
  }

  .person-pic {
    height: var(--pic-height);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border-radius: var(--size-1);
    background-size: 120%;
    background-position: center;
    background-color: var(--subtile-color3);
    outline: var(--subtile-color3) 0.1rem solid;
    color: var(--text-primary-color);
  }

  .person-name {
    position: absolute;
    top: calc(var(--size-10) * 0.9);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--subtile-color3);
    padding: var(--size-2);
    border-radius: var(--size-2);
    line-height: 1.4em;
  }

  .person-name::before {
    content: "";
    position: absolute;
    bottom: 95%;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    width: 0;
    height: 0;
    border-left: var(--size-3) solid transparent;
    border-right: var(--size-3) solid transparent;
    border-top: var(--size-3) solid var(--subtile-color3);
  }

  .delete {
    display: grid;
    place-items: center;
    border-radius: 10rem;
    width: var(--size-4);
    height: var(--size-4);
    left: 80%;
    top: -15%;
    background-color: var(--nav-color);
    position: absolute;
  }
</style>
