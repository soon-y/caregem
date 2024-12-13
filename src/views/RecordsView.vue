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
import * as heartWeek from '../chart/heartWeek'
import * as heartMonth from '../chart/heartMonth'
import * as heartMonth6 from '../chart/heartMonth6'
import * as heartYear from '../chart/heartYear'
import * as stepsWeek from '../chart/stepsWeek'
import * as stepsMonth from '../chart/stepsMonth'
import * as stepsMonth6 from '../chart/stepsMonth6'
import * as stepsYear from '../chart/stepsYear'
import * as speedWeek from '../chart/speedWeek'
import * as speedMonth from '../chart/speedMonth'
import * as speedMonth6 from '../chart/speedMonth6'
import * as speedYear from '../chart/speedYear'
import * as speedToday from '../chart/speedToday'
import * as sleepWeek from '../chart/sleepWeek'
import * as sleepMonth from '../chart/sleepMonth'
import * as sleepMonth6 from '../chart/sleepMonth6'
import * as sleepYear from '../chart/sleepYear'
import { getRandomNumber } from '../chart/global_label'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, BarElement, CategoryScale, LinearScale)

let dataMounted: boolean = false 
const optionsHeartWeek = heartWeek.options
const optionsHeartMonth = heartMonth.options
const optionsHeartMonth6 = heartMonth6.options
const optionsHeartYear = heartYear.options
const optionsStepsWeek = stepsWeek.options
const optionsStepsMonth = stepsMonth.options
const optionsStepsMonth6 = stepsMonth6.options
const optionsStepsYear = stepsYear.options
const optionsSpeedWeek = speedWeek.options
const optionsSpeedMonth = speedMonth.options
const optionsSpeedMonth6 = speedMonth6.options
const optionsSpeedYear = speedYear.options
const optionsSleepWeek = sleepWeek.options
const optionsSleepMonth = sleepMonth.options
const optionsSleepMonth6 = sleepMonth6.options
const optionsSleepYear = sleepYear.options

const dataHeartWeek = ref<ChartData<'bar'>>({ datasets: [] })
const dataHeartMonth = ref<ChartData<'bar'>>({ datasets: [] })
const dataHeartMonth6 = ref<ChartData<'bar'>>({ datasets: [] })
const dataHeartYear = ref<ChartData<'bar'>>({ datasets: [] })
const dataStepsWeek = ref<ChartData<'bar'>>({ datasets: [] })
const dataStepsMonth = ref<ChartData<'bar'>>({ datasets: [] })
const dataStepsMonth6 = ref<ChartData<'bar'>>({ datasets: [] })
const dataStepsYear = ref<ChartData<'bar'>>({ datasets: [] })
const dataSpeedWeek = ref<ChartData<'bar'>>({ datasets: [] })
const dataSpeedMonth = ref<ChartData<'bar'>>({ datasets: [] })
const dataSpeedMonth6 = ref<ChartData<'bar'>>({ datasets: [] })
const dataSpeedYear = ref<ChartData<'bar'>>({ datasets: [] })
const dataSleepWeek = ref<ChartData<'bar'>>({ datasets: [] })
const dataSleepMonth = ref<ChartData<'bar'>>({ datasets: [] })
const dataSleepMonth6 = ref<ChartData<'bar'>>({ datasets: [] })
const dataSleepYear = ref<ChartData<'bar'>>({ datasets: [] })

const arrayHeartWeek = heartWeek.array()
const arrayHeartMonth = heartMonth.array()
const arrayHeartMonth6 = heartMonth6.array()
const arrayHeartYear = heartYear.array()
const arraySpeedWeek = speedWeek.array()
const arraySpeedMonth = speedMonth.array()
const arraySpeedMonth6 = speedMonth6.array()
const arraySpeedYear = speedYear.array()

let myStyles = {
  height: window.innerWidth/window.innerHeight > 1? `calc(100vh - 14rem)` :  `calc(100vh - 24rem)`,
}

let currentBPM = ref(arrayHeartWeek[arrayHeartWeek.length-1])
const sliderHeart = ref<number>(0);
const sliderStep = ref<number>(0);
const sliderSpeed = ref<number>(0);
const sliderSleep = ref<number>(0);

onMounted(() => {
  dataHeartWeek.value = heartWeek.datasets()
  dataHeartMonth.value = heartMonth.datasets()
  dataHeartMonth6.value = heartMonth6.datasets()
  dataHeartYear.value = heartYear.datasets()
  dataStepsWeek.value = stepsWeek.datasets()
  dataStepsMonth.value = stepsMonth.datasets()
  dataStepsMonth6.value = stepsMonth6.datasets()
  dataStepsYear.value = stepsYear.datasets()
  dataSpeedWeek.value = speedWeek.datasets()
  dataSpeedMonth.value = speedMonth.datasets()
  dataSpeedMonth6.value = speedMonth6.datasets()
  dataSpeedYear.value = speedYear.datasets()
  dataSleepWeek.value = sleepWeek.datasets()
  dataSleepMonth.value = sleepMonth.datasets()
  dataSleepMonth6.value = sleepMonth6.datasets()
  dataSleepYear.value = sleepYear.datasets()
  dataMounted = true

  setInterval(() => {
    currentBPM.value = getRandomNumber(arrayHeartWeek[arrayHeartWeek.length-2],arrayHeartWeek[arrayHeartWeek.length-1])
  }, 5000)
})
</script>

<template>
  <div class="container"> 
    <Tabs>
      <Tab title="heart-pulse">
        <Slider v-model="sliderHeart" class="sliderWrapper" />
        <div v-if="sliderHeart === 0">
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
            <Bar :data="dataHeartWeek" :options="optionsHeartWeek" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderHeart === 1">
        <div class="infoContainer" v-if="dataMounted">
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Current <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value heart-pulse">{{ currentBPM }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Highest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.max(...arrayHeartMonth) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Lowest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.min(...arrayHeartMonth) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Average <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.round(arrayHeartMonth.reduce((a:number, b:number) => a+b, 0 ) / arrayHeartMonth.length) }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Bar :data="dataHeartMonth" :options="optionsHeartMonth" :style="myStyles"/>
        </div>
        </div>
        <div v-if="sliderHeart === 2">
        <div class="infoContainer" v-if="dataMounted">
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Current <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value heart-pulse">{{ currentBPM }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Highest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.max(...arrayHeartMonth6) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Lowest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.min(...arrayHeartMonth6) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Average <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.round(arrayHeartMonth6.reduce((a:number, b:number) => a+b, 0 ) / arrayHeartMonth.length) }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Bar :data="dataHeartMonth6" :options="optionsHeartMonth6" :style="myStyles"/>
        </div>
        </div>
        <div v-if="sliderHeart === 3">
        <div class="infoContainer" v-if="dataMounted">
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Current <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value heart-pulse">{{ currentBPM }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Highest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.max(...arrayHeartYear) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Lowest <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.min(...arrayHeartYear) }}</p>
          </td></tr></tbody></table>
          <table class="infoComp"><tbody><tr><th>
            <p class="head">Average <br> <span class="unit">bpm</span></p></th>
          <td>
            <p class="value">{{ Math.round(arrayHeartYear.reduce((a:number, b:number) => a+b, 0 ) / arrayHeartMonth.length) }}</p>
          </td></tr></tbody></table>
        </div>
        <div class="graph">
          <Bar :data="dataHeartYear" :options="optionsHeartYear" :style="myStyles"/>
        </div>
        </div>
      </Tab>
      <Tab title="shoe-prints">
        <Slider v-model="sliderStep" class="sliderWrapper" />
        <div v-if="sliderStep === 0">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Average <br> <span class="unit">steps</span></p></th>
            <td>
              <p class="value shoe-prints">{{ stepsWeek.avgValue }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Climbed <br> <span class="unit">avg. floor</span></p></th>
            <td>
              <p class="value">{{ stepsWeek.climbed }}</p>
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
            <Bar :data="dataStepsWeek" :options="optionsStepsWeek" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderStep === 1">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Average <br> <span class="unit">steps</span></p></th>
            <td>
              <p class="value shoe-prints">{{ stepsMonth.avgValue }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Climbed <br> <span class="unit">avg. floor</span></p></th>
            <td>
              <p class="value">{{ stepsMonth.climbed }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Distance <br> <span class="unit">avg. km</span></p></th>
            <td>
              <p class="value">{{ stepsMonth.distanceValue }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Active <br> <span class="unit">avg. hour</span></p></th>
            <td>
              <p class="value">{{ stepsMonth.durationHour +":"+ stepsMonth.durationMins }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataStepsMonth" :options="optionsStepsMonth" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderStep === 2">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Average <br> <span class="unit">steps</span></p></th>
            <td>
              <p class="value shoe-prints">{{ stepsMonth6.avgValue }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Climbed <br> <span class="unit">avg. floor</span></p></th>
            <td>
              <p class="value">{{ stepsMonth6.climbed }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Distance <br> <span class="unit">avg. km</span></p></th>
            <td>
              <p class="value">{{ stepsMonth6.distanceValue }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Active <br> <span class="unit">avg. hour</span></p></th>
            <td>
              <p class="value">{{ stepsMonth6.durationHour +":"+ stepsMonth6.durationMins }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataStepsMonth6" :options="optionsStepsMonth6" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderStep === 3">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Average <br> <span class="unit">steps</span></p></th>
            <td>
              <p class="value shoe-prints">{{ stepsYear.avgValue }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Climbed <br> <span class="unit">avg. floor</span></p></th>
            <td>
              <p class="value">{{ stepsYear.climbed }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Distance <br> <span class="unit">avg. km</span></p></th>
            <td>
              <p class="value">{{ stepsYear.distanceValue }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Active <br> <span class="unit">avg. hour</span></p></th>
            <td>
              <p class="value">{{ stepsYear.durationHour +":"+ stepsYear.durationMins }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataStepsYear" :options="optionsStepsYear" :style="myStyles"/>
          </div>
        </div>
      </Tab>
      <Tab title="person-walking-dashed-line-arrow-right">
        <Slider v-model="sliderSpeed" class="sliderWrapper" />
        <div v-if="sliderSpeed === 0">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Latest <br> <span class="unit">km/h</span></p></th>
            <td>
              <p class="value person-walking-dashed-line-arrow-right">{{ speedToday.latest }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Highest <br> <span class="unit">avg. km/h</span></p></th>
            <td>
              <p class="value">{{ Math.max(...arraySpeedWeek).toFixed(1) }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Lowest <br> <span class="unit">avg. km/h</span></p></th>
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
            <Bar :data="dataSpeedWeek" :options="optionsSpeedWeek" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderSpeed === 1">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Latest <br> <span class="unit">km/h</span></p></th>
            <td>
              <p class="value person-walking-dashed-line-arrow-right">{{ speedToday.latest }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Highest <br> <span class="unit">avg. km/h</span></p></th>
            <td>
              <p class="value">{{ Math.max(...arraySpeedMonth).toFixed(1) }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Lowest <br> <span class="unit">avg. km/h</span></p></th>
            <td>
              <p class="value">{{ Math.min(...arraySpeedMonth).toFixed(1) }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Average <br> <span class="unit">km/h</span></p></th>
            <td>
              <p class="value">{{ ((arraySpeedMonth.reduce((a,b) => a+b, 0 ) / arraySpeedMonth.length).toFixed(1)) }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataSpeedMonth" :options="optionsSpeedMonth" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderSpeed === 2">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Latest <br> <span class="unit">km/h</span></p></th>
            <td>
              <p class="value person-walking-dashed-line-arrow-right">{{ speedToday.latest}}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Highest <br> <span class="unit">avg. km/h</span></p></th>
            <td>
              <p class="value">{{ Math.max(...arraySpeedMonth6).toFixed(1) }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Lowest <br> <span class="unit">avg. km/h</span></p></th>
            <td>
              <p class="value">{{ Math.min(...arraySpeedMonth6).toFixed(1) }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Average <br> <span class="unit">km/h</span></p></th>
            <td>
              <p class="value">{{ ((arraySpeedMonth6.reduce((a,b) => a+b, 0 ) / arraySpeedMonth6.length).toFixed(1)) }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataSpeedMonth6" :options="optionsSpeedMonth6" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderSpeed === 3">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Latest <br> <span class="unit">km/h</span></p></th>
            <td>
              <p class="value person-walking-dashed-line-arrow-right">{{ speedToday.latest }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Highest <br> <span class="unit">avg. km/h</span></p></th>
            <td>
              <p class="value">{{ Math.max(...arraySpeedYear).toFixed(1) }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Lowest <br> <span class="unit">avg. km/h</span></p></th>
            <td>
              <p class="value">{{ Math.min(...arraySpeedYear).toFixed(1) }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Average <br> <span class="unit">km/h</span></p></th>
            <td>
              <p class="value">{{ ((arraySpeedYear.reduce((a,b) => a+b, 0 ) / arraySpeedYear.length).toFixed(1)) }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataSpeedYear" :options="optionsSpeedYear" :style="myStyles"/>
          </div>
        </div>
      </Tab>
      <Tab title="bed">
        <Slider v-model="sliderSleep" class="sliderWrapper" />
        <div v-if="sliderSleep === 0">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Total <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value bed">{{ sleepWeek.awakeHour +":"+ sleepWeek.awakeMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">REM <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ sleepWeek.remHour +":"+ sleepWeek.remMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Core <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ sleepWeek.coreHour +":"+ sleepWeek.coreMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Deep <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ "0:" + sleepWeek.deepMins }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataSleepWeek" :options="optionsSleepWeek" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderSleep === 1">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Total <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value bed">{{ sleepMonth.awakeHour +":"+ sleepMonth.awakeMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">REM <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ sleepMonth.remHour +":"+ sleepMonth.remMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Core <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ sleepMonth.coreHour +":"+ sleepMonth.coreMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Deep <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ "0:" + sleepMonth.deepMins }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataSleepMonth" :options="optionsSleepMonth" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderSleep === 2">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Total <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value bed">{{ sleepMonth6.awakeHour +":"+ sleepMonth6.awakeMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">REM <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ sleepMonth6.remHour +":"+ sleepMonth6.remMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Core <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ sleepMonth6.coreHour +":"+ sleepMonth6.coreMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Deep <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ "0:" + sleepMonth6.deepMins }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataSleepMonth6" :options="optionsSleepMonth6" :style="myStyles"/>
          </div>
        </div>
        <div v-if="sliderSleep === 3">
          <div class="infoContainer" v-if="dataMounted">
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Total <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value bed">{{ sleepYear.awakeHour +":"+ sleepYear.awakeMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">REM <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ sleepYear.remHour +":"+ sleepYear.remMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Core <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ sleepYear.coreHour +":"+ sleepYear.coreMins }}</p>
            </td></tr></tbody></table>
            <table class="infoComp"><tbody><tr><th>
              <p class="head">Deep <br> <span class="unit">hour</span></p></th>
            <td>
              <p class="value">{{ "0:" + sleepYear.deepMins }}</p>
            </td></tr></tbody></table>
          </div>
          <div class="graph">
            <Bar :data="dataSleepYear" :options="optionsSleepYear" :style="myStyles"/>
          </div>
        </div>
      </Tab>
    </Tabs>    

  </div>
</template>

<style scoped>
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
  margin: 0.6rem 0;
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

  .infoContainer{
    grid-template-columns: repeat(2, minmax(0, 1fr));
    left: 0;
    top: 3rem;
    width: 100%;
    height: auto;
  }

  .infoComp th {
    width: 4rem;
  }

  .graph{
    width: calc(100vw - 2rem);
    top: 19.2rem;
  }
}
</style>
