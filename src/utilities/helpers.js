export async function checkImage(url) {

    const res = await fetch(url);
    const buff = await res.blob();

    return buff.type.startsWith('image/')

}

export function randomID() {
    return String(new Date().valueOf())
}

//CAPITALIZE FIRST LETTER
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
