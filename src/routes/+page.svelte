<script>
  import Icon from './icon.svelte';
  import './style.css'
  import Switch from './switch.svelte';
  import SwitchOption from './switchOption.svelte';
  import { data, favorites } from './data'
  import Favorite from './favorite.svelte';

  let rotation = 45;
  let visualizationHeight;

  $: if($data.flexDirection.currentValue === "row" || $data.flexDirection.currentValue === "row-reverse") {
    rotation = 90;
  } else {
    rotation = 0;
  }

  function addFavorite() {
    $favorites = [JSON.parse(JSON.stringify($data)), ...$favorites];
  }

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
</script>

<svelte:head>
	<title>FlexTool v2</title>
</svelte:head>

<div class="background">
  <div class="container">
    <div class="window">
      <div
        bind:clientHeight={visualizationHeight}
        class="visualization"
        style="
          flex-direction: {$data.flexDirection.currentValue};
          align-items: {$data.alignItems.currentValue};
          justify-content: {$data.justifyContent.currentValue};
          flex-wrap: {$data.flexWrap.currentValue};
          width: {visualizationHeight}px;
        "
      >
        <div style="background-color: var(--div-1);">1</div>
        <div style="background-color: var(--div-2);">2</div>
        <div style="background-color: var(--div-3);">3</div>
        <div style="background-color: var(--div-4);">4</div>
        <div style="background-color: var(--div-5);">5</div>
      </div>

      <div class="options">

        <Switch bind:selected={$data.flexDirection.currentValue} name="flex-direction" >
          <SwitchOption value="row">
            <Icon name="arrow_left"/>
          </SwitchOption>
          <SwitchOption value="column">
            <Icon name="arrow_down"/>
          </SwitchOption>
          <SwitchOption value="row-reverse">
            <Icon name="arrow_right"/>
          </SwitchOption>
          <SwitchOption value="column-reverse">
            <Icon name="arrow_up"/>
          </SwitchOption>
        </Switch>

        <Switch bind:selected={$data.alignItems.currentValue} name="align-items">
          <SwitchOption value="flex-start">
            <Icon name="align_left" rotate={rotation}/>
          </SwitchOption>
          <SwitchOption value="center">
            <Icon name="align_center" rotate={rotation}/>
          </SwitchOption>
          <SwitchOption value="flex-end">
            <Icon name="align_right" rotate={rotation}/>
          </SwitchOption>
          <SwitchOption value="stretch">
            <Icon name="align_stretch" rotate={rotation}/>
          </SwitchOption>
          <SwitchOption value="baseline">
            <Icon name="align_text" rotate={rotation}/>
          </SwitchOption>
        </Switch>

        <Switch bind:selected={$data.justifyContent.currentValue} name="justify-content">
          <SwitchOption value="flex-start">
            <Icon name="justify_start" rotate={-rotation}/>
          </SwitchOption>
          <SwitchOption value="center">
            <Icon name="justify_center" rotate={-rotation}/>
          </SwitchOption>
          <SwitchOption value="flex-end">
            <Icon name="justify_end" rotate={-rotation}/>
          </SwitchOption>
          <SwitchOption value="space-between">
            <Icon name="justify_space-between" rotate={-rotation}/>
          </SwitchOption>
          <SwitchOption value="space-around">
            <Icon name="justify_space-evenly" rotate={-rotation}/>
          </SwitchOption>
          <SwitchOption value="space-evenly">
            <Icon name="justify_space-around" rotate={-rotation}/>
          </SwitchOption>
        </Switch>

        <Switch bind:selected={$data.flexWrap.currentValue} name="flex-wrap">
          <SwitchOption value="nowrap">
            <Icon name="wrap_no"/>
          </SwitchOption>
          <SwitchOption value="wrap">
            <Icon name="wrap"/>
          </SwitchOption>
          <SwitchOption value="wrap-reverse">
            <Icon name="wrap_reverse"/>
          </SwitchOption>
        </Switch>

        <button class="bigButton" on:click={copyToClipboar}>
          <Icon name="code"/>
          Copy to Clipboard
        </button>
      </div>
    </div>
    <div class="favorites-container">
      <div class="favorites">
        <button on:click={addFavorite} class="addFavoriteButton">
          <Icon name="add"/>
        </button>
        {#each $favorites as favorite}
          <Favorite favoriteData={favorite}/>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .background {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--main-bg);
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 8px;
  }
  .window {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 8px;
    border-radius: 16px;
    gap: 8px;
    background-color: var(--window-bg);
  }
  .visualization {
    display: flex;
    height: 100%;
    border-radius: 8px;
    gap: 4px;
    padding: 4px;
    background-color: var(--visualization-bg);
  }
  .visualization > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 12%;
    min-width: 12%;
    border-radius: 4px;
    font-size: 12px;
    color: var(--div-fg);
  }
  .options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .bigButton {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 56px;
    min-width: 56px;
    flex: 1;
    border-radius: 8px;
    background-color: var(--button-bg);
    color: var(--button-fg);
    cursor: pointer;
    gap: 4px;
    position: relative;
  }
  .bigButton:hover {
    background-color: var(--button-bg-hover);
  }
  .favorites-container {
    display: flex;
    flex-direction: row;
    padding: 8px;
    border-radius: 16px;
    gap: 8px;

    background-color: var(--window-bg);
    max-width: 100%;
    overflow: auto;
  }
  .favorites-container > div {
    display: flex;
    background-color: var(--switch-bg);
    padding: 4px;
    gap: 4px;
    border-radius: 8px;
    flex: 1;
  }
  .favorites {
    display: flex;
    align-items: flex-start;
    overflow: auto;
    max-width: 100%;
  }
  .addFavoriteButton {
    height: 52px;
    width: 52px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    background-color: var(--button-add-favorite-bg);
    color: var(--button-add-favorite-fg);
    cursor: pointer;
  }
  .addFavoriteButton:hover {
    background-color: var(--button-add-favorite-bg-hover);
  }

</style>
