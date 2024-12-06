
<script lang="ts">
import { ref, provide, defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    const gap: number = 0.2;
    const margin: number = 0.6;

    // Define the type for the `tabTitles` ref, which is an array of strings
    const tabTitles = ref<string[]>(slots.default ? slots.default().map((tab: any) => tab.props.title) : [])  

    // Define the type for `selectedTitle` as a string
    const selectedTitle = ref<string>(tabTitles.value[0])

    // Provide `selectedTitle` to descendant components
    provide("selectedTitle", selectedTitle)

    const selectionBarLeft = () => {
      switch(selectedTitle.value) {
        case "heart-pulse":
          return 0
        case "shoe-prints":
          return 26
        case "person-walking-dashed-line-arrow-right":
          return 50
        case "bed":
          return 76
      }
    };

    const selectionBarOffset = () => {
      switch(selectedTitle.value) {
        case "heart-pulse":
          return gap + margin
        case "shoe-prints":
          return 0
        case "person-walking-dashed-line-arrow-right":
          return 0
        case "bed":
          return -margin-gap
      }
    };

    return {
      gap, margin,
      tabTitles,
      selectedTitle,
      selectionBarLeft,
      selectionBarOffset,
    }
  }
})
</script>

<template>
  <div class="tabWrapper">
    <ul class="tabs">
      <li v-for="title in tabTitles" :key="title" class="tab" @click="selectedTitle = title">
        <font-awesome-icon :icon="title" class="icon" :class="selectedTitle === title ? title : 'icon'"></font-awesome-icon>
      </li>
      <div class="selectionBar" :style="{left: `calc(${selectionBarLeft()}% + ${selectionBarOffset()}rem )`}">
      </div>
    </ul>
    <slot></slot>
  </div>
</template>

<style scoped>
.tabWrapper {
  --gap: 0.5rem;
  --line-offset: calc(var(--gap) / 2);
  --height: 3rem;
  --block-size: 1.6rem;
  --marginTop: calc(var(--height)/2 - var(--block-size)/2);
  --margin: 0.6rem;

  width: calc(100% - var(--marginTop)*2);
  margin: var(--margin) auto;
}

.tabs {
  list-style: none;
  width: 100%;
  margin: auto auto 1rem auto;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  height: var(--height);
  border-radius: 0.8rem;
  background-color: var(--divider-light-2);
  gap: var(--gap);
  overflow: hidden;
  align-items: center;
  cursor: pointer;
}

.tab {
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  border: none;
  position: relative;
}

/* .tab::before{
  content: '';
  background-color: var(--divider-light-1);
  z-index: 1;
  position: absolute;
  inline-size: 1px;
  block-size: var(--block-size);
  inset-block-start: 0;
  inset-inline-start: calc(var(--line-offset) * -1);
} */

.icon{
  color: var(--divider-light-1);
  font-size: 1.4rem;
  z-index: 10;
  transition-duration: 500ms;
}

.heart-pulse {
  color: var(--heart);
}

.shoe-prints {
  color: var(--steps);
}

.person-walking-dashed-line-arrow-right {
  color: var(--speed);
}

.bed {
  color: var(--sleep);
}

.selectionBar {
  background-color: rgb(255, 255, 255);
  width: calc(24% - 0.4rem);
  margin: 0 0.2rem;
  height: calc( var(--height) - 0.6rem);
  position: absolute;
  top: 0.3rem;
  border-radius: 0.6rem;
  transition-duration: 500ms;
}

@media screen and (max-aspect-ratio: 1) {
  .selectionBar {
  position: fixed;
  top: 0.91rem;
  }
}
</style>