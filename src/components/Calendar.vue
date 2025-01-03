<script setup lang="ts">
import { monthArrayFull } from '../chart/global_label'
import { ref } from 'vue'

const props = defineProps<{
  startDate: number
  startMonth: number
  startYear: number
  startElapsed: number
  disable: boolean
}>()

const days = [  "M", "T", "W", "T", "F", "S", "S",]
const today = new Date()
const todayElapsed:number =  today.getTime()
const currentDate: number = today.getDate()
const currentMonth: number = today.getMonth()
const currentYear: number = today.getFullYear()
const daysInMonth = ref<string[]>([])
const month = ref<number>(props.startMonth)
const year = ref<number>(props.startYear)
const theFirst = new Date(year.value, month.value, 1);
const theFirstDayOfWeek = ref<number>(theFirst.getDay()== 0? theFirst.getDay()+6 :theFirst.getDay()-1)
const lastDate = ref<number>(new Date(year.value, month.value + 1, 0).getDate())
const selectedDateIndex = ref<number | null>(currentDate + theFirstDayOfWeek.value -1)
const selectedMonth = ref<number>(month.value)
const selectedDate = ref<number>(selectedDateIndex.value != null? selectedDateIndex.value - theFirstDayOfWeek.value + 1 : 0)

const previousMonth = () => {
  if (month.value === 0) {
    month.value = 12;
    year.value--;
  }  
  month.value--
  updateDateArray()
}

const nextMonth = () => {
  if (month.value === 11) {
    month.value = -1;
    year.value++;
  }
  month.value++
  updateDateArray()
}

const updateDateArray = () => {
  daysInMonth.value = []
  const theFirst = new Date(year.value, month.value, 1);
  theFirstDayOfWeek.value = theFirst.getDay()== 0? theFirst.getDay()+6 :theFirst.getDay()-1
  lastDate.value = new Date(year.value, month.value + 1, 0).getDate()
  let daycount:number = 1

  for (let i:number = 0; i < 42; i++) {
    if(i>=theFirstDayOfWeek.value && daycount<= lastDate.value){
      daysInMonth.value[i] = daycount.toString()
      daycount++
    } else {
      daysInMonth.value[i] = ""
    }
  }

  if(!(props.disable) && currentYear === props.startYear && month.value === props.startMonth){
    selectedDateIndex.value = props.startDate + theFirstDayOfWeek.value - 1
    selectedDate.value = selectedDateIndex.value - theFirstDayOfWeek.value + 1
  } else if(props.disable && currentYear === today.getFullYear() && month.value === today.getMonth()){
    selectedDateIndex.value = today.getDate() + theFirstDayOfWeek.value - 1
  } else {
    selectedDateIndex.value = lastDate.value + theFirstDayOfWeek.value - 1
    selectedDate.value = selectedDateIndex.value - theFirstDayOfWeek.value + 1
  }
}

const initial = () => {
    // when start date < current date for end date setting
  let elapsed: number = new Date(props.startYear,props.startMonth, props.startDate).getTime()
  if(props.disable && elapsed < todayElapsed){
    year.value = today.getFullYear()
    month.value = today.getMonth()
  }
  updateDateArray()
}

initial()

const select = (index: number) => {
  let date:number = index - theFirstDayOfWeek.value + 1
  let currentElapsed:number = (new Date(year.value, month.value, date)).getTime()
  let startElapsed: number = props.startElapsed  <= todayElapsed ? todayElapsed : props.startElapsed 
  if( index>= theFirstDayOfWeek.value && index <= lastDate.value + theFirstDayOfWeek.value-1){
    if(props.disable){
      if( startElapsed <= currentElapsed ){
        selectedDateIndex.value = index
        selectedDate.value = selectedDateIndex.value - theFirstDayOfWeek.value + 1
        selectedMonth.value = month.value
      }
    }else {
      selectedDateIndex.value = index
      selectedDate.value = selectedDateIndex.value - theFirstDayOfWeek.value + 1
      selectedMonth.value = month.value
    }
  }
}

defineExpose({ selectedDate, month, year })

</script>

<template>
  <div class="modal-wrapper">
    <div :style="{ marginBottom: '0.6rem', fontSize: '1.2rem' }">
      {{ monthArrayFull[month] }} {{ year }}
      <span :style="{ float: 'right' }">
        <font-awesome-icon icon="chevron-left" 
        :style="{ marginRight: '1rem', cursor: 'pointer', color: 'var(--main-lila-hell)'}"
        v-if="!((month === currentMonth) && (year === currentYear))" 
        @click="previousMonth"/>
        <font-awesome-icon icon="chevron-right" 
        :style="{ cursor: 'pointer', color: 'var(--main-lila-hell)'}"
        @click="nextMonth" />
      </span>
    </div>
    <div class="calendar-wrapper">
      <div class="day-wrapper" :style="{ gap: '0.7rem', marginBottom: '0.5rem',
        textAlign: 'center'}">
        <p v-for="item in days"> {{ item }} </p>
      </div>

      <div class="day-wrapper":style="{ gap: '0.5rem',
        textAlign: 'center'}">
        <div class="day-number" v-for="(item ,index) in daysInMonth" 
        :style="{ 
          backgroundColor: selectedDateIndex === index? 'var(--main-lila-hell)' : 'var(--white-lila)',
          color: (selectedDateIndex === index) || 
          (props.disable && (todayElapsed > (new Date(year,month,index-theFirstDayOfWeek+1)).getTime())) ||
          (props.disable && (startElapsed > (new Date(year,month,index-theFirstDayOfWeek+1)).getTime()))? 
          'var(--white-lila-border)' : 'var(--main-lila-hell)',
          cursor: 'pointer', border: 'none',
          }" @click="select(index)">
          <p> {{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper{
  --height: 2rem;

  width: 20rem;
  height: 22rem;
  border-radius: 0.8rem;
  background-color: var(--white-lila);
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%,-60%);
  padding: 1rem;
  margin: 0;
  z-index: 100;
}

.calendar-wrapper{
  width: 100%;
  aspect-ratio: 1;
}

.day-wrapper {
  display: grid;
  grid-template-columns: repeat(7, auto);
  text-align: center;
}

.day-number{
  border-radius: 50%;
  width: auto;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
