<script>
  import './style.css'

  import {
    beforeUpdate,
    createEventDispatcher,
    onMount,
    setContext,
  } from "svelte";

  import { writable } from "svelte/store";

  export let selected = undefined;
  export let name = undefined;

  const dispatch = createEventDispatcher();
  const selectedValue = writable(selected);

  setContext("Switch", {
    selectedValue,
    add: ({ checked, value }) => {
      if (checked) {
        selectedValue.set(value);
      }
    },
    update: (value) => {
      selected = value;
    },
  });

  onMount(() => {
    $selectedValue = selected;
  });

  beforeUpdate(() => {
    $selectedValue = selected;
  });

  selectedValue.subscribe((value) => {
    selected = value;
    dispatch("change", value);
  });

</script>



<div class="container">
  {#if name}
    <div class="name">
      {name}:
    </div>
  {/if}
  <div class="switch">
    <slot></slot>
  </div>
</div>

<style>
  .switch {
    display: flex;
    background-color: var(--switch-bg);
    padding: 4px;
    gap: 4px;
    border-radius: 8px;
    flex: 1;
  }
  .container {
    display: flex;
    flex-direction: row;
  }
  .name {
    font-size: 12px;
    color: var(--switch-name);
    width: 128px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;
    padding: 0 16px;
  }
  .name:hover {
    color: var(--switch-name-hover);
  }
</style>
