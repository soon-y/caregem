<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,LineElement,PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

import type { ChartData } from 'chart.js'

import { Bar } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import * as heartToday from '../chart/heartToday'
import * as stepsToday from '../chart/stepsToday'
import * as speedToday from '../chart/speedToday'
import * as sleepToday from '../chart/sleepToday'
import { getRandomNumber } from '../chart/global_label'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, BarElement, CategoryScale, LinearScale)

let dataMounted: boolean = false 
const optionsHeart = heartToday.options
const optionsSteps = stepsToday.options
const optionsSpeed = speedToday.options
const optionsSleep = sleepToday.options
const dataHeart = ref<ChartData<'bar'>>({ datasets: [] })
const dataSteps = ref<ChartData<'bar'>>({ datasets: [] })
const dataSpeed = ref<ChartData<'bar'>>({ datasets: [] })
const dataSleep = ref<ChartData<'line'>>({ datasets: [] })
const arrayHeart = heartToday.array()
const arraySpeed = speedToday.array()

let myStyles = {
  height: window.innerWidth/window.innerHeight > 1? `calc(100vh - 14.5rem)` :  `calc(100vh - 22rem)`,
}

let currentBPM = ref(arrayHeart[arrayHeart.length-1])

onMounted(() => {
  dataHeart.value = heartToday.datasets()
  dataSteps.value = stepsToday.datasets()
  dataSpeed.value = speedToday.datasets()
  dataSleep.value = sleepToday.datasets()
  dataMounted = true

  setInterval(() => {
    currentBPM.value = getRandomNumber(arrayHeart[arrayHeart.length-2],arrayHeart[arrayHeart.length-1])
  }, 5000)
})

</script>

<template>
  <div class="container"> 
    <div class="tab-wrapper">
    <Tabs>
      <Tab title="fa-heart-pulse">
        <div class="info-container" v-if="dataMounted">
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Current <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value heart-pulse">{{ currentBPM }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Highest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.max(...arrayHeart) }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Lowest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.min(...arrayHeart) }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Average <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.round(arrayHeart.reduce((a:number, b:number) => a+b, 0 ) / arrayHeart.length) }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Bar :data="dataHeart" :options="optionsHeart" :style="myStyles"/>
        </div>
      </Tab>
      <Tab title="fa-shoe-prints">
        <div class="info-container" v-if="dataMounted">
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Total <br> <span class="unit">steps</span></p></th>
          <td>
            <p class="value shoe-prints">{{ stepsToday.totalValue }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Climbed <br> <span class="unit">floor</span></p></th>
          <td>
            <p class="value">{{ stepsToday.totalValue > 100 ? stepsToday.climbed : 0 }}</p>   
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Distance <br> <span class="unit">km</span></p></th>
          <td>
            <p class="value">{{ stepsToday.distanceValue }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Active <br> <span class="unit">hour</span></p></th>
          <td>
            <p class="value">{{ stepsToday.durationHour +":"+ stepsToday.durationMins }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Bar :data="dataSteps" :options="optionsSteps" :style="myStyles"/>
        </div>
      </Tab>
      <Tab title="fa-person-walking-dashed-line-arrow-right">
        <div class="info-container" v-if="dataMounted">
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Latest <br> <span class="unit">km/h</span></p></th>
          <td>
            <p class="value person-walking-dashed-line-arrow-right">{{ speedToday.latest }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Highest <br> <span class="unit">km/h</span></p></th>
          <td>
            <p class="value">{{ arraySpeed[arraySpeed.length-1] > 0 ? Math.max(...arraySpeed).toFixed(1) : 0 }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Lowest <br> <span class="unit">km/h</span></p></th>
          <td>
            <p class="value">{{ arraySpeed[arraySpeed.length-1] > 0 ? Math.min(...arraySpeed).toFixed(1) : 0 }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Average <br> <span class="unit">km/h</span></p></th>
          <td>
            <p class="value">{{ arraySpeed[arraySpeed.length-1] > 0 ? ((arraySpeed.reduce((a,b) => a+b, 0 ) / arraySpeed.length).toFixed(1)) : 0 }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Bar :data="dataSpeed" :options="optionsSpeed" :style="myStyles"/>
        </div>
      </Tab>
      <Tab title="fa-bed">
        <div class="info-container" v-if="dataMounted">
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Total <br> <span class="unit">hour</span></p></th>
          <td>
            <p class="value bed">{{ sleepToday.totalHour +":0"+ sleepToday.totalMins }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">REM <br> <span class="unit">hour</span></p></th>
          <td>
            <p class="value">{{ sleepToday.remHour +":"+ sleepToday.remMins }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Core <br> <span class="unit">hour</span></p></th>
          <td>
            <p class="value">{{ sleepToday.coreHour +":"+ sleepToday.coreMins }}</p>
          </td></tr></tbody></table>
          <table class="info-comp"><tbody><tr><th>
            <p class="head">Deep <br> <span class="unit">hour</span></p></th>
          <td>
            <p class="value">{{ "0:" + sleepToday.deepMins }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Line :data="dataSleep" :options="optionsSleep" :style="myStyles"/>
        </div>
      </Tab>
    </Tabs>    
    </div>
  </div>
</template>

<style scoped>
.info-container {
  display: grid;
  width: calc(100% - 1rem);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: auto;
  gap: 0.4rem;
}

.info-comp {
  width: 100%;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  margin: 0;
  align-items: center;
  color: var(--black-mute);
}

.graph{
  width: calc(100vw - 13rem);
  margin-left: 0.3rem;
  position: fixed;
  top: 13.5rem;
  padding: 0 1rem 0 0;
}

@media screen and (max-aspect-ratio: 1) {
  .info-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .graph{
    top: 17.2rem;
    width: calc(100vw - 2rem);
  }
}
</style>
