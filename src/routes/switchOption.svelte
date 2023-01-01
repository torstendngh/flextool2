<script>
  import './style.css'
  export let enabled = false;
  export let value = "";
  import { getContext } from "svelte";
  import { writable } from "svelte/store";

  export let id = crypto.randomUUID;

  const ctx = getContext("Switch");

  const selectedValue = ctx
    ? ctx.selectedValue
    : writable(enabled ? value : undefined);
  if (ctx) {
    ctx.add({ id, enabled, value });
  }
  $: enabled = $selectedValue === value;

</script>

<button
  on:click
  class:enabled
  id="{id}"
  value="{value}"
  on:change
  on:click="{() => {
    if (ctx) {
      ctx.update(value);
    }
  }}"
>
  <slot></slot>
  <div class="tooltip">
    {value}
  </div>
</button>



<style>
  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 48px;
    min-width: 48px;
    flex: 1;
    border-radius: 4px;
    background-color: transparent;
    color: var(--switch-fg);
    cursor: pointer;
    gap: 4px;
    position: relative;
  }
  button:hover {
    background-color: var(--switch-bg-hover);
    color: var(--switch-fg-hover);
  }
  .enabled {
    background-color: var(--switch-enabled-bg);
    color: var(--switch-enabled-fg) !important;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .tooltip {
    position: absolute;
    top: calc(100% + 4px);
    background-color: var(--tooltip-bg);
    color: var(--tooltip-fg);
    pointer-events: none;
    z-index: 1000;
    padding: 4px 8px;
    opacity: 0;
    border-radius: 4px;
    backdrop-filter: blur(4px);
    font-weight: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    transform: translateY(-20px);
    transition: all 0.1s ease;

  }
  button:hover > .tooltip {
    transform: translateY(0);
    opacity: 1;
  }
  button:active {
    transform: translateY(2px);
    z-index: 1000;
  }

  button:active > .tooltip {
    z-index: 1000;
  }
</style>
