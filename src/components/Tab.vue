<script>
import { inject } from 'vue';

export default{
  props: ["title"],
  setup() {
    const selectedTitle = inject("selectedTitle")
    return{
      selectedTitle,
    }
  }

  
}
  
</script>

<template>
  <div v-show= "title == selectedTitle">
    <slot></slot>
  </div>
</template>


<style scoped>


@media (min-width: 1024px) {

}
</style>
