
<script lang="ts">
import { ref, provide, defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    const gap: number = 0.2
    const margin: number = 0.6
    const aspectRatio = ref<number>(window.innerWidth / window.innerHeight)

    // Define the type for the `tabTitles` ref, which is an array of strings
    const tabTitles = ref<string[]>(slots.default ? slots.default().map((tab: any) => tab.props.title) : [])  

    // Define the type for `selectedTitle` as a string
    const selectedTitle = ref<string>(tabTitles.value[0])
    const selectedIndex = ref<number>(0)

    // Provide `selectedTitle` to descendant components
    provide("selectedTitle", selectedTitle)

    const selectionBarLeft = () => {
      switch(selectedIndex.value) {
        case 0:
          return '0.5rem'
        case 1:
          return 'calc(25% + 0.25rem)'
        case 2:
          return 'calc(50% + 0.25rem)'
        case 3:
          return 'calc(75% )'
      }
    }

    const setSelected = (index: number, title: string) => {
      selectedIndex.value = index
      selectedTitle.value = title
    }

    return {
      gap, margin,
      tabTitles,
      selectedTitle,
      selectionBarLeft,
      selectedIndex,
      setSelected
    }
  }
})
</script>

<template>
  <div class="tabWrapper">
    <ul class="tabs">
      <div class="selectionBar" :style="{ left: selectionBarLeft() }"></div>
      <li v-for="(title, index) in tabTitles" :key="title" class="tab" @click="setSelected(index, title)">
        <font-awesome-icon :icon="title" class="icon" v-if="title.includes('fa')"
        :class="selectedTitle === title ? title.replace('fa-', '') : 'icon'"></font-awesome-icon>
        <span v-else :class="selectedTitle === title ? 'selected' : 'not-selected'">{{ title }}</span>
      </li>
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

  width: 100%;
  margin: 0 auto;
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
  position: relative;
  padding: 0 0.5rem;
}

.tab {
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  border: none;
  position: relative;
}

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

.not-selected {
  color: var(--divider-light-1);
}

.selectionBar {
  background-color: rgb(255, 255, 255);
  width: calc(25% - 0.5rem);
  margin: 0;
  height: calc( var(--height) - 0.8rem);
  position: absolute;
  top: 0.4rem;
  border-radius: 0.6rem;
  transition-duration: 500ms;
}

@media screen and (max-aspect-ratio: 1) {
  .selectionBar {
    width: 24%;
  }
}
</style>