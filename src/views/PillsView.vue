<script setup lang="ts">
import Medication from '../components/Medication.vue'
import { today,week,month,year,weekArrayFull,weekNum,weekNumInMonth,monthNum,monthArrayFull,date,weekKurz, weekArray } from '../chart/global_label'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import Details from './Details.vue'
import * as medication from '../global_array/medicationInfo'
import AddMedicationView from './AddMedicationView.vue'
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

const optionsMedicationToday = pillToday.options
const optionsMedicationWeek = pillWeek.options
const optionsMedicationMonth = pillMonth.options
const optionsMedicationYear = pillYear.options
const dataMedicationToday = ref<ChartData<'bar'>>({ datasets: [] })
const dataMedicationWeek = ref<ChartData<'bar'>>({ datasets: [] })
const dataMedicationMonth = ref<ChartData<'bar'>>({ datasets: [] })
const dataMedicationYear = ref<ChartData<'bar'>>({ datasets: [] })
const addMedicationRef = ref<InstanceType<typeof AddMedicationView> | null>(null)

let myStyles = {
  height: '10rem',
}
const clickedIndex = ref<number>(0)

const datasetsToday = () => ({
  labels: today,
  datasets: [
    {
      label: medication.data[clickedIndex.value].name,
      backgroundColor: medication.backgroundColor[medication.data[clickedIndex.value].bgColorIndex],
      data: addDataToday(),
    }
  ]
})

const datasetsWeek = () => ({
  labels: week,
  datasets: [
    {
      label: medication.data[clickedIndex.value].name,
      backgroundColor: medication.backgroundColor[medication.data[clickedIndex.value].bgColorIndex],
      data: addDataWeek(),
    }
  ]
})

const datasetsMonth = () => ({
  labels: month,
  datasets: [
    {
      label: medication.data[clickedIndex.value].name,
      backgroundColor: medication.backgroundColor[medication.data[clickedIndex.value].bgColorIndex],
      data: addDataMonth(),
    }
  ]
})

const datasetsYear = () => ({
  labels: year,
  datasets: [
    {
      label: medication.data[clickedIndex.value].name,
      backgroundColor: medication.backgroundColor[medication.data[clickedIndex.value].bgColorIndex],
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
  for(let j:number = 0; j< medication.data[clickedIndex.value].application.length; j++){
    array[Number(medication.data[clickedIndex.value].time[j].split(':')[0])] = medication.data[clickedIndex.value].application[j]
  }
  return array
}

const addDataWeek = () => {
  let array: number[] = []
  let total: number = medication.data[clickedIndex.value].application.reduce((a, c) => a + c, 0)
  for(let i:number = 0; i<7; i++){
    if((medication.data[clickedIndex.value].days.join(',')).includes(week[i])){
      array.push(total)
    } else {
      array.push(0)
    }
  }
  return array
}

const addDataMonth = () => {
  let array: number[] = []
  let total: number = medication.data[clickedIndex.value].application.reduce((a, c) => a + c, 0)
  for(let i:number = 0; i < month.length; i++){
    if((medication.data[clickedIndex.value].days.join(',')).includes(weekArray[(weekNumInMonth[i])])){
      array.push(total)
    } else {
      array.push(0)
    }
  }
  return array
}

const addDataYear = () => {
  let array: number[] = []
  let total: number = medication.data[clickedIndex.value].application.reduce((a, c) => a + c, 0)
  for(let i:number = 0; i<12; i++){
      array.push(total) 
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

const toDetailPage = (index: number) => {
  detailsStyle.value = { transform: 'translate(0, 0)' };
  clickedIndex.value = index
  optionsMedicationToday.scales.y.max = medication.data[index].application.reduce((a, c) => a + c, 0)
  optionsMedicationWeek.scales.y.max = medication.data[index].application.reduce((a, c) => a + c, 0)
  optionsMedicationMonth.scales.y.max = medication.data[index].application.reduce((a, c) => a + c, 0)
  optionsMedicationYear.scales.y.max = medication.data[index].application.reduce((a, c) => a + c, 0)

  dataMedicationToday.value = datasetsToday()
  dataMedicationWeek.value = datasetsWeek()
  dataMedicationMonth.value = datasetsMonth()
  dataMedicationYear.value = datasetsYear()
}

const closeDetailpage = () => {
  detailsStyle.value = { transform: 'translate(100%, 0)' };
}

const totalNum = () => {
  let num: number = 0
  for(let i:number = 0; i< medication.data.length; i++){
    for(let j:number = 0; j< medication.data[i].time.length; j++){
      if(medication.data[i].schedule.includes('Every') || (medication.data[i].days.join(',')).includes(week[selectedDay.value]))
      num++
    }
  }
  return num
}

const takenNum = () => {
  let num: number = 0
  for(let i:number = 0; i < medication.data.length; i++){
    for(let j:number = 0; j < medication.data[i].time.length; j++){
      if( todayDate.getHours() > Number(medication.data[i].time[j].split(':')[0])){
        if(medication.data[i].schedule.includes('Every') || (medication.data[i].days.join(',')).includes(week[selectedDay.value]))
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
      <p class="input-subtitle"> Log </p>
      <div>
        <div v-for="(item ,index) in medication.data" :key="'same' + index" v-if="selectedDay < 6">   
          <div v-for="(time, itemIndex) in item.time" :key="itemIndex" v-if="medication.data[index].schedule.includes('Every') || (medication.data[index].days.join(',')).includes(week[selectedDay])">
            <span :style="{ display: 'inline-block', width: '1.6rem', color: 'var(--main-lila-hell)' }"><font-awesome-icon icon="check" /></span> 
            <span :style="{ display: 'inline-block', width: '7rem'}">{{ item.name }}</span> 
            <span :style="{ display: 'inline-block', width: '1rem'}">{{ item.application[itemIndex] }}</span> 
            <span :style="{ display: 'inline-block', width: '7.4rem'}">application</span> 
            <span :style="{ display: 'inline-block', width: 'calc(100% - 17rem)', textAlign: 'right' }">{{ time }}</span> 
          </div>
        </div>

        <div v-for="(item ,index) in medication.data" :key="index" v-if="selectedDay === 6">   
          <div v-for="(time, itemIndex) in item.time" :key="itemIndex" v-if="medication.data[index].schedule.includes('Every') || (medication.data[index].days.join(',')).includes(week[selectedDay])">
            <span :style="{ display: 'inline-block', width: '1.6rem', color: 'var(--main-lila-hell)'}" v-if="todayDate.getHours() > Number(time.split(':')[0]) ">
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
        </div>
      </div>
    </div>

    <p class="input-subtitle margin-top"> Medications </p>
    <div class="box-wrapper">
      <Medication v-for="(item ,index) in medication.data" :key="index" 
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

  <Details :style = detailsStyle>
    <template v-slot:close>
      <font-awesome-icon icon="fa-xmark" @click="closeDetailpage"/>
    </template>
    <template v-slot:name> {{ medication.data[clickedIndex].name }} </template>

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
      <img v-bind:src="'/pill/'+ medication.data[clickedIndex].shape + '_' + medication.data[clickedIndex].colorLeft + '_' + medication.data[clickedIndex].colorRight +'.png'" 
      :style="{ 'background-color': medication.backgroundColor[medication.data[clickedIndex].bgColorIndex] }" />
    </template>

    <template v-slot:dose> {{ medication.data[clickedIndex].strength + medication.data[clickedIndex].unit }} </template>

    <template v-slot:schedule>
      <div v-if="medication.data[clickedIndex].schedule.includes('Every')">
        {{ medication.data[clickedIndex].schedule }}
      </div>
      <div v-else>
        {{ medication.data[clickedIndex].days.join(", ") }}
      </div>
      <div v-for="(time, index) in medication.data[clickedIndex].time" :key="index">
        <span :style="{ display: 'inline-block', width: '1rem'}">{{ medication.data[clickedIndex].application[index] }}</span> 
        <span :style="{ display: 'inline-block', width: '7rem'}">application</span> 
        <span :style="{ display: 'inline-block', width: 'calc(100% - 8rem)', textAlign: 'right' }">{{ time }}</span> 
      </div>
    </template>
    <template v-slot:scheduleDate>
      <span>Started on {{ medication.data[clickedIndex].durationStart }}</span> 
      <span v-if="medication.data[clickedIndex].durationEnd !== ''">. Schedule ends {{ medication.data[clickedIndex].durationEnd }}</span> 
    </template>

    <template v-slot:strength> {{ medication.data[clickedIndex].strength }} </template>
    <template v-slot:unit> {{ medication.data[clickedIndex].unit }} </template>
    <template v-slot:type> {{ medication.data[clickedIndex].type }} </template>
    <template v-slot:application> {{ medication.data[clickedIndex].application[0] }} application</template>
    <template v-slot:memo v-if="medication.data[clickedIndex].memo ===''"> {{ medication.data[clickedIndex].memo }} </template>
    <template v-slot:empty v-else"> Nothing </template>
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
