<script setup lang="ts">
import Medication from '../components/Medication.vue'
import * as medication from '../global_array/medicationInfo'
import AddMedicationView from './AddMedicationView.vue'
import { ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import type { ChartData } from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as pillToday from '../chart/pillToday'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const optionsPillToday = pillToday.options
const dataPillToday = ref<ChartData<'bar'>>({ datasets: [] })
let myStyles = {
  height: `30%`,
}

const addMedicationStyle = ref<{ transform: string }>({
      transform: 'translate(0, 100%)',
})

const enableAdd = () => {
  addMedicationStyle.value = { transform: 'translate(0, 0)' };
}

const disableAdd = () => {
  addMedicationStyle.value = { transform: 'translate(0, 100%)' };
}

onMounted(() => {
  dataPillToday.value = pillToday.datasets()
})
</script>


<template>
  <div class="container">
    <div class="pillGraph">
      <Bar :data="dataPillToday" :options="optionsPillToday" :style="myStyles"/>
    </div>
    <div class="boxWrapper">
      <Medication v-for="(name ,index) in medication.name" :key="name"> 
        <template v-slot:image><img v-bind:src="'/pill/'+ medication.type[index] + '_' + medication.shape[index] + '_' + medication.color[index] +'.png'" 
          :style="{'background-color': medication.bgColor[index]}" />
        </template>
        <template v-slot:name> {{ name }} </template>
        <template v-slot:dose> {{ medication.strength[index] + medication.unit[index] }} </template>
        <template v-slot:interval> {{ medication.interval[index] }} </template>
        <template v-slot:time> {{ medication.time[index] }} </template>
      </Medication>
    </div>

    <div class="add" @click="enableAdd">
      <font-awesome-icon icon="fa-plus" class="plusIcon"/>
    </div>
  </div>
  <AddMedicationView :style = addMedicationStyle>
    <template v-slot:close>
      <font-awesome-icon icon="fa-xmark" @click="disableAdd"/>
    </template>
  </AddMedicationView>
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
  z-index: 1;
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
  margin-bottom: 6rem;
  margin-top: 5.4rem;
}

.pillGraph{
  position: relative;
  width: calc(100% - 3rem);
  margin: auto;
  left:0rem;
  top: 5.4rem; 
}

@media screen and (max-aspect-ratio: 1) {
  .add{
    bottom: 5rem;
  }

  .boxWrapper{
    grid-template-columns: 100%;
  }
}
</style>
