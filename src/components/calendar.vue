<script setup lang="ts">
import { monthArrayFull } from '../chart/global_label'
import { ref } from 'vue'

const days = [  "M", "T", "W", "T", "F", "S", "S",]
const today = new Date()
let currentDate: number = today.getDate()
let currentMonth: number = today.getMonth()
let currentYear: number = today.getFullYear()
const daysInMonth = ref<string[]>([])
const month = ref<number>(currentMonth)
const year = ref<number>(currentYear)
const theFirstDayOfWeek = ref<number>(0)
const lastDate = ref<number>(new Date(year.value, month.value + 1, 0).getDate())
const selectedDateIndex = ref<number|null>(null)
const selectedDate = ref<number>(0)


console.log(today.getDay())

const previousMonth = () => {
  if (month.value === 0) {
    month.value = 12;
    year.value--;
  }  
  month.value--
  updateDateArray()
  selectedDateIndex.value = null
}

const nextMonth = () => {
  if (month.value === 11) {
    month.value = -1;
    year.value++;
  }
  month.value++
  updateDateArray()
  selectedDateIndex.value = null
}

const updateDateArray = () => {
  daysInMonth.value = []
  const theFirst: Date = new Date()
  theFirst.setMonth(month.value)
  theFirst.setFullYear(year.value)
  theFirstDayOfWeek.value = theFirst.getDay()-2 < 0? theFirst.getDay()+5 :theFirst.getDay()-2
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

  console.log(theFirstDayOfWeek.value)
  console.log(selectedDate.value)
}
updateDateArray()

const select = (index: number) => {
  let i = index - theFirstDayOfWeek.value
  if( i>= theFirstDayOfWeek.value && i <= lastDate.value){
    selectedDateIndex.value = index
  } 

  console.log(selectedDateIndex.value)
}

</script>

<template>
  <div class="container" 
  :style="{ backgroundColor:'gray', top: 0}">
    <div class="modal-wrapper">
      <div :style="{ marginBottom: '0.6rem', fontSize: '1.2rem' }">
        {{ monthArrayFull[month] }} {{ year }}
        <span :style="{ float: 'right' }">
          <font-awesome-icon icon="chevron-left" 
          :style="{ marginRight: '1rem', cursor: 'pointer', color: 'var(--main-lila-hell)'}"
          v-if="month !== currentMonth" 
          @click="previousMonth"/>
          <font-awesome-icon icon="chevron-right" 
          :style="{ cursor: 'pointer', color: 'var(--main-lila-hell)'}"
          @click="nextMonth" />
        </span>
      </div>
      <div class="calendar-wrapper">
        <div class="day-wrapper" :style="{ gap: '0.7rem', marginBottom: '0.5rem',
          textAlign: 'center', color: 'var(--white-lila-border)'}">
          <p v-for="item in days"> {{ item }} </p>
        </div>

        <div class="day-wrapper":style="{ gap: '0.5rem',
          textAlign: 'center', color: 'var(--white-lila-border)'}">
          <div class="day-number" v-for="(item ,index) in daysInMonth" 
          :style="{ 
            backgroundColor: selectedDateIndex === index? 'var(--main-lila-hell)' : 'var(--white-lila)',
            color: selectedDateIndex === index? 'white' : 'var(--main-lila-hell)',
            cursor: 'pointer',
           }" @click="select(index)">
            <p> {{ item }} </p>
          </div>
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

@media screen and (max-aspect-ratio: 1) {

}

</style>
