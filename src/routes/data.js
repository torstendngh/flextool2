import { writable } from 'svelte/store';

export let data = writable({
  flexDirection: {
    defaultValue: "row",
    currentValue: "row",
    cssName: "flex-direction"
  },
  alignItems: {
    defaultValue: "stretch",
    currentValue: "stretch",
    cssName: "align-items"
  },
  justifyContent: {
    defaultValue: "flex-start",
    currentValue: "flex-start",
    cssName: "justify-content"
  },
  flexWrap: {
    defaultValue: "nowrap",
    currentValue: "nowrap",
    cssName: "flex-wrap"
  }
});

export let favorites = writable([])
