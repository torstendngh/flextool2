<script>
  import './style.css'
  export let favoriteData;
  import { data } from './data'

  function copyToClipboar() {
    let output = "display: flex;\n";
    let cleanedData = JSON.parse(JSON.stringify($data));
    for (let item in cleanedData) {
      if (cleanedData[item].defaultValue != cleanedData[item].currentValue) {
        output += cleanedData[item].cssName + ": " + cleanedData[item].currentValue + ";\n"
      }
    }
    navigator.clipboard.writeText(output);
  }

  function setData() {
    $data = JSON.parse(JSON.stringify(favoriteData));
    copyToClipboar()
  }
</script>

<button
  on:click={setData}
  class="container"
  style="
    flex-direction: {favoriteData.flexDirection.currentValue};
    align-items: {favoriteData.alignItems.currentValue};
    justify-content: {favoriteData.justifyContent.currentValue};
    flex-wrap: {favoriteData.flexWrap.currentValue};
  "
>
  <div style="background-color: var(--div-1);"></div>
  <div style="background-color: var(--div-2);"></div>
  <div style="background-color: var(--div-3);"></div>
  <div style="background-color: var(--div-4);"></div>
  <div style="background-color: var(--div-5);"></div>
</button>

<style>
  .container {
    height: 52px;
    width: 52px;
    border: 4px solid var(--template-border);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    gap: 2px;
    padding: 2px;
    background-color: transparent;
  }
  .container:hover {
    border: 4px solid var(--template-border-hover);
  }
  .container > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 4px;
    min-width: 4px;
    border-radius: 1px;
    font-size: 12px;
    transform: flex 1s ease;
    color: var(--div-fg);
    opacity: 0.75;
  }
  .container:hover > div {
    opacity: 1;
  }
</style>
