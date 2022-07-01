
//BREAK PERMISSION INHERITANCE
export async function breakPermissionInheritance(listname, FormDigestValue) {

    const request = new Request(`${siteUrl}/_api/web/lists/GetByTitle('${listname}')/breakroleinheritance(copyroleassignments=true, clearroleassignments=true)`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            "X-RequestDigest": FormDigestValue,
            "IF-MATCH": "*",
        }),
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Permission Inheritance Broken", data)
            return data;
        })
        .catch((error) => console.log("ERROR in breaking Permission Inheritance", error));
}

//CREATE SITE GROUP
export async function createSiteGroup(groupname, groupDescription, FormDigestValue) {

    const request = new Request(`${siteUrl}/_api/web/sitegroups/`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            "X-RequestDigest": FormDigestValue,
            "IF-MATCH": "*",
        }),
        body: `{
        __metadata:{"type": "SP.Group"},
        "Title": "${groupname}",
        "Description": "${groupDescription}"
    }`,
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Site Group Created", data)
            return data;
        })
        .catch((error) => console.log("ERROR in creating Site Group", error));
}

//ADD USER TO SITE GROUP
export async function addUserToSiteGroup(groupname, userLoginName, FormDigestValue) {

    const request = new Request(`${siteUrl}/_api/web/sitegroups/getByName('${groupname}')/users`, {
        method: "POST",
        credentials: "same-origin", // or credentials: 'include'
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose",
            "X-RequestDigest": FormDigestValue,
            "IF-MATCH": "*",
        }),
        body: `{ __metadata: { "type": "SP.User" },  
            LoginName: "${userLoginName}"  
        }`,
    });

    return fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log("Users Added to Site Group", data)
            return data;
        })
        .catch((error) => console.log("ERROR in adding users to Site Group", error));
}
