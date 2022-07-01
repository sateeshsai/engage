//IMPORTS
import { capitalizeFirstLetter } from "../utilities/helpers";


//CURRENT SITE URL
export let siteUrl = "https://americas.internal.deloitteonline.com/sites/pursuitscoe/engage";
export let masterMeetingList = "Meetingstest";

export let roleDefinitions = {
    "Full Control": "4294967295",


}


// ENSURE USER BY EMAIL
export async function ensureUserByEmail(requestDigest, userId) {
    const request = new Request(`${siteUrl}/_api/web/ensureuser('${userId}')`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "X-RequestDigest": requestDigest,
            'accept': 'application/json;odata=verbose;charset=utf-8',
            'Content-Type': 'application/json;odata=verbose;charset=utf-8',
        }),
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Ensure user success", data)
            let items = data.d.results;
            // console.log(items)
            return items;
        })
        .catch((error) => console.log("Ensure user failed", error));
}


// ENSURE USER TEST
function ensureTest() {
    getRequestDigest().then((formDigestValue) => {
        ensureUserByEmail(formDigestValue, "smodukuru")
            .then((data) => console.log("ensure successful", data))
            .catch((error) => console.log("ensure failed", error));
    });
}


//function to get request digest from sharepoint
export async function getRequestDigest() {
    const request = new Request(`${siteUrl}/_api/contextinfo`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            Accept: "application/json; odata=verbose",
        }),
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            let formDigestValue = data.d.GetContextWebInformation.FormDigestValue;
            // console.log(items)
            return formDigestValue;
        })
        .catch((error) => console.log(error));
}

//FETCH DATA FROM SHAREPOINT LIST
export async function fetchQuery(query) {
    console.log("fetch query")
    const tasks = new Request(`${siteUrl}/${query}`, {
        method: "GET",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            Accept: "application/json; odata=verbose",
        }),
    });

    return fetch(tasks)
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((error) => console.log(error));
}

//FETCH DATA BY LIST TITLE AND QUERY FROM SHAREPOINT LIST 
export async function fetchListByTitleAndQuery(listname, query) {
    const tasks = new Request(`${siteUrl}/_api/web/lists/GetByTitle('${listname}')/items${query}`, {
        method: "GET",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            Accept: "application/json; odata=verbose",
        }),
    });

    return fetch(tasks)
        .then((response) => response.json())
        .then((data) => {
            console.log("Items fetched by ListTitle and Query", data)
            return data
        })
        .catch((error) => console.log(error));
}

//POST NEW ITEM TO SHAREPOINT LIST
export async function postItem(list, formDigestValue, data) {
    console.log("New Item Posted query", `{__metadata: { type: "SP.Data.${capitalizeFirstLetter(list)}ListItem" }, ${data}}`)
    const request = new Request(`${siteUrl}/_api/web/lists/GetByTitle('${list}')/items`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            "X-RequestDigest": formDigestValue,
            "IF-MATCH": "*",
        }),
        body: `{__metadata: { type: "SP.Data.${capitalizeFirstLetter(list)}ListItem" }, ${data}}`,
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("New Item Posted", data)
            return data;
        })
        .catch((error) => console.log("ERROR in New Item Posting", error));
}

//UPDATE ITEM IN SHAREPOINT LIST
export async function updateItemByID(listname, itemIDQuery, requestDigest, data) {
    console.log("Item Update query", `{__metadata: { type: "SP.Data.${capitalizeFirstLetter(listname)}ListItem" }, ${data}}`)
    const request = new Request(`${siteUrl}/_api/web/lists/GetByTitle('${listname}')/items${itemIDQuery}`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            "X-RequestDigest": requestDigest,
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*",
        }),
        body: `{__metadata: { type: "SP.Data.${capitalizeFirstLetter(listname)}ListItem" }, ${data}}`,
    });

    return fetch(request)
        .then((data) => {
            console.log("Item Updated", data)
            return data;
        })
        .catch((error) => console.log("ERROR in Item Update", error));
}


//CREATE NEW LIST
export async function createNewList(listname, formDigestValue) {

    const request = new Request(`${siteUrl}/_api/web/lists/`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            "X-RequestDigest": formDigestValue,
            "IF-MATCH": "*",
        }),
        body: `{__metadata: { type: "SP.List" },
        "AllowContentTypes": "true",
        "BaseTemplate": 100,
        "ContentTypesEnabled": "true",
        "Description": "meeting item database test",
        "Title": "${listname}"}`,
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("List Created", data)
            return data;
        })
        .catch((error) => console.log("List Created ERROR", error));
}



//CREATE NEW LIST
export async function createNewGroup(groupName, groupDescription, formDigestValue) {

    const request = new Request(`${siteUrl}/_api/Web/SiteGroups`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            "X-RequestDigest": formDigestValue,
            "IF-MATCH": "*",
        }),
        body: `{__metadata: {"type": "SP.Group"},
                "Title": "${groupName}",
                "Description": "${groupDescription}"
            }`,
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("New Group created", data)
            return data;
        })
        .catch((error) => console.log("ERROR in creating new Group", error));
}

//ADD USER TO GROUP
export async function addUserToGroup(userLoginName, groupId, formDigestValue) {
    console.log({ userLoginName })

    const request = new Request(`${siteUrl}/_api/web/sitegroups('${groupId}')/users`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            "X-RequestDigest": formDigestValue,
            "IF-MATCH": "*",
        }),
        body: `{__metadata: { "type": "SP.User" }, "LoginName": "${userLoginName}" }`,
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Successfully added User to group", data)
            return data;
        })
        .catch((error) => console.log("ERROR in adding User to group", error));
}

// Get the ID of the target group.
export async function getTargetGroupId(groupName) {

    const request = new Request(`${siteUrl}/_api/web/sitegroups/getbyname("${groupName}")/id`, {
        method: "GET",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
        }),

    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Got Group Id", data)
            return data;
        })
        .catch((error) => console.log("ERROR in getting Group Id", error));
}


// Get the ID of the role definition that defines the permissions
export async function getRoleDefinitionId(roleDefinitionName) {
    const request = new Request(`${siteUrl}/_api/web/roledefinitions/getbyname("${roleDefinitionName}")/id`, {
        method: "GET",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
        }),

    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Got Group Id", data)
            return data;
        })
        .catch((error) => console.log("ERROR in getting Group Id", error));
}

// Break role inheritance on the list.
export function breakRoleInheritanceOfList(listTitle, formDigestValue) {
    const request = new Request(`${siteUrl}/_api/web/lists/getbytitle("${listTitle}")/breakroleinheritance(true)`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "X-RequestDigest": formDigestValue,
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
        }),

    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("List permissions inheritance broken", data)
            return data;
        })
        .catch((error) => console.log("ERROR in breaking permissions inheritance", error));
}


// Remove the current role assignment for the group on the list.
export function deleteCurrentRoleForGroup(listTitle, groupId, formDigestValue) {
    const request = new Request(`${siteUrl}/_api/web/lists/getbytitle("${listTitle}")/roleassignments/getbyprincipalid("${groupId}")`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "X-RequestDigest": formDigestValue,
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            'X-HTTP-Method': 'DELETE'

        }),

    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Removed the current role assignment for the group on the list", data)
            return data;
        })
        .catch((error) => console.log("ERROR in Removing the current role assignment for the group on the list", error));
}



// Add the new role assignment for the group on the list.
export function setNewPermissionsForGroup(listTitle, groupId, targetRoleDefinitionId, formDigestValue) {
    const request = new Request(`${siteUrl}//_api/web/lists/getbytitle("${listTitle}")/roleassignments/addroleassignment(principalid="${groupId}",roledefid="${targetRoleDefinitionId}")`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "X-RequestDigest": formDigestValue,
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            'X-HTTP-Method': 'DELETE'

        }),

    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Added the new role assignment for the group on the list.", data)
            return data;
        })
        .catch((error) => console.log("ERROR in adding the new role assignment for the group on the list.", error));
}




//CREATE NEW LIST COLUMN
export async function createNewListColumn(listname, columObject, formDigestValue) {

    const request = new Request(`${siteUrl}/_api/web/lists/getByTitle('${listname}')/fields`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            "X-RequestDigest": formDigestValue,
            "IF-MATCH": "*",
        }),
        body: `{
        __metadata: { type: "SP.Field" },
        "FieldTypeKind": ${columObject.FieldTypeKind},
        "Title": "${columObject.name}"
    }`,
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Column Created", data)
            return data;
        })
        .catch((error) => console.log("Column Created ERROR", error));
}
