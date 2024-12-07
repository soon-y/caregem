<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import Slider from '../components/Slider.vue'
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
import * as heartWeek from '../chart/heartWeek'
import * as stepsWeek from '../chart/stepsWeek'
import * as speedWeek from '../chart/speedWeek'
import * as sleepToday from '../chart/sleepToday'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, BarElement, CategoryScale, LinearScale)

let dataMounted: boolean = false 
const optionsHeart = heartWeek.options
const optionsSteps = stepsWeek.options
const optionsSpeed = speedWeek.options
const optionsSleep = sleepToday.options
const dataHeart = ref<ChartData<'bar'>>({ datasets: [] })
const dataSteps = ref<ChartData<'bar'>>({ datasets: [] })
const dataSpeed = ref<ChartData<'bar'>>({ datasets: [] })
const dataSleep = ref<ChartData<'line'>>({ datasets: [] })
const arrayHeartWeek = heartWeek.array()
const arraySpeedWeek = speedWeek.arrayflat()

let myStyles = {
  height: window.innerWidth/window.innerHeight > 1? `calc(100vh - 14rem)` :  `calc(100vh - 25rem)`,
}

let currentBPM = ref(arrayHeartWeek[arrayHeartWeek.length-1])
const sliderValue = ref<number>(0);

onMounted(() => {
  dataHeart.value = heartWeek.datasets()
  dataSteps.value = stepsWeek.datasets()
  dataSpeed.value = speedWeek.datasets()
  dataSleep.value = sleepToday.datasets()
  dataMounted = true

  setInterval(() => {
    currentBPM.value = heartWeek.getRandomNumber(arrayHeartWeek[arrayHeartWeek.length-2],arrayHeartWeek[arrayHeartWeek.length-1])
  }, 5000)
})

</script>

<template>
  <div class="container"> 
    <Tabs>
      <Tab title="heart-pulse">
        <Slider v-model="sliderValue" class="sliderWrapper" />
        <div class="infoContainer" v-if="dataMounted">
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Current <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value heart-pulse">{{ currentBPM }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Highest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.max(...arrayHeartWeek) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Lowest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.min(...arrayHeartWeek) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Average <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.round(arrayHeartWeek.reduce((a:number, b:number) => a+b, 0 ) / arrayHeartWeek.length) }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Bar :data="dataHeart" :options="optionsHeart" :style="myStyles"/>
        </div>
      </Tab>
      <Tab title="shoe-prints">
        <Slider v-model="sliderValue" class="sliderWrapper" />
        <div class="infoContainer" v-if="dataMounted">
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Average <br> <span class="unit">steps</span></p></th>
          <td>
            <p class="value shoe-prints">{{ stepsWeek.avgValue }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Climbed <br> <span class="unit">avg. floor</span></p></th>
          <td>
            <p class="value">{{ stepsWeek.getRandomNumber(1,10) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Distance <br> <span class="unit">avg. km</span></p></th>
          <td>
            <p class="value">{{ stepsWeek.distanceValue }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Active <br> <span class="unit">avg. hour</span></p></th>
          <td>
            <p class="value">{{ stepsWeek.durationHour +":"+ stepsWeek.durationMins }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Bar :data="dataSteps" :options="optionsSteps" :style="myStyles"/>
        </div>
      </Tab>
      <Tab title="person-walking-dashed-line-arrow-right">
        <Slider v-model="sliderValue" class="sliderWrapper" />
        <div class="infoContainer" v-if="dataMounted">
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Latest <br> <span class="unit">km/h</span></p></th>
          <td>
            <p class="value person-walking-dashed-line-arrow-right">{{ (arraySpeedWeek[arraySpeedWeek.length-1]).toFixed(1) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Highest <br> <span class="unit">km/h</span></p></th>
          <td>
            <p class="value">{{ Math.max(...arraySpeedWeek).toFixed(1) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Lowest <br> <span class="unit">km/h</span></p></th>
          <td>
            <p class="value">{{ Math.min(...arraySpeedWeek).toFixed(1) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Average <br> <span class="unit">km/h</span></p></th>
          <td>
            <p class="value">{{ ((arraySpeedWeek.reduce((a,b) => a+b, 0 ) / arraySpeedWeek.length).toFixed(1)) }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Bar :data="dataSpeed" :options="optionsSpeed" :style="myStyles"/>
        </div>
      </Tab>
      <Tab title="bed">
        <Slider v-model="sliderValue" class="sliderWrapper" />
        <div class="infoContainer" v-if="dataMounted">
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Total <br> <span class="unit">hour</span></p></th>
          <td>
            <p class="value bed">{{ sleepToday.totalHour +":0"+ sleepToday.totalMins }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">REM <br> <span class="unit">hour</span></p></th>
          <td>
            <p class="value">{{ sleepToday.remHour +":"+ sleepToday.remMins }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Core <br> <span class="unit">hour</span></p></th>
          <td>
            <p class="value">{{ sleepToday.coreHour +":"+ sleepToday.coreMins }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
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
</template>

<style scoped>
.container {
  width: calc(100vw - 10rem);
  height: 100vh;
  position: relative;
  left: 10rem;
}

.sliderWrapper {
  width: calc(100% - 1.5rem);
  position: absolute;
}

.infoContainer {
  position: relative;
  left: 75%;
  top: 8rem;
  display: grid;
  width: 25%;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  margin: 0.6rem 0
}

.infoComp {
  width: 100%;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  margin: 0 0.4rem;
  align-items: center;
  color: var(--black-mute)
}

.infoComp th {
  text-align: left;
  width: 5rem;
}

.infoComp .head{
  font-weight: 600; 
  line-height: 1rem;
}

.infoComp .unit{
  font-size: 0.8rem;
  margin-left: 1px;
}

.infoComp .value{
  font-weight: 600; 
  font-size: 2.4rem;
  margin: 0
}

.graph{
  width: 73%;
  margin-left: 0.3rem;
  position: absolute;
  top: 12rem;
  padding: 0 1rem 0 0;
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

@media screen and (max-aspect-ratio: 1) {
  .container {
    width: 100vw;
    content: '';
    position: fixed;
    background-color: var(--line-color);
    z-index: 1;
    height: calc(100vh - 4rem);
    left: 0;
  }

  .infoContainer{
    grid-template-columns: repeat(2, minmax(0, 1fr));
    left: 0;
    top: 39rem;
    width: 100%;
  }

  .infoComp th {
    width: 4rem;
  }

  .graph{
    width: calc(100vw - 2rem);
    top: 13rem;
  }
}
</style>
