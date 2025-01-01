<script setup lang="ts">
import Medication from '../components/Medication.vue'
import { today,week,month,year,weekArrayFull,weekNumInMonth,monthNum,monthArrayFull,date,weekKurz, weekArray, monthArray } from '../chart/global_label'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import Details from './Details.vue'
import * as medication from '../global_array/medicationInfo'
import AddMedicationView from './AddMedicationView.vue'
import { useDataStore } from '../stores/data'
import { ref, watch } from 'vue'
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
import * as pillWeek from '../chart/pillWeek'
import * as pillMonth from '../chart/pillMonth'
import * as pillYear from '../chart/pillYear'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const dataStore = useDataStore()
const optionsMedicationToday = pillToday.options
const optionsMedicationWeek = pillWeek.options
const optionsMedicationMonth = pillMonth.options
const optionsMedicationYear = pillYear.options
const dataMedicationToday = ref<ChartData<'bar'>>({ datasets: [] })
const dataMedicationWeek = ref<ChartData<'bar'>>({ datasets: [] })
const dataMedicationMonth = ref<ChartData<'bar'>>({ datasets: [] })
const dataMedicationYear = ref<ChartData<'bar'>>({ datasets: [] })
const addMedicationRef = ref<InstanceType<typeof AddMedicationView> | null>(null)
const detailsRef = ref<InstanceType<typeof Details> | null>(null)

let myStyles = {
  height: '10rem',
}
const clickedIndex = ref<number | null>(0)

const datasetsToday = () => ({
  labels: today,
  datasets: [
    {
      label: dataStore.data[clickedIndex.value ?? 0].name,
      backgroundColor: medication.backgroundColor[dataStore.data[clickedIndex.value ?? 0].bgColorIndex],
      data: addDataToday(),
    }
  ]
})

const datasetsWeek = () => ({
  labels: week,
  datasets: [
    {
      label: dataStore.data[clickedIndex.value ?? 0].name,
      backgroundColor: medication.backgroundColor[dataStore.data[clickedIndex.value ?? 0].bgColorIndex],
      data: addDataWeek(),
    }
  ]
})

const datasetsMonth = () => ({
  labels: month,
  datasets: [
    {
      label: dataStore.data[clickedIndex.value ?? 0].name,
      backgroundColor: medication.backgroundColor[dataStore.data[clickedIndex.value ?? 0].bgColorIndex],
      data: addDataMonth(),
    }
  ]
})

const datasetsYear = () => ({
  labels: year,
  datasets: [
    {
      label: dataStore.data[clickedIndex.value ?? 0].name,
      backgroundColor: medication.backgroundColor[dataStore.data[clickedIndex.value ?? 0].bgColorIndex],
      data: addDataYear(),
    }
  ]
})

const medicationStyle = ref<{ transform: string }>({
  transform: 'translate(0, 100%)',
})

const enableAddPage = () => {
  medicationStyle.value = { transform: 'translate(0, 0)' }
}

const closeAddPage = () => {
  medicationStyle.value = { transform: 'translate(0, 100%)' }
}

const detailsStyle = ref<{ transform: string }>({
  transform: 'translate(100%, 0)',
})

const addDataToday = () => {
  let array: number[] = []
  for(let i:number = 0; i<24; i++){
    array.push(0)
  }
  if((dataStore.data[clickedIndex.value ?? 0].days.join(',')).includes(weekArray[todayDate.getDay()])){
    for(let j:number = 0; j< dataStore.data[clickedIndex.value ?? 0].application.length; j++){
      array[Number(dataStore.data[clickedIndex.value ?? 0].time[j].split(':')[0])] = dataStore.data[clickedIndex.value ?? 0].application[j]
    }
    return array
  }
}

const addDataWeek = () => {
  let array: number[] = []
  let total: number = dataStore.data[clickedIndex.value ?? 0].application.reduce((a, c) => a + c, 0)
  let startElapsed: number = new Date(
    Number(dataStore.data[clickedIndex.value ?? 0].durationStart.split('/')[2]),
    Number(dataStore.data[clickedIndex.value ?? 0].durationStart.split('/')[1]),
    Number(dataStore.data[clickedIndex.value ?? 0].durationStart.split('/')[0])).getTime()
  let currentElapsed: number = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()).getTime()

  if ((dataStore.data[clickedIndex.value ?? 0].days.join(',')).includes(weekArray[todayDate.getDay()]) && startElapsed <= currentElapsed){
    array.unshift(total) 
  }else {
    array.unshift(0) 
  }

  for(let i:number = 0; i<7-1; i++){
    let currentElapsed: number = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()-1).getTime()
    if((dataStore.data[clickedIndex.value ?? 0].days.join(',')).includes(week[i]) && startElapsed <= currentElapsed){
      array.unshift(total)
    } else {
      array.unshift(0)
    }
  }
  return array
}

const addDataMonth = () => {
  let array: number[] = []
  let total: number = dataStore.data[clickedIndex.value ?? 0].application.reduce((a, c) => a + c, 0)
  let startElapsed: number = new Date(
    Number(dataStore.data[clickedIndex.value ?? 0].durationStart.split('/')[2]),
    Number(dataStore.data[clickedIndex.value ?? 0].durationStart.split('/')[1]),
    Number(dataStore.data[clickedIndex.value ?? 0].durationStart.split('/')[0])).getTime()
  let currentElapsed: number = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()).getTime()

  if ((dataStore.data[clickedIndex.value ?? 0].days.join(',')).includes(weekArray[todayDate.getDay()]) && startElapsed <= currentElapsed){
    array.unshift(total) 
  }else {
    array.unshift(0) 
  }

  for(let i:number = 0; i<month.length-1; i++){
    let currentElapsed: number = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()-1).getTime()
    if (startElapsed <= currentElapsed && (dataStore.data[clickedIndex.value ?? 0].days.join(',')).includes(weekArray[(weekNumInMonth[i])])){
      array.unshift(total) 
    }else {
      array.unshift(0) 
    }
  }
  return array
}

const addDataYear = () => {
  let array: number[] = []
  let total: number = dataStore.data[clickedIndex.value ?? 0].application.reduce((a, c) => a + c, 0)
  let startElapsed: number = new Date(
    Number(dataStore.data[clickedIndex.value ?? 0].durationStart.split('/')[2]),
    Number(dataStore.data[clickedIndex.value ?? 0].durationStart.split('/')[1]),
    Number(dataStore.data[clickedIndex.value ?? 0].durationStart.split('/')[0])).getTime()
  let currentElapsed: number = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()).getTime()

  if (startElapsed <= currentElapsed){
    array.unshift(total)
  }else {
    array.unshift(0) 
  }

  for(let i:number = 0; i<11; i++){
    let currentElapsed: number = new Date(todayDate.getFullYear(), todayDate.getMonth()-1, todayDate.getDate()).getTime()
    if (startElapsed <= currentElapsed){
      array.unshift(total) 
    }else {
      array.unshift(0) 
    }
  }
  return array
}

watch(
  () => addMedicationRef.value?.close, 
  (newValue) => {
    if (newValue == true) {
      closeAddPage()
    }
  },
  { immediate: true }
)

watch(
  () => detailsRef.value?.close, 
  (newValue) => {
    if (newValue == true) {
      closeDetailpage()
      dataStore.deleteArray(clickedIndex.value ?? 0)
      clickedIndex.value = null
      detailsRef.value?.updateClose()
    }
  }
)

const toDetailPage = (index: number) => {
  detailsStyle.value = { transform: 'translate(0, 0)' }
  clickedIndex.value = index
  optionsMedicationToday.scales.y.max = dataStore.data[index].application.reduce((a, c) => a + c, 0)
  optionsMedicationWeek.scales.y.max = dataStore.data[index].application.reduce((a, c) => a + c, 0)
  optionsMedicationMonth.scales.y.max = dataStore.data[index].application.reduce((a, c) => a + c, 0)
  optionsMedicationYear.scales.y.max = dataStore.data[index].application.reduce((a, c) => a + c, 0)

  dataMedicationToday.value = datasetsToday()
  dataMedicationWeek.value = datasetsWeek()
  dataMedicationMonth.value = datasetsMonth()
  dataMedicationYear.value = datasetsYear()
  detailsRef.value?.updateAlldata(index)
}

const closeDetailpage = () => {
  detailsStyle.value = { transform: 'translate(100%, 0)' }
}

const totalNum = () => {
  let num: number = 0
  for(let i:number = 0; i< dataStore.data.length; i++){
    for(let j:number = 0; j< dataStore.data[i].time.length; j++){
      if(dataStore.data[i].schedule.includes('Every') || (dataStore.data[i].days.join(',')).includes(week[selectedDay.value]))
      num++
    }
  }
  return num
}

const takenNum = () => {
  let num: number = 0
  for(let i:number = 0; i < dataStore.data.length; i++){
    for(let j:number = 0; j < dataStore.data[i].time.length; j++){
      if( todayDate.getHours() > Number(dataStore.data[i].time[j].split(':')[0])){
        if(dataStore.data[i].schedule.includes('Every') || (dataStore.data[i].days.join(',')).includes(week[selectedDay.value]))
        num++
      }
    }
  }
  return num
}

const selectedDay = ref<number>(6)
const selectedDate = ref<string>("Today, " + date +'. '+ monthArrayFull[monthNum])
const todayDate = new Date()
const taken = ref<number>((takenNum()/totalNum())*100)

const updateDate = (index: number) => {
  selectedDay.value = index
  const newDate = new Date(todayDate);
  newDate.setDate(todayDate.getDate() - (6 - selectedDay.value))
  const day = selectedDay.value === 6? 'Today' : weekArrayFull[6 - selectedDay.value]
  selectedDate.value = day +', ' + newDate.getDate() +'. '+ monthArrayFull[newDate.getMonth()]
}
</script>

<template>
  <div class="container">
    <div class="scroll-wrapper">
    <div class="top-title-date">
    <p>{{ selectedDate }}</p>
    </div>

    <div class="week-selection-wrapper">
      <div class="week-selection" :style="{ margin: '0.5rem 0' }">
        <div v-for="(item ,index) in weekKurz" :key="index" class="week-item" 
        :style="{ backgroundColor: selectedDay === index? 'var(--white-lila-border)' : 'white',
          color: selectedDay === index? 'white' : 'var(--white-lila-border)'
         }" @click="updateDate(index)">
          <span>{{ item }}</span>
        </div>        
      </div>

      <div class="week-selection">
        <div v-for="(item ,index) in weekKurz" :key="index" class="week-item-amount-container" @click="updateDate(index)">
          <div class="week-item-amount" v-if="index === 6"
            :style="{ height: taken + '%' }"
          ></div>
          <div class="week-item-amount" v-else></div>
        </div>        
      </div>
    </div>

    <div class="week-selection-arrow">
      <div v-for="(item ,index) in weekKurz" :key="index" class="arrow-up"
      :style="{ borderBottom: selectedDay === index? '0.8rem solid var(--white-lila)' : '0.8rem solid white' }">
      </div>        
    </div>
    
    <div class="schedule-wrapper">
      <p class="input-subtitle" :style="{margin:0}"> Log </p>
      <div>
        <div v-for="(item ,index) in dataStore.history" :key="'same' + index" v-if="selectedDay < 6">
          <div v-for="(time, itemIndex) in item.time" :key="itemIndex" v-if="(dataStore.history[index].days.join(',')).includes(week[selectedDay])">
            <span class="check-icon"><font-awesome-icon icon="check" /></span> 
            <span :style="{ display: 'inline-block', width: '7rem'}">{{ item.name }}</span> 
            <span :style="{ display: 'inline-block', width: '1rem'}">{{ item.application[itemIndex] }}</span> 
            <span :style="{ display: 'inline-block', width: '7.4rem'}">application</span> 
            <span :style="{ display: 'inline-block', width: 'calc(100% - 17rem)', textAlign: 'right' }">{{ time }} </span>
          </div>
          <div :style="{ 
            borderBottom: '2px solid var(--white-lila-border)', 
            width: '100%', height: '0.5rem',
            marginBottom: '0.3rem' 
            }" v-if="(index < dataStore.history.length - 1) && (dataStore.history[index+1].days.join(',')).includes(week[selectedDay])">
          </div>
        </div>

        <div v-for="(item, index) in dataStore.data" :key="index" v-if="selectedDay === 6">   
          <div v-for="(time, itemIndex) in item.time" :key="itemIndex" 
          v-if="(dataStore.data[index].days.join(',')).includes(week[selectedDay])">
            <span class="check-icon" v-if="todayDate.getHours() >= Number(time.split(':')[0]) ">
              <font-awesome-icon icon="check" />
            </span> 
            <span :style="{ display: 'inline-block', width: '1.6rem', color: 'var(--white-lila-border)' }" v-else>
              <font-awesome-icon icon="xmark" />
            </span> 
            <span :style="{ display: 'inline-block', width: '7rem'}">{{ item.name }}</span> 
            <span :style="{ display: 'inline-block', width: '1rem'}">{{ item.application[itemIndex] }}</span> 
            <span :style="{ display: 'inline-block', width: '7.4rem'}" v-if=" item.application[itemIndex] === 1 ">application</span> 
            <span :style="{ display: 'inline-block', width: '7.4rem'}" v-else >applications</span> 
            <span :style="{ display: 'inline-block', width: 'calc(100% - 17rem)', textAlign: 'right' }">{{ time }}</span> 
          </div>
          <div :style="{ 
            borderBottom: '2px solid var(--white-lila-border)', 
            width: '100%', height: '0.5rem',
            marginBottom: '0.3rem' 
            }" v-if="(index < dataStore.data.length - 1) && (dataStore.data[index+1].days.join(',')).includes(week[selectedDay])">
          </div>
        </div>
      </div>
    </div>

    <p class="input-subtitle margin-top"> Medications </p>
    <div class="box-wrapper" v-if="dataStore.data.length > 0">
      <Medication v-for="(item ,index) in dataStore.data" :key="index" 
      @click="toDetailPage(index)" :style="{cursor: 'pointer'}"> 
        <template v-slot:image>
          <img v-bind:src="'/pill/'+ item.shape + '_' + item.colorLeft + '_' + item.colorRight +'.png'" 
          :style="{ 'background-color': medication.backgroundColor[item.bgColorIndex] }" />
        </template>
        <template v-slot:name> {{ item.name }} </template>
        <template v-slot:dose> {{ item.strength + item.unit }} </template>
        <template v-slot:schedule v-if="item.schedule.includes('Every Day')"> {{ item.schedule }} </template>
        <template v-slot:schedule v-else> {{ item.days.join(', ') }} </template>
        <template v-slot:time> {{ item.time.join(", ") }} </template>
      </Medication>
    </div>

    <div class="add" @click="enableAddPage">
      <font-awesome-icon icon="fa-plus" class="plus-icon"/>
    </div>
    </div>
  </div>

  <AddMedicationView :style = medicationStyle ref="addMedicationRef">
    <template v-slot:close>
      <font-awesome-icon icon="fa-xmark" @click="closeAddPage"/>
    </template>
  </AddMedicationView>

  <Details :style = detailsStyle ref="detailsRef" :index = clickedIndex v-if="dataStore.data.length > 0">
    <template v-slot:close>
      <font-awesome-icon icon="fa-xmark" @click="closeDetailpage"/>
    </template>
    <template v-slot:name v-if='clickedIndex !== null'> {{ dataStore.data[clickedIndex].name }} </template>

    <template v-slot:tab>
      <Tabs>
        <Tab title="DAY">
        <div class="pill-graph">
          <Bar :data="dataMedicationToday" :options="optionsMedicationToday" :style="myStyles"/>
        </div>
      </Tab>
      <Tab title="WEEK">
        <div class="pill-graph">
          <Bar :data="dataMedicationWeek" :options="optionsMedicationWeek" :style="myStyles"/>
        </div>
      </Tab>
      <Tab title="MONTH">
        <div class="pill-graph">
          <Bar :data="dataMedicationMonth" :options="optionsMedicationMonth" :style="myStyles"/>
        </div>
      </Tab>
      <Tab title="YEAR">
        <div class="pill-graph">
          <Bar :data="dataMedicationYear" :options="optionsMedicationYear" :style="myStyles"/>
        </div>
      </Tab>
    </Tabs>   
    </template>

    <template v-slot:image>
      <img v-if='clickedIndex !== null' v-bind:src="'/pill/'+ dataStore.data[clickedIndex].shape + '_' + dataStore.data[clickedIndex].colorLeft + '_' + dataStore.data[clickedIndex].colorRight +'.png'" 
      :style="{ 'background-color': medication.backgroundColor[dataStore.data[clickedIndex].bgColorIndex] }" />
    </template>

    <template v-if='clickedIndex !== null' v-slot:dose> {{ dataStore.data[clickedIndex].strength + dataStore.data[clickedIndex].unit }} </template>

    <template v-slot:schedule>
      <div v-if="clickedIndex !== null && dataStore.data[clickedIndex].schedule.includes('Every')">
        {{ dataStore.data[clickedIndex].schedule }}
      </div>
      <div v-if="clickedIndex !== null && dataStore.data[clickedIndex].schedule.includes('Specific')">
        {{ dataStore.data[clickedIndex].days.join(", ") }}
      </div>
      <div v-if='clickedIndex !== null' v-for="(time, index) in dataStore.data[clickedIndex].time" :key="index">
        <span :style="{ display: 'inline-block', width: '1rem'}">{{ dataStore.data[clickedIndex].application[index] }}</span> 
        <span :style="{ display: 'inline-block', width: '7rem'}">application</span> 
        <span :style="{ display: 'inline-block', width: 'calc(100% - 8rem)', textAlign: 'right' }">{{ time }}</span> 
      </div>
    </template>
    <template v-slot:scheduleDate>
      <span v-if='clickedIndex !== null' >Started on 
        {{ dataStore.data[clickedIndex].durationStart.split('/')[0] }}
        {{ monthArray[Number(dataStore.data[clickedIndex].durationStart.split('/')[1])] }}
        {{ dataStore.data[clickedIndex].durationStart.split('/')[2] }}
      </span> 
      <span v-if="clickedIndex !== null && dataStore.data[clickedIndex].durationEnd !== ''">, ends 
        {{ dataStore.data[clickedIndex].durationEnd.split('/')[0] }}
        {{ monthArray[Number(dataStore.data[clickedIndex].durationEnd.split('/')[1])] }}
        {{ dataStore.data[clickedIndex].durationEnd.split('/')[2] }}
      </span> 
      <span v-if="clickedIndex !== null && dataStore.data[clickedIndex].durationEnd !== ''">. 
        {{ dataStore.data[clickedIndex].duration }}
        <span v-if="dataStore.data[clickedIndex].duration > 1">days</span>
        <span v-else>day</span>
      </span>
    </template>

    <template v-if='clickedIndex !== null' v-slot:strength> {{ dataStore.data[clickedIndex].strength }} </template>
    <template v-if='clickedIndex !== null' v-slot:unit> {{ dataStore.data[clickedIndex].unit }} </template>
    <template v-if='clickedIndex !== null' v-slot:type> {{ dataStore.data[clickedIndex].type }} </template>
    <template v-if='clickedIndex !== null' v-slot:application> {{ dataStore.data[clickedIndex].application[0] }} application</template>
    <template v-slot:memo v-if="( clickedIndex !== null && dataStore.data[clickedIndex].memo !=='')"> {{ dataStore.data[clickedIndex].memo }} </template>
    <template v-slot:empty v-if="( clickedIndex !== null && dataStore.data[clickedIndex].memo ==='')"> Nothing </template>
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
  grid-template-columns: repeat(2,calc(50% - 0.5rem));
  padding: 0;
  margin-bottom: 4rem;
  gap:1rem
}

.pill-graph{
  width: 100%;
  margin-left: 0.3rem;
  padding: 4rem 1rem 0 1rem;
  display: fixed;
}

.top-title-date {
  margin: 0;
  font-size: 1rem;
  width:100%;
  text-align: center;
}

.top-title-date p{
  font-size: 1.2rem;
  font-weight: 600;
}

.week-selection-wrapper{
  width: 50%;
  margin: auto;
}

.week-selection {
  display: flex;
  justify-content: space-between;
}

.week-item {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: auto;
}

.week-item span{
  margin: auto;
}

.week-item-amount-container {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  outline: 3px solid var(--white-lila-border);
  background-color: var(--white-lila-border);
  margin: auto;
  overflow: hidden;
  display: flex;
  align-items: end;
}

.week-item-amount {
  background-color: var(--main-lila-hell);
  width: 100%;
  height: 100%;
}


.week-selection-arrow {
  margin: auto;
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem
}

.arrow-up {
  margin: auto;
  width: 0; 
  height: 0; 
  border-left: 0.6rem solid transparent;
  border-right: 0.6rem solid transparent;
}


@media screen and (max-aspect-ratio: 1) {
  .add{
    bottom: 5rem;
  }

  .box-wrapper{
    grid-template-columns: 100%;
  }

  .week-selection-arrow,
  .week-selection-wrapper{
    width: 100%;
  }
}
</style>
