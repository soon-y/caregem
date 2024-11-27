
<script lang="ts">
import { ref, provide, defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    // Define the type for the `tabTitles` ref, which is an array of strings
    const tabTitles = ref<string[]>(slots.default ? slots.default().map((tab: any) => tab.props.title) : [])
    
    // Define the type for `selectedTitle` as a string
    const selectedTitle = ref<string>(tabTitles.value[0])

    // Provide `selectedTitle` to descendant components
    provide("selectedTitle", selectedTitle)

    return {
      tabTitles,
      selectedTitle
    }
  }
})
</script>

<template>
  <div>
    <ul class="tabs">
      <li v-for="title in tabTitles" 
      :key="title"
      class="tab"
      @click="selectedTitle = title">
        <font-awesome-icon :icon="title" class="icon"/>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<style scoped>
.tabs {
  list-style: none;
  width: 94%;
  margin: 1rem auto;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  height: 3rem;
  border-radius: 1rem;
  background-color: rgba(239, 239, 239, 0.8);
  gap: 1rem;
  overflow: hidden;
}

.heart {
  background-color: var(--heart);
}

.tab {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  border: none;
  position: relative;
}

.tab::before{
  content: '';
  background-color: var(--divider-light-1);
  z-index: 1;
  position: absolute;
  margin: auto;
  inline-size: 1px;
  block-size: 2rem;
  inset-block-start: 0;
  inset-inline-start: calc(0.5rem * -1);
}

.icon{
  color: var(--divider-light-1);
  font-size: 1.4rem;
  padding: auto 0;
}



@media (min-width: 1024px) {

}
</style>