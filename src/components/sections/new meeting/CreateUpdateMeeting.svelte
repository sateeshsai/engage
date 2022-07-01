<script>
  import MeetingForm from "./../common/MeetingForm.svelte";
  import SearchPeopleInput from "./../common/SearchPeopleInput.svelte";
  import Avatars from "../common/Avatars.svelte";
  import TextInput from "../common/TextInput.svelte";
  import SectionHeader from "../common/Section Header.svelte";
  import DateTimeInput from "../common/DateTimeInput.svelte";
  import Divider from "../common/Divider.svelte";
  import Button from "../../UI components/Button.svelte";
  import Loading from "../common/Loading.svelte";
  import TileModal from "../common/TileModal.svelte";
  import IconWrapper from "../../UI components/icons/IconWrapper.svelte";
  import Close from "../../UI components/icons/Close.svelte";

  //STORES
  import { activeSection, previousSection, currentUser } from "./../../../stores/stateStore.js";

  //UTILITIES
  import { randomID } from "../../../utilities/helpers.js";

  //STATIC IMPORTS
  import { itemDatabaseStructures } from "./../../static/itemDatabaseStructures.js";

  //SHAREPOINT REST API
  import {
    fetchListByTitleAndQuery,
    masterMeetingList,
    getRequestDigest,
    postItem,
    createNewList,
    createNewListColumn,
    updateItemByID,
    createNewGroup,
    addUserToGroup,
    setNewPermissionsForGroup,
    breakRoleInheritanceOfList,
  } from "./../../../stores/API.js";

  //IMPLEMENTATION
  export let formMode = "create";
  export let meetingID = undefined;

  let meetingFormData = undefined;

  if (formMode === "create") {
    meetingFormData = {
      meetingName: "",
      meetingDescription: "",
      meetingDateTime: "",
      facilitators: [],
      participants: [],
    };
  } else if (formMode === "update") {
    let odataQuery = `?$filter=ID eq '${meetingID}'&$select=ID,Title,description,dates,facilitators,facilitators/Title,facilitators/EMail,facilitators/Id,participants,participants/Title,participants/EMail,participants/Id,Created,Author,Author/Title,Author/EMail&$expand=Author,facilitators,participants`;

    fetchListByTitleAndQuery(masterMeetingList, odataQuery).then((data) => {
      meetingFormData = data.d.results[0];
      console.log({ meetingFormData });
      meetingFormData.meetingName = meetingFormData.Title.split(":::::")[1];
      meetingFormData.facilitators = meetingFormData.facilitators.results;
      meetingFormData.participants = meetingFormData.participants.results;
    });
  }

  async function createColumnRecursive(createdListName, columnsObject, trackColumnCount, formDigestValue) {
    createNewListColumn(createdListName, columnsObject[trackColumnCount], formDigestValue).then((createdColumn) => {
      console.log(columnsObject[trackColumnCount].name, createdColumn);
      trackColumnCount++;
      if (trackColumnCount > columnsObject.length - 1) {
        return "All columns created";
      } else {
        createColumnRecursive(createdListName, columnsObject, trackColumnCount, formDigestValue);
      }
    });
  }

  async function addUsersRecursive(userLoginNames, groupId, trackUserCount, formDigestValue) {
    addUserToGroup(userLoginNames[trackUserCount], groupId, formDigestValue).then((addedUser) => {
      console.log(userLoginNames[trackUserCount], { addedUser });
      trackUserCount++;
      if (trackUserCount > userLoginNames.length - 1) {
        return "All users added";
      } else {
        addUsersRecursive(userLoginNames, groupId, trackUserCount, formDigestValue);
      }
    });
  }

  function submitNewMeeting(e) {
    //PREPARE DATA

    let facilitatorsIds = meetingFormData.facilitators.map((person) => `"${String(person.Id)}"`);
    meetingFormData.participants = [...meetingFormData.participants, $currentUser];
    let participantsIds = meetingFormData.participants.map((person) => `"${String(person.Id)}"`);

    let newMeetingDataToPost = `
    "Title" : "${randomID() + ":::::" + meetingFormData.meetingName}",
    "description" : "${meetingFormData.description}",
    "dates" : "${meetingFormData.dates}",
    "facilitatorsId" : { "results": [${facilitatorsIds}] },
    "participantsId" : { "results": [${participantsIds}] }
  `;
    // "whiteboards" : "",
    // "polls" : "",
    // "boardcomponents" : " ",
    // "theme" : " ",

    //POST TO MASTER MEETING LIST (Meetingstest), CREATE LIST FOR EACH SECTION, CREATE COLUMNS FOR EACH LIST
    getRequestDigest().then((formDigestValue) => {
      console.log({ formDigestValue });

      postItem(masterMeetingList, formDigestValue, newMeetingDataToPost).then((postedItem) => {
        let userGroups = {
          facilitators: {
            name: "FacilitatorGroup" + postedItem.d.Id,
            description: "About the Facilitator group",
            users: meetingFormData.facilitators,
          },
          participants: {
            name: "ParticipantGroup" + postedItem.d.Id,
            description: "About the Participant group",
            users: meetingFormData.participants,
          },
        };

        console.log(userGroups);

        let createdGroups = [];
        Object.entries(userGroups).map(([groupKey, group], userGroupIndex, userGroupSelf) => {
          createNewGroup(group.name, group.description, formDigestValue).then((createdGroup) => {
            let userLoginNames = group.users.map((person) => person.LoginName);
            console.log(userLoginNames);
            let groupId = createdGroup.d.Id;
            createdGroups.push(createdGroup);
            let trackUserCount = 0;
            // FIXME: RECURSION NOT WORKING SEQUENTIALLY
            console.log("outside", { trackUserCount });
            addUserToGroup(userLoginNames[trackUserCount], groupId, formDigestValue).then((addedUser) => {
              console.log(userLoginNames[trackUserCount], { addedUser });
              trackUserCount++;
              console.log("inside", { trackUserCount });
              if (trackUserCount < userLoginNames.length) {
                addUserToGroup(userLoginNames[trackUserCount], groupId, formDigestValue);
              } else {
                console.log("All users added confirmation", addedUser);

                if (userGroupIndex + 1 === userGroupSelf.length) startLists();
              }
            });

            // addUsersRecursive(userLoginNames, groupId, trackUserCount, formDigestValue).then(
            //   (allUsersAddedConfirmation) => {}
            // );
          });
        });

        function startLists() {
          //CREATE LISTS
          console.log("LIST CREATION STARTED");

          const createdMeetingID = String(postedItem.d.Id);
          const meetingDate = postedItem.d.dates;

          Object.entries(itemDatabaseStructures).map(([sectionName, sectionObj]) => {
            let newListName = sectionName + "list" + createdMeetingID;

            createNewList(newListName, formDigestValue).then((createdList) => {
              let roleDefinitions = {
                Facilitator: "1073741930",
                Participant: "1073741830",
                Read: "1073741826",
              };

              //SET PERMISSIONS FOR FACILITATOR AND PARTICIPANT GROUPS / ADD USER GROUP TO LIST PERMISSIONS
              console.log(createdGroups);
              createdGroups.map((createdGroup, groupIndex, groupSelfArray) => {
                setNewPermissionsForGroup(
                  createdList.Title, //SHOULD BE SAME AS newListName
                  createdGroup.Id,
                  roleDefinitions[createdGroup.Title.split("Group")[0]],
                  formDigestValue
                ).then((permissionSet) => {
                  console.log("Permission set for " + createdGroup.Title, permissionSet);
                  if (groupIndex + 1 > groupSelfArray.length) {
                    // BREAK PERMISSION INHERITANCE
                    breakRoleInheritanceOfList(createdList.Title, formDigestValue).then((inheritanceBroken) => {
                      console.log("Inheritance broken for " + createdList.Title, inheritanceBroken);
                      let trackColumnCount = 0;
                      createColumnRecursive(newListName, sectionObj, trackColumnCount, formDigestValue).then(
                        (confirmation) => {
                          console.log("All columns created for " + createdList.Title, confirmation);
                        }
                      );
                    });
                  }
                });
              });
            });
          });
        }
      });
    });
  }

  function updateMeeting() {
    //PREPARE DATA
    let facilitatorsIds = meetingFormData.facilitators.map((person) => `"${String(person.Id)}"`);
    let participantsIds = meetingFormData.participants.map((person) => `"${String(person.Id)}"`);
    let newTitle = meetingFormData.Title.split(":::::")[0] + ":::::" + meetingFormData.meetingName;
    let updatedMeetingDataToPost = `
    "Title" : "${newTitle}",
    "description" : "${meetingFormData.description}",
    "dates" : "${meetingFormData.dates}",
    "facilitatorsId" : { "results": [${facilitatorsIds}] },
    "participantsId" : { "results": [${participantsIds}] }
  `;

    //UPDATE ITEM IN MASTER MEETING LIST (Meetingstest)
    getRequestDigest().then((formDigestValue) => {
      let itemIdQuery = `(${meetingFormData.Id})`;
      updateItemByID(masterMeetingList, itemIdQuery, formDigestValue, updatedMeetingDataToPost);
    });
  }

  function deleteFacilitator(e) {
    let personToDelete = e.detail;
    meetingFormData.facilitators = meetingFormData.facilitators.filter((person) => person.Id !== personToDelete.Id);
  }

  function deleteParticipant(e) {
    let personToDelete = e.detail;
    meetingFormData.participants = meetingFormData.participants.filter((person) => person.Id !== personToDelete.Id);
  }

  function closeMeetingFormModal() {
    $activeSection = $previousSection;
  }
</script>

{#if meetingFormData === undefined}
  <TileModal>
    <Loading />
  </TileModal>
{/if}
{#if meetingFormData !== undefined}
  <TileModal>
    <section class="container">
      <SectionHeader title="New meeting">
        <IconWrapper on:click={closeMeetingFormModal}>
          <Close strokeColor="var(--text-dull-color)" strokeWidth="var(--stroke-width-1)" />
        </IconWrapper>
      </SectionHeader>
      <Divider />
      <MeetingForm
        {meetingFormData}
        {formMode}
        on:createnewmeeting={submitNewMeeting}
        on:updatemeeting={updateMeeting}
        on:cancel={closeMeetingFormModal}
        on:deletefacilitator={deleteFacilitator}
        on:deleteparticipant={deleteParticipant}
      />
    </section>
  </TileModal>
{/if}

<style>
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--size-9);
    width: 30rem;
  }
</style>
