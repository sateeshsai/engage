
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


// index.html: 360 Objectdates: "2022-08-07 06:30"description: "asfesrersrdfdsf"facilitators: (2)[{… }, {… }]meetingDateTime: ""meetingDescription: ""meetingName: "aaewesd"participants: (3)[{… }, {… }, {… }][[Prototype]]: Object
// index.html: 360 true Object
// index.html: 366 ObjectformDigestValue: "0x8E2E97776F2AED8217EC59DEE442795854529F10E669CFC277DDD03CA804BDCB0A9655AB78477F0E9F89E5C556FA9A01B8FFE17DC670888DF0E62805B6FA2B2C,01 Jul 2022 07:00:34 -0000"[[Prototype]]: Object
// index.html: 341 New Item Posted query {
//     __metadata: { type: "SP.Data.MeetingstestListItem" },
//     "Title" : "1656658834753:::::aaewesd",
//         "description" : "asfesrersrdfdsf",
//             "dates" : "2022-08-07 06:30",
//                 "facilitatorsId" : { "results": ["60", "59"] },
//     "participantsId" : { "results": ["197", "206", "1"] }
// }
// index.html: 341 New Item Posted Object
// index.html: 366 Objectfacilitators: description: "About the Facilitator group"name: "FacilitatorGroup44"users: Array(2)0: Email: "trungta@deloitte.com"Groups: { __deferred: {… } } Id: 60IsHiddenInUI: falseIsSiteAdmin: falseLoginName: "i:0ǵ.t|adfs prod|trungta"PrincipalType: 1Title: "Rungta, Tripti"UserId: { __metadata: {… }, NameId: 'trungta', NameIdIssuer: 'TrustedProvider:adfs prod' } __metadata: { id: 'https://americas.internal.deloitteonline.com/sites/pursuitscoe/engage/_api/Web/GetUserById(60)', uri: 'https://americas.internal.deloitteonline.com/sites/pursuitscoe/engage/_api/Web/GetUserById(60)', type: 'SP.User' } [[Prototype]]: Object1: { __metadata: {… }, Groups: {… }, Id: 59, IsHiddenInUI: false, LoginName: 'i:0ǵ.t|adfs prod|tripgupta', … } length: 2[[Prototype]]: Array(0)[[Prototype]]: Objectparticipants: description: "About the Participant group"name: "ParticipantGroup44"users: Array(3)0: { __metadata: {… }, Groups: {… }, Id: 197, IsHiddenInUI: false, LoginName: 'i:0ǵ.t|adfs prod|niterana', … } 1: { __metadata: {… }, Groups: {… }, Id: 206, IsHiddenInUI: false, LoginName: 'i:0ǵ.t|adfs prod|kasjoshi', … } 2: { __metadata: {… }, Groups: {… }, Id: 1, IsHiddenInUI: false, LoginName: 'i:0ǵ.t|adfs prod|smodukuru', … } length: 3[[Prototype]]: Array(0)[[Prototype]]: Object[[Prototype]]: Object
// index.html: 349 New Group created Objectd: AllowMembersEditMembership: falseAllowRequestToJoinLeave: falseAutoAcceptRequestToJoinLeave: falseDescription: "About the Facilitator group"Id: 20205IsHiddenInUI: falseLoginName: "FacilitatorGroup44"OnlyAllowMembersViewMembership: trueOwner: { __deferred: {… } } OwnerTitle: "Modukuru, Sateeshsai"PrincipalType: 8RequestToJoinLeaveEmailSetting: nullTitle: "FacilitatorGroup44"Users: { __deferred: {… } } __metadata: { id: 'https://americas.internal.deloitteonline.com/sites…uitscoe/engage/_api/Web/SiteGroups/GetById(20205)', uri: 'https://americas.internal.deloitteonline.com/sites…uitscoe/engage/_api/Web/SiteGroups/GetById(20205)', type: 'SP.Group' } [[Prototype]]: Object[[Prototype]]: Object
// index.html: 366 Array(2)0: "i:0ǵ.t|adfs prod|trungta"1: "i:0ǵ.t|adfs prod|tripgupta"length: 2[[Prototype]]: Array(0)
// index.html: 366 outside Object
// index.html: 349 ObjectuserLoginName: "i:0ǵ.t|adfs prod|trungta"[[Prototype]]: Object
// index.html: 349 New Group created Objectd: { __metadata: {… }, Owner: {… }, Users: {… }, Id: 20206, IsHiddenInUI: false, … } [[Prototype]]: Object
// index.html: 366 Array(3)0: "i:0ǵ.t|adfs prod|niterana"1: "i:0ǵ.t|adfs prod|kasjoshi"2: "i:0ǵ.t|adfs prod|smodukuru"length: 3[[Prototype]]: Array(0)
// index.html: 366 outside Object
// index.html: 349 ObjectuserLoginName: "i:0ǵ.t|adfs prod|niterana"[[Prototype]]: Object
// index.html: 349 Successfully added User to group Object
// index.html: 366 i: 0ǵ.t | adfs prod | niterana Object
// index.html: 366 inside Object
// index.html: 349 ObjectuserLoginName: "i:0ǵ.t|adfs prod|kasjoshi"[[Prototype]]: Object
// index.html: 349 Successfully added User to group Objectd: { __metadata: {… }, Groups: {… }, Id: 60, IsHiddenInUI: false, LoginName: 'i:0ǵ.t|adfs prod|trungta', … } [[Prototype]]: Object
// index.html: 366 i: 0ǵ.t | adfs prod | trungta ObjectaddedUser: { d: {… } } [[Prototype]]: Object
// index.html: 366 inside Object
// index.html: 349 ObjectuserLoginName: "i:0ǵ.t|adfs prod|tripgupta"[[Prototype]]: Object
// index.html: 349 Successfully added User to group Objectd: Email: "kasjoshi@deloitte.com"Groups: { __deferred: {… } } Id: 206IsHiddenInUI: falseIsSiteAdmin: falseLoginName: "i:0ǵ.t|adfs prod|kasjoshi"PrincipalType: 1Title: "Joshi, Kashyap"UserId: { __metadata: {… }, NameId: 'kasjoshi', NameIdIssuer: 'TrustedProvider:adfs prod' } __metadata: { id: 'https://americas.internal.deloitteonline.com/sites/pursuitscoe/engage/_api/Web/GetUserById(206)', uri: 'https://americas.internal.deloitteonline.com/sites/pursuitscoe/engage/_api/Web/GetUserById(206)', type: 'SP.User' } [[Prototype]]: Object[[Prototype]]: Object
// index.html: 349 Successfully added User to group Objectd: { __metadata: {… }, Groups: {… }, Id: 59, IsHiddenInUI: false, LoginName: 'i:0ǵ.t|adfs prod|tripgupta', … } [[Prototype]]: Object
// index.html: 360 ObjectshowFacilitatorSearchbox: false[[Prototype]]: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()__proto__: (...)get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()
// index.html: 360 ObjectshowParticipantSearchbox: false[[Prototype]]: Object
// DevTools failed to load source map: Could not load content for chrome - extension://jmbmjnojfkcohdpkpjmeeijckfbebbon/js/browser-polyfill.min.js.map: System error: net::ERR_BLOCKED_BY_CLIENT