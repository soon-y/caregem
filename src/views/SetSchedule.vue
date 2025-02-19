<script setup lang="ts">
import * as medication from '../global_array/medicationInfo'
import { monthArray } from '../chart/global_label'
import TimePicker from '../components/TimePicker.vue'
import Calendar from '../components/Calendar.vue'
import { ref, watch } from 'vue'
import { useDataStore } from '../stores/data'

const props = defineProps<{
  index: number
  edit: boolean
}>()
const dataStore = useDataStore()
const now = new Date()
const selectedSchedule = ref<string>(medication.schedule[0])
const selectedInterval = ref<string | null>(medication.intervalDays[0])
const modelOpened = ref<boolean>(false)
const today = new Date()
export interface weekItemType { label: string, checked: boolean }
const week = ref<weekItemType[]>([
  { label: 'M', checked: false },
  { label: 'T', checked: false },
  { label: 'W', checked: false },
  { label: 'T', checked: false },
  { label: 'F', checked: false },
  { label: 'S', checked: false },
  { label: 'S', checked: false }, 
])
const timePickerRef = ref<InstanceType<typeof TimePicker> | null>(null)
const calendarStartRef = ref<InstanceType<typeof Calendar> | null>(null)
const calendarEndRef = ref<InstanceType<typeof Calendar> | null>(null)
const startDate = ref<number>(today.getDate())
const startMonth = ref<number>(today.getMonth())
const startYear = ref<number>(today.getFullYear())
const endDate = ref<number|null>(null)
const endMonth = ref<number>(startMonth.value)
const endYear = ref<number>(startYear.value)
const startElapsed = ref<number>(new Date(startYear.value, startMonth.value, startDate.value).getTime())
const endElapsed = ref<number>(0)
const scheduleIndex = ref<number>(0)
const calendarStartDisplay = ref<string>('none')
const calendarEndDisplay = ref<string>('none')
const timePickerDisplay = ref<string>('none')
const valid = ref<boolean>(true)
const duration = ref<number>(0)
export interface ScheduleItem {
  hour: number
  min: number
  application: number
}

const schedule = ref<ScheduleItem[]>([
  { hour: now.getHours(), min: 0, application: 1 },
])

const addNewTime = () => {
  let data = { hour: now.getHours(), min: 0, application: 1 }
  if (schedule.value.length > 0) {
    data.hour = schedule.value[schedule.value.length-1].hour + 1 > 23 ? 0 : schedule.value[schedule.value.length-1].hour + 1
    data.min = schedule.value[schedule.value.length-1].min
  }  
  schedule.value.push(data)
  valid.value = true
}

const deleteSchedule = (index : number) => {
  schedule.value.splice(index, 1)
  if (schedule.value.length == 0) {
    valid.value = false
  }
}

const displayTimePicker = (index: number) => {
  timePickerDisplay.value = 'block'
  scheduleIndex.value = index
  modelOpened.value = true
}

const closeTimePicker = () => {
  timePickerDisplay.value = 'none'
  modelOpened.value = false
  if(timePickerRef.value){
    schedule.value[scheduleIndex.value].hour = timePickerRef.value.finalHour
    schedule.value[scheduleIndex.value].min = timePickerRef.value.finalMin
  }
}

const displayCalendarStart = () => {
  calendarStartDisplay.value = 'block'
  modelOpened.value = true
}

const closeCalendarStart = () => {
  calendarStartDisplay.value = 'none'
  modelOpened.value = false
  if(calendarStartRef.value){
    startDate.value = calendarStartRef.value.selectedDate
    startMonth.value = calendarStartRef.value.month
    startYear.value = calendarStartRef.value.year
    const d = new Date(startYear.value, startMonth.value, startDate.value)
    startElapsed.value = d.getTime()

    if(endDate.value !== null){
      if(startElapsed.value > endElapsed.value){
      endDate.value = startDate.value 
      endMonth.value = startMonth.value 
      endYear.value = startYear.value
      endElapsed.value = d.getTime()
      }
      duration.value = Math.ceil((endElapsed.value - startElapsed.value)/(1000 * 3600 * 24))+1
    }
  }
}

const displayCalendarEnd = () => {
  calendarEndDisplay.value = 'block'
  modelOpened.value = true
}

const closeCalendarEnd = () => {
  calendarEndDisplay.value = 'none'
  modelOpened.value = false
  if(calendarEndRef.value){
    endDate.value = calendarEndRef.value.selectedDate
    endMonth.value = calendarEndRef.value.month
    endYear.value = calendarEndRef.value.year
    const d = new Date(endYear.value, endMonth.value, endDate.value)
    endElapsed.value = d.getTime()
    duration.value = Math.ceil((endElapsed.value - startElapsed.value)/(1000 * 3600 * 24))+1
  }
}

const deleteDate = () => {
    endDate.value = null
}

const reset = () => {
  startDate.value = today.getDate()
  startMonth.value = today.getMonth()
  startYear.value = today.getFullYear()
  endDate.value = null
  startElapsed.value = (new Date(startYear.value, startMonth.value, startDate.value).getTime())
  endElapsed.value = 0
  scheduleIndex.value = 0
  valid.value = true
  duration.value = 0
  selectedSchedule.value = medication.schedule[0]
  week.value.forEach((el) => {
    el.checked = false
  })
  schedule.value = [{ hour: now.getHours(), min: 0, application: 1 }]
}

watch(selectedSchedule, (newVal) => {if (newVal) {updateSchedule()}})
watch(week.value, (newVal) => {if (newVal) {updateValid()}})

const updateSchedule = () => {
  if(selectedSchedule?.value?.includes('Specific')){
    valid.value = false
  } else {
    valid.value = true
  }
}

const updateValid = () => {
  valid.value = false
  for(let i:number = 0; i<week.value.length; i++){
    if(week.value[i].checked === true){
      valid.value = true
    }
  }
}

const updateInitialValue = () => {
  selectedSchedule.value = dataStore.data[props.index].schedule
  startDate.value = Number(dataStore.data[props.index].durationStart.split('/')[0])
  startMonth.value = Number(dataStore.data[props.index].durationStart.split('/')[1])
  startYear.value = Number(dataStore.data[props.index].durationStart.split('/')[2])
  endDate.value = dataStore.data[props.index].durationEnd.split('/')[0] === "" ? null : Number(dataStore.data[props.index].durationEnd.split('/')[0])
  endMonth.value = Number(dataStore.data[props.index].durationEnd.split('/')[1])
  endYear.value = Number(dataStore.data[props.index].durationEnd.split('/')[2])
  startElapsed.value = new Date(startYear.value, startMonth.value, startDate.value).getTime()
  endElapsed.value = endDate.value === null ? 0 : new Date(endYear.value, endMonth.value, endDate.value).getTime()
  duration.value = dataStore.data[props.index].duration

  schedule.value = []
  for(let i:number = 0; i < dataStore.data[props.index].time.length; i++){
    let hour = Number(dataStore.data[props.index].time[i].split(':')[0])
    let min = Number(dataStore.data[props.index].time[i].split(':')[1])
    let application = dataStore.data[props.index].application[i]
    let d = { hour: hour, min: min, application: application }
    schedule.value.push(d)
  }

  if(selectedSchedule.value == medication.schedule[1]){
    for(let i:number = 0; i < dataStore.data[props.index].days.length; i++){
      if(dataStore.data[props.index].days[i] === 'Mon'){
        week.value[0].checked = true
      } else if(dataStore.data[props.index].days[i] === 'Tue'){
        week.value[1].checked = true
      } else if(dataStore.data[props.index].days[i] === 'Wed'){
        week.value[2].checked = true
      } else if(dataStore.data[props.index].days[i] === 'Thu'){
        week.value[3].checked = true
      } else if(dataStore.data[props.index].days[i] === 'Fri'){
        week.value[4].checked = true
      } else if(dataStore.data[props.index].days[i] === 'Sat'){
        week.value[5].checked = true
      } else if(dataStore.data[props.index].days[i] === 'Sun'){
        week.value[6].checked = true
      }
    }
  }
}

watch(() => props.edit, (newVal) => {
    if (newVal == true) { 
      updateInitialValue()
    }
  },
  { immediate: true }
)

const validateApplication = (item: { application: number | null }) => {
  if (item.application === 0 || item.application === null || isNaN(Number(item.application)) || item.application.toString() === '' ) {
    item.application = 1
  }
}

defineExpose({ modelOpened,schedule,selectedSchedule,week,valid,startDate,startMonth,startYear,endDate,endMonth,endYear,duration,reset })
</script>

<template>
<div v-if="!modelOpened">
<p class="input-subtitle">When will you take this? </p>
<select v-model="selectedSchedule">
  <option v-for="(item, index) in medication.schedule" :key="index" :value="item">
    {{ item }}
  </option>
</select>

<div v-if="(selectedSchedule === medication.schedule[1])">
  <p class="input-subtitle margin-top">On these days:</p>
  <div class="week-wrapper">
    <div v-for="(item, index) in week" :key="index" class="week-div"
    :style="{
      backgroundColor: item.checked ? 'var(--main-lila-hell)' : 'var(--white-lila)',
    }">
      <label class="week-label"
        :for="'week' + index" 
        :style="{ color: item.checked ? 'white' : 'var(--main-lila-dunkel)',
        }">
        {{ item.label }}
      </label>
      <input type="checkbox" :id="'week' + index" v-model="item.checked" />
    </div>
  </div>
</div>

<div v-if="(selectedSchedule === medication.schedule[2])">
  <p class="input-subtitle margin-top">Interval</p>
  <select v-model="selectedInterval">
    <option v-for="(item, index) in medication.intervalDays" :key="index" :value="item">
      {{ item }}
    </option>
  </select>
</div>

<p class="input-subtitle margin-top">At what time</p>
  <div class="table-wrapper">
    <table>
      <tbody>
        <tr v-for="(item, index) in schedule" :key="index" >
          <td class="align-left" :style="{
              display: 'flex', alignItems: 'center', width: '7rem'
          }">
            <font-awesome-icon icon="circle-minus" class="circle-icon" @click="deleteSchedule(index)"
            :style="{color: 'var(--white-lila-border)', marginRight: '0.5rem' }"/>
            <div @click="displayTimePicker(index)"
            :style="{ backgroundColor: 'var(--white-lila-border)', height: '1.8rem', cursor: 'pointer',
              borderRadius: '0.4rem', alignItems: 'center', display:'flex' }"> 
            <span :style="{ display: 'inline-block', margin: 'auto', color: 'var(--main-lila-hell)', width: '4.5rem', textAlign: 'center'}">
              {{ item.hour < 10 ? '0'+item.hour : item.hour }} : {{ item.min < 10 ? '0'+ item.min : item.min }}
            </span>
            </div>
            </td>
          <td class="align-right" :style="{color: 'var(--main-lila-hell)', width: 'auto'}">
            <input type="number" v-model="item.application" min="1" class="inlineNumInput" 
            @input="validateApplication(item)"/>
            <span :style="{ color: 'var(--white-lila-dunkel)' }" v-if="item.application > 1"> applications</span>
            <span :style="{ color: 'var(--white-lila-dunkel)' }" v-else> application</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div :style="{ 
      textAlign: 'left', padding: '0.4rem 0',
      marginLeft: '0.2rem',
      display: 'flex', cursor: 'pointer',
      }"> 
      <font-awesome-icon icon="circle-plus" class="circle-icon" @click="addNewTime" :style="{
        color: 'var(--main-lila-hell)', 
        marginRight: '0.56em'
        }" />
        <span @click="addNewTime"> Add a Time </span>
    </div>
</div>

<p class="input-subtitle margin-top">Duration</p>
<div class="table-wrapper">
  <table>
    <tbody>
      <tr :style="{color: 'var(--white-lila-dunkel)' }">
        <td class="align-left">Start Date</td>
        <td class="align-left">End Date</td>
      </tr>
      <tr>
        <td class="align-left">
          <font-awesome-icon icon="calendar" class="calender-icon" @click='displayCalendarStart'/>
          {{ startDate }} {{ monthArray[startMonth] }} {{ startYear }}
        </td>
        <td class="align-left">
          <font-awesome-icon icon="calendar" class="calender-icon" @click='displayCalendarEnd'/>
          <span v-if="endDate === null">&nbsp;None</span>
          <span v-else>&nbsp;{{ endDate }} {{ monthArray[endMonth] }} {{ endYear }}
            <font-awesome-icon icon="circle-xmark" class="circle-xmark" @click="deleteDate"/>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<div :style="{color: 'var(--white-lila-dunkel)', marginLeft:'0.8rem', textAlign: 'left'}"> 
  <div v-if="(startElapsed <= endElapsed) && (endDate !== null)">{{ duration }} 
    <span v-if="duration > 1">days</span>
    <span v-if="duration == 1">day</span>
  </div> 
  <div v-else>&nbsp;</div>
</div>
</div>

<div class="modal-container"
  :style="{ display: timePickerDisplay }"
  @click="closeTimePicker"></div>
  <TimePicker ref="timePickerRef" v-if="timePickerDisplay == 'block'"
  :currentHour="Number(schedule[scheduleIndex].hour)"
  :currentMin="Number(schedule[scheduleIndex].min)"
  ></TimePicker>

<div class="modal-container"
:style="{ display: calendarStartDisplay }"
@click="closeCalendarStart"></div>
  <Calendar ref="calendarStartRef" v-if="calendarStartDisplay === 'block'"
  :startDate = "startDate" 
  :startMonth="startMonth" 
  :startYear="startYear"
  :startElapsed="startElapsed" 
    :disable="false"></Calendar>

<div class="modal-container"
:style="{ display: calendarEndDisplay }"
@click="closeCalendarEnd"></div>
  <Calendar ref="calendarEndRef" v-if="calendarEndDisplay === 'block'"
  :startDate="endDate === null? startDate : endDate" 
  :startMonth="endDate === null? startMonth : endMonth" 
  :startYear="endDate === null? startYear : endYear"
  :startElapsed="startElapsed" 
  :disable="true"></Calendar>

</template>

<style>
.circle-xmark {
  color: var(--white-lila-border);
  margin-left: 0.2rem;
  font-size: 1.3rem;
  display: block;
  cursor: pointer;
  float: right;
}

.circle-icon {
  font-size: 1.3rem;
  cursor: pointer;
  align-self: center;
}

.calender-icon {
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--white-lila-border);
  margin-right: 0.3rem;
}

.week-wrapper{
  margin: auto;
  display: grid;
  grid-template-columns: repeat(7, auto);
  height: 2.6rem;
  border-radius: 0.8rem;
  overflow: hidden;
  position: relative;
  gap: 1px;
}

.week-div{
  display: flex;
  justify-content: center;
}

.week-label {
  position: absolute;
  top: 50%;
  transform: translate(0,-50%);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 2rem;
}

.inlineNumInput {
  -moz-appearance: textfield;
  background-color: var(--white-lila-hell);
  border: none;
  width: calc(100% - 5.8rem);
  height: 1.2rem;
  color: var(--main-lila-hell);
  font-size: 0.96rem;
  padding: 0;
  outline: none;
  text-align: right;
}

td {
  width: 50%;
  height: 2rem;
}

@media screen and (max-aspect-ratio: 1) {

}
</style>
