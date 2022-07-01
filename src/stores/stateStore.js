import { writable } from "svelte/store";

export let currentUser = writable({});
export let activeSection = writable("home");
export let previousSection = writable("");
