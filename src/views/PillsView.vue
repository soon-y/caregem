<script setup lang="ts">
import Medication from '../components/Medication.vue'
import { today } from '../chart/global_label'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import Details from './Details.vue'
import * as medication from '../global_array/medicationInfo'
import AddMedicationView from './AddMedicationView.vue'
import { ref } from 'vue'
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

const optionsMedicationToday = pillToday.options
const dataMedicationToday = ref<ChartData<'bar'>>({ datasets: [] })

let myStyles = {
  height: `20vh`,
  width: '100%',
  marginTop: '5rem'
}
const clickedIndex = ref<number>(0)


const datasetsToday = () => ({
  labels: today,
  datasets: [
    {
      label: medication.data[clickedIndex.value].name,
      backgroundColor: medication.backgroundColor[medication.data[clickedIndex.value].bgColorIndex],
      data: [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    }
  ]
})

const medicationStyle = ref<{ transform: string }>({
  transform: 'translate(0, 100%)',
})

const enableAddPage = () => {
  medicationStyle.value = { transform: 'translate(0, 0)' };
}

const closeAddPage = () => {
  medicationStyle.value = { transform: 'translate(0, 100%)' };
}

const detailsStyle = ref<{ transform: string }>({
  transform: 'translate(100%, 0)',
})

const toDetailPage = (index: number) => {
  detailsStyle.value = { transform: 'translate(0, 0)' };
  clickedIndex.value = index
  dataMedicationToday.value = datasetsToday()
}

const closeDetailpage = () => {
  detailsStyle.value = { transform: 'translate(100%, 0)' };
}

</script>


<template>
  <div class="container">
    <div class="box-wrapper">
      <Medication v-for="(item ,index) in medication.data" :key="index" 
      @click="toDetailPage(index)" :style="{cursor: 'pointer'}"> 
        <template v-slot:image>
          <img v-bind:src="'/pill/'+ item.shape + '_' + item.colorLeft + '_' + item.colorRight +'.png'" 
          :style="{ 'background-color': medication.backgroundColor[item.bgColorIndex] }" />
        </template>
        <template v-slot:name> {{ item.name }} </template>
        <template v-slot:dose> {{ item.strength + item.unit }} </template>
        <template v-slot:schedule> {{ item.schedule.join(", ") }} </template>
        <template v-slot:time> {{ item.time.join(", ") }} </template>
      </Medication>
    </div>

    <div class="add" @click="enableAddPage">
      <font-awesome-icon icon="fa-plus" class="plus-icon"/>
    </div>
  </div>

  <AddMedicationView :style = medicationStyle>
    <template v-slot:close>
      <font-awesome-icon icon="fa-xmark" @click="closeAddPage"/>
    </template>
  </AddMedicationView>

  <Details :style = detailsStyle>
    <template v-slot:close>
      <font-awesome-icon icon="fa-xmark" @click="closeDetailpage"/>
    </template>

    <template v-slot:name> {{ medication.data[clickedIndex].name }} </template>

    <template v-slot:tab>
      <Tabs>
      <Tab title="DAY">

        <Bar :data="dataMedicationToday" :options="optionsMedicationToday" :style="myStyles"/>


      </Tab>
      <Tab title="WEEK">
  

      </Tab>
      <Tab title="MONTH">
        

      </Tab>
      <Tab title="YEAR">
        
      </Tab>
    </Tabs>   
    </template>



    <template v-slot:image>
      <img v-bind:src="'/pill/'+ medication.data[clickedIndex].shape + '_' + medication.data[clickedIndex].colorLeft + '_' + medication.data[clickedIndex].colorRight +'.png'" 
      :style="{ 'background-color': medication.backgroundColor[medication.data[clickedIndex].bgColorIndex] }" />
    </template>

    <template v-slot:dose> {{ medication.data[clickedIndex].strength + medication.data[clickedIndex].unit }} </template>
    <template v-slot:schedule> {{ medication.data[clickedIndex].schedule.join(", ") }} </template>
    <template v-slot:time> {{ medication.data[clickedIndex].time.join(", ") }} </template>
  </Details>

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
  cursor: pointer;
}

.plus-icon{
  align-self: center;
  color: white;
  font-size: 1.2rem;
}

.box-wrapper{
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 1rem;
  margin-bottom: 6rem;
  margin-top: 5.4rem;
}

.pill-graph{
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

  .box-wrapper{
    grid-template-columns: 100%;
  }
}
</style>
