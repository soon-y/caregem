<script setup lang="ts">
import { useDataStore } from '../stores/data'
import { ref, watch } from 'vue'
import setSchedule from './SetSchedule.vue'
import { weekArray,monthArray } from '../chart/global_label'

const dataStore = useDataStore()
const today = new Date()
const todayElapsed = today.getTime()
const scheduleRef = ref<InstanceType<typeof setSchedule> | null>(null)
const props = defineProps<{index: number | null}>()
const edit = ref<boolean>(false)
const clickedIndex = ref<number | null>(props.index) 
const close = ref<boolean>(false)
const allDataStyle = ref<{ transform: string }>({ transform: 'translate(100%, 0)'})
const scheduleStyle = ref<{ transform: string }>({transform: 'translate(100%, 0)'})
watch(() => props.index, (newVal) => {
  clickedIndex.value = newVal
})

export interface allDataType { date: string, time: string, checked: boolean }
const allData = ref<allDataType[]>([])

const updateAlldata = (index: number) => {
  allData.value = []
  let startElapsed: number = new Date(
    Number(dataStore.data[index].durationStart.split('/')[2]),
    Number(dataStore.data[index].durationStart.split('/')[1]),
    Number(dataStore.data[index].durationStart.split('/')[0])).getTime()
  let duration = (todayElapsed - startElapsed)/(1000 * 3600 * 24)
  let todayDate = new Date()

  for(let j:number = 0; j < dataStore.data[index].time.length; j++  ){
    if( dataStore.data[index].days.join(' ').includes(weekArray[todayDate.getDay()]) ){
      let d = 
      { 
        date: todayDate.getDate() + ' ' + monthArray[todayDate.getMonth()] + ' ' + todayDate.getFullYear(),
        time: dataStore.data[index].time[j],
        checked: todayDate.getHours() >= Number(dataStore.data[index].time[j].split(':')[0]) ? true : false
      }
      allData.value.push(d)
    }
  }
  for(let i:number = 0; i < duration-1; i++  ){
    todayDate.setDate(todayDate.getDate() - 1)
      for(let j:number = 0; j < dataStore.data[index].time.length; j++  ){
        if( dataStore.data[index].days.join(' ').includes(weekArray[todayDate.getDay()]) ){
        let d = 
        { 
          date: todayDate.getDate() + ' ' + monthArray[todayDate.getMonth()] + ' ' + todayDate.getFullYear(),
          time: dataStore.data[index].time[j],
          checked: true 
        }
        allData.value.push(d)
      }
    }
  }
}

const showAllData = () => {
  allDataStyle.value = { transform: 'translate(0, 0)' }
}

const closeAllData = () => {
  allDataStyle.value = { transform: 'translate(100%, 0)' }
}

const editSchedule = () => {
  scheduleStyle.value = { transform: 'translate(0, 0)' }
  edit.value= true
}

const closeSchedule = () => {
  scheduleStyle.value = { transform: 'translate(100%, 0)' }
  edit.value= false
}

const deleteData = () => {
  close.value = true
}

const updateClose  = () => {
  close.value = false
}

const updateData = () =>{
  closeSchedule()
  if(clickedIndex.value !== null && scheduleRef.value){
    const timeArray: string[] = []
    const applicationArray: number[] = []
    let selectedDays:string[] = []

    scheduleRef.value?.schedule.map(item => {
      const hour = item.hour;
      const min = item.min.toString().padStart(2, '0')
      timeArray.push(`${hour}:${min}`)
    })

    scheduleRef.value?.schedule.map(item => {
      const application = item.application;
      applicationArray.push(application)
    })

    if(scheduleRef.value?.selectedSchedule?.includes('Specific')) {
      scheduleRef.value.week.forEach((label, index) => {
        if (label.checked) {
          if (index === 0 ){ selectedDays.push('Mon')}
          if (index === 1 ){ selectedDays.push('Tue')}
          if (index === 2 ){ selectedDays.push('Wed')}
          if (index === 3 ){ selectedDays.push('Thu')}
          if (index === 4 ){ selectedDays.push('Fri')}
          if (index === 5 ){ selectedDays.push('Sat')}
          if (index === 6 ){ selectedDays.push('Sun')}
        }
      })
    } else {
      selectedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }
    dataStore.data[clickedIndex.value].schedule = scheduleRef.value?.selectedSchedule ?? ""
    dataStore.data[clickedIndex.value].days = selectedDays
    dataStore.data[clickedIndex.value].time = timeArray
    dataStore.data[clickedIndex.value].application = applicationArray
    dataStore.data[clickedIndex.value].durationStart = scheduleRef.value?.startDate+'/'+scheduleRef.value?.startMonth+'/'+scheduleRef.value?.startYear
    dataStore.data[clickedIndex.value].durationEnd = scheduleRef.value?.endDate === null? "" : scheduleRef.value?.endDate+'/'+scheduleRef.value?.endMonth+'/'+scheduleRef.value?.endYear
    dataStore.data[clickedIndex.value].duration = scheduleRef.value?.duration ?? 0
  }
}

defineExpose({ close, updateAlldata, updateClose })
</script>

<template>
  <div class="container-full">
    <div class="fixed">
        <span class="closeIcon topIcon"><slot name="close"></slot></span>
        <span class="top-title" :style="{marginTop:'1rem'}"><slot name="name"></slot></span>
    </div>

    <div class="scroll-wrapper-full">
    <div class="content-wrapper">
      <div class="tabs">
        <slot name="tab"></slot>
      </div>

      <p class="input-subtitle margin-top">Schedule </p>
      <div class="schedule-wrapper">
        <div><slot name="schedule"></slot></div>
        <div :style="{ 
          color: 'var(--main-lila-hell)', cursor:'pointer', 
          borderTop: '2px solid var(--white-lila-border)', paddingTop: '0.4rem', marginTop: '0.5rem' }" 
        @click="editSchedule">Edit</div>
      </div>
      <div class="scheduleDate"><slot name="scheduleDate"></slot></div>

      <p class="input-subtitle margin-top">Details </p>
      <div class="box">
        <slot name="image"></slot>
        <div class="box-text">
          <div class="box-name"><slot name="name"></slot></div>
          <div><slot name="type"></slot></div>
          <div><slot name="strength"></slot> <slot name="unit"></slot></div>
        </div>
      </div>

      <p class="input-subtitle margin-top">Memo </p>
      <div class="schedule-wrapper" :style=" { minHeight: '6rem' }">
        <slot name="memo"></slot>
        <span :style="{ color: 'var(--white-lila-border)' }"><slot name="empty"></slot></span>
      </div>

      <button @click="showAllData"
      class="button"  :style="{ margin: '1rem 0', backgroundColor: 'var(--white-lila)', color: 'var(--main-lila-hell)' }">
        Show All data
      </button>
      <button @click="deleteData"
      class="button"  :style="{ margin: '0 0 5rem 0', backgroundColor: 'var(--white-lila)', color: 'var(--main-lila-hell)' }">
        Delete Medication
      </button>  
    
      </div>
    </div>

    <div class="container-full" :style="scheduleStyle">
      <span class="top-title">Edit Schedule</span>
      <span class="closeIcon topIcon">
        <font-awesome-icon icon="fa-xmark" @click="closeSchedule"/>
      </span>
      <div class="content-wrapper" :style="{margin: '4rem auto'}">
        <setSchedule ref="scheduleRef"
        :index="clickedIndex ?? 0"
        :edit=edit
        ></setSchedule>
        <button class="button" @click="updateData" :disabled="!(scheduleRef?.valid)"
        :style="{
          backgroundColor: !(scheduleRef?.valid) ? 'var(--divider-light-2)' : 'var(--main-lila-hell)',
          color: !(scheduleRef?.valid) ? 'var(--divider-light-1)' : 'white'
          }">Done</button>
      </div>
    </div>

    <div class="container-full" :style="allDataStyle">
      <span class="top-title">All Recorded Data</span>
      <span class="closeIcon topIcon">
        <font-awesome-icon icon="fa-xmark" @click="closeAllData"/>
      </span>
      <div class="scroll-wrapper-full" :style="{margin: '3rem auto'}">
        <div class="table-wrapper" :style="{marginBottom: '3rem'}">
          <table>
            <tbody>
              <tr v-for="(item, index) in allData" :key="index" :value="item">
                <td>
                  <span v-if="item.checked"><font-awesome-icon icon="check" class="check-icon"/>Taken</span>
                  <span v-else><font-awesome-icon icon="xmark" class="check-icon"/>Not Taken</span>
                </td>
                <td :style="{color: 'var(--white-lila-dunkel)'}">{{ item.date }} at {{ item.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
.box-name{
  margin-bottom: 0.4rem;
}

.schedule-wrapper{
  padding: 0.6rem 1rem;
}

.scheduleDate{
  color: var(--white-lila-border);
  margin: 0.6rem 1rem 0 1rem;
  line-height: 1rem;
}

@media screen and (max-aspect-ratio: 1) {
}
</style>