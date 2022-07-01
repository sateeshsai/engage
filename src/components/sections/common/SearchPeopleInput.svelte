<script>
  //SVELTE IMPORTS
  import { tick } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  //ANIMATION IMPORTS
  import { fly } from "svelte/transition";

  //COMPONENT IMPORTS
  import TextInput from "./TextInput.svelte";
  import Close from "./../../UI components/icons/Close.svelte";
  import IconWrapper from "./../../UI components/icons/IconWrapper.svelte";

  //SHAREPOINT REST API IMPORTS
  import { fetchQuery, siteUrl } from "./../../../stores/API.js";

  //IMPLEMENTATION
  let emailQuery = "";
  let matchedPeople = [];
  function findPeople() {
    if (emailQuery.length > 3)
      fetchQuery(`/_api/web/siteusers?$filter=substringof('${emailQuery}',Email)`).then(
        (data) => (matchedPeople = data.d.results)
      );
  }

  export let selectedPeople = [];
  export let attemptedSubmission;

  function selectPerson(person) {
    let personExists = selectedPeople.find((p) => p.Email === person.Email);
    if (!personExists) selectedPeople = [...selectedPeople, person];
    matchedPeople = [];
    emailQuery = "";
    dispatch("closesearchinput");
  }
</script>

<div class="input-result-wrapper">
  <div class="input-wrapper" in:fly={{ x: -10 }}>
    <TextInput
      id="meeting-participants"
      {attemptedSubmission}
      placeholder="Enter an email id"
      bind:value={emailQuery}
      on:keyup={findPeople}
    />
    <IconWrapper on:click={() => dispatch("closesearchinput")} iconSize="var(--size-8)">
      <Close strokeColor="var(--text-dull-color)" strokeWidth="var(--stroke-width-1)" />
    </IconWrapper>
  </div>

  {#if matchedPeople.length > 0}
    <div class="matched-people-container">
      <div class="matched-people">
        {#each matchedPeople as person}
          {@const personEmailID = person.Email.split("@")[0]}
          <div class="matched-person-wrapper" on:click={() => selectPerson(person)}>
            <div
              class="matched-person-pic"
              style="background-image: url(https://dpn.m.us.deloitte.com/Photos/Index/i_0%C7%B5.t_adfs_{personEmailID}_MThumb)"
            />
            <div class="matched-person-name">
              {person.Title}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .input-result-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: var(--size-2);
  }

  .matched-people-container {
    position: relative;
    z-index: 1;
  }

  .matched-people {
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: var(--size-2);
    background-color: var(--subtile-color1);
    padding: var(--size-1);
  }

  .matched-person-wrapper {
    display: flex;
    align-items: center;
    gap: var(--size-3);
    border-radius: var(--size-2);
    cursor: pointer;
    padding: var(--size-1) var(--size-2);
  }

  .matched-person-wrapper:hover {
    background-color: var(--subtile-color3);
  }

  .matched-person-pic {
    width: var(--size-8);
    aspect-ratio: 1;
    background-size: cover;
    background-position: center;
  }
</style>
