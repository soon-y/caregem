<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';

</script>

<template>
  <div class="container"> 
    <Tabs>
      <Tab title="heart-pulse">
        this is tab1
      </Tab>
      <Tab title="shoe-prints">
        this is tab2
      </Tab>
      <Tab title="person-walking-dashed-line-arrow-right">
        this is tab3
      </Tab>
      <Tab title="bed">
        this is tab4
      </Tab>
    </Tabs>    

  </div>
</template>

<style>
.container {
  width: calc(100vw - 10rem);
  height: 100vh;
  position: relative;
  left: 10rem;
}

@media screen and (max-aspect-ratio: 1) {
  .container {
  width: 100vw;content: '';
  position: absolute;
  background-color: var(--line-color);
  z-index: 1;
  height: calc(100vh - 4rem);
  left: 0;
  }
}
</style>
