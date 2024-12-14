<script setup lang="ts">
import Medication from '../components/Medication.vue'
import * as medication from '../global_array/medicationInfo'

</script>


<template>
  <div class="container">
    <div class="boxWrapper">
      <Medication v-for="(name ,index) in medication.name" :key="name"> 
        <template v-slot:image></template>
        <template v-slot:name> {{ name }} </template>
        <template v-slot:dose> {{ medication.strength[index] }} </template>
        <template v-slot:time> {{ medication.time[index] }} </template>
      </Medication>
    </div>

    <RouterLink to="/medications/add">
      <div class="add">
        <font-awesome-icon icon="fa-plus" class="plusIcon"/>
      </div>
    </RouterLink>
  </div>
</template>

<style scope>
.add{
  width: 3rem;
  height: 3rem;
  background-color: var(--main-lila-hell);
  border-radius: 50%;
  display: flex;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  justify-content: center;
}

.plusIcon{
  align-self: center;
  color: white;
  font-size: 1.2rem;
}

.boxWrapper{

  display: grid;
  grid-template-columns: 50% 50%;
  padding: 1rem;
  margin-bottom: 5rem;
}

@media screen and (max-aspect-ratio: 1) {
  .add{
  bottom: 5rem;
  }

  .boxWrapper{
  grid-template-columns: 100%;
  gap: 0.8rem;
}
}
</style>
