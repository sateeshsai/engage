<script>
  import TextInput from "../common/TextInput.svelte";
  import DateTimeInput from "../common/DateTimeInput.svelte";
  import TextArea from "../common/TextArea.svelte";
  import SearchPeopleInput from "./../common/SearchPeopleInput.svelte";
  import Avatars from "../common/Avatars.svelte";
  import Button from "../../UI components/Button.svelte";
  import FormFieldErrorMessage from "./FormFieldErrorMessage.svelte";

  //ICONS
  import IconWrapper from "../../UI components/icons/IconWrapper.svelte";
  import Close from "../../UI components/icons/Close.svelte";
  import Add from "../../UI components/icons/Add.svelte";

  //SVELTE IMPORTS
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  //IMPLEMENTATION
  export let formMode = undefined;
  export let meetingFormData = {};

  //FORM SUBMISSION ATTEMPT FLAG
  let attemptedSubmission = false;

  //FORM VALIDATION FUNCTION
  function validateForm() {
    attemptedSubmission = true;
    let meetingFormDataErrors = {};
    if (meetingFormData.meetingName == true) meetingFormDataErrors.meetingName = false;
    if (meetingFormData.description == false) meetingFormDataErrors.meetingDescription = false;
    if (meetingFormData.dates == false) meetingFormDataErrors.meetingDateTime = false;
    if (meetingFormData.facilitators.length === 0) meetingFormDataErrors.facilitators = false;
    if (meetingFormData.participants.length === 0) meetingFormDataErrors.participants = false;

    let formValidated = Object.values(meetingFormDataErrors).reduce((acc, curr) => {
      return acc && curr;
    }, true); //returns true if all fields are valid

    console.log(meetingFormData);
    console.log(formValidated, meetingFormDataErrors);

    return formValidated;
  }

  function createNewMeeting() {
    //FORM VALIDATION
    let formValidated = validateForm();
    //IF VALIDATION SUCCEEDS
    if (formValidated) {
      dispatch("createnewmeeting", meetingFormData);
    }
  }

  function updateMeeting() {
    let formValidated = validateForm();
    if (formValidated) {
      dispatch("updatemeeting", meetingFormData);
    }
  }

  function cancelNewMeeting() {
    dispatch("cancel");
  }

  function dispathDeleteFacilitator(e) {
    dispatch("deletefacilitator", e.detail);
  }

  function dispathDeleteParticipant(e) {
    dispatch("deleteparticipant", e.detail);
  }

  let showFacilitatorSearchbox = false;
  let showParticipantSearchbox = false;

  $: console.log({ showFacilitatorSearchbox });
  $: console.log({ showParticipantSearchbox });
</script>

<form class="form-content">
  <fieldset class="form-content">
    <fieldset class="field-wrapper">
      <label for="meeting-name">Meeting name</label>
      <TextInput
        id="meeting-name"
        bind:value={meetingFormData.meetingName}
        {attemptedSubmission}
        validate={true}
        placeholder="Enter a descriptive name"
      />
      <!-- {#if attemptedSubmission && !meetingFormData.meetingName}
        <FormFieldErrorMessage />
      {/if} -->
    </fieldset>
    <fieldset class="field-wrapper">
      <label for="meeting-description">Meeting description</label>
      <TextArea
        id="meeting-name"
        bind:value={meetingFormData.description}
        {attemptedSubmission}
        placeholder="Enter a descriptive name"
      />
      <!-- {#if attemptedSubmission && !meetingFormData.description}
        <FormFieldErrorMessage />
      {/if} -->
    </fieldset>
    <fieldset class="field-wrapper">
      <label for="meeting-date">Meeting date and time</label>
      <DateTimeInput
        {attemptedSubmission}
        bind:value={meetingFormData.dates}
        placeholder="Enter meeting date and time"
      />
      <!-- {#if attemptedSubmission && !meetingFormData.dates}
        <FormFieldErrorMessage />
      {/if} -->
    </fieldset>

    <fieldset class="field-wrapper">
      <label for="meeting-facilitators">Facilitators</label>
      {#if meetingFormData.facilitators.length > 0}
        <Avatars
          people={meetingFormData.facilitators}
          direction="row"
          on:deleteperson={dispathDeleteFacilitator}
          editable={true}
        />
      {/if}

      {#if showFacilitatorSearchbox === false}
        <IconWrapper
          on:click={() => (showFacilitatorSearchbox = true)}
          iconSize="var(--size-8)"
          iconColor="var(--subtile-color3)"
          iconType="secondary"
        >
          <Add strokeColor="var(--text-secondary-color)" strokeWidth="var(--stroke-width-0)" />
        </IconWrapper>
      {:else if showFacilitatorSearchbox === true}
        <SearchPeopleInput
          {attemptedSubmission}
          bind:selectedPeople={meetingFormData.facilitators}
          on:closesearchinput={() => (showFacilitatorSearchbox = false)}
        />
        <!-- {#if attemptedSubmission && !meetingFormData.facilitators.length}
        <FormFieldErrorMessage />
      {/if} -->
      {/if}
    </fieldset>

    <fieldset class="field-wrapper">
      <label for="meeting-participants">Participants</label>

      {#if meetingFormData.participants.length > 0}
        <Avatars
          people={meetingFormData.participants}
          direction="row"
          on:deleteperson={dispathDeleteParticipant}
          editable={true}
        />
      {/if}

      {#if showParticipantSearchbox === false}
        <IconWrapper
          on:click={() => (showParticipantSearchbox = true)}
          iconSize="var(--size-8)"
          iconColor="var(--subtile-color3)"
          iconType="secondary"
        >
          <Add strokeColor="var(--text-secondary-color)" strokeWidth="var(--stroke-width-0)" />
        </IconWrapper>
      {:else if showParticipantSearchbox === true}
        <SearchPeopleInput
          {attemptedSubmission}
          bind:selectedPeople={meetingFormData.participants}
          on:closesearchinput={() => (showParticipantSearchbox = false)}
        />
        <!-- {#if attemptedSubmission && !meetingFormData.participants.length}
        <FormFieldErrorMessage />
      {/if} -->
      {/if}
    </fieldset>
  </fieldset>
</form>
<div class="action-buttons">
  {#if formMode === "create"}
    <Button text="Create meeting" alignSelf={"center"} on:click={createNewMeeting} />
  {:else}
    <Button text="Update meeting" alignSelf={"center"} on:click={updateMeeting} />
  {/if}
  <Button text="Cancel" primary={false} alignSelf={"center"} on:click={cancelNewMeeting} />
</div>

<style>
  .form-content {
    display: flex;
    flex-direction: column;
    gap: var(--size-9);
  }

  label {
    color: var(--text-secondary-color);
    font-size: var(--fs3);
  }

  .field-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
    flex: 1;
  }

  .participants-search-wrapper {
    display: flex;
    align-items: center;
    gap: var(--size-5);
    flex: 1;
  }

  .action-buttons {
    align-self: center;
    display: flex;
    gap: var(--size-5);
  }
</style>
