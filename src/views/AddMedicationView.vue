<script setup lang="ts">
import * as medication from '../global_array/medicationInfo'
import { ref } from 'vue'
import setSchedule from './SetSchedule.vue'
import { monthArray } from '../chart/global_label'
import { useDataStore } from '../stores/data'
const dataStore = useDataStore()
const scheduleRef = ref<InstanceType<typeof setSchedule> | null>(null)
const selectedDays = ref<string[]>([])
let step = ref<number>(0)
const selectedName = ref<string | null>(null)
const selectedStrength = ref<number | null>(null)
const selectedType = ref<string | null>(null)
const selectedUnit = ref<string | null>(null)
const memo = ref<string>("")

const selectedShapeIndex = ref<number | null>(null)
const selectedBgIndex = ref<number>(0)
const selectedShape = ref<string | null>(null)
const selectedColorLeft = ref<string>("white")
const selectedColorRight = ref<string>("white")
const selectedColorLeftIndex = ref<number>(0)
const selectedColorRightIndex = ref<number>(0)
const guideText = ref<string>("")
const close = ref<boolean>(false)

const reset = ()=> {
  setTimeout(() => {
    step.value = 0
    selectedDays.value = []
    selectedName.value = null
    selectedStrength.value = null
    selectedType.value = null
    selectedUnit.value = null
    selectedShapeIndex.value = null
    selectedBgIndex.value = 0
    selectedShape.value = null
    selectedColorLeft.value = "white"
    selectedColorRight.value = "white"
    selectedColorLeftIndex.value = 0
    selectedColorRightIndex.value = 0
    memo.value = ""
    close.value = false
    scheduleRef.value?.reset()
  }, 600);
}

const nextStep = () => {
  step.value = step.value + 1;

  if(step.value === 1){
    guideText.value = (selectedName.value ?? '') + '\n' + (selectedType.value ?? '')
  } else if(step.value === 5){
    guideText.value = ""
  } else {
    guideText.value = (selectedName.value ?? '') + '\n' + (selectedType.value ?? '') +', '+ (selectedStrength.value ?? '') + (selectedUnit.value ?? '')
  }

  if(scheduleRef.value && step.value == 3){
    if(scheduleRef.value?.selectedSchedule?.includes('Specific')) {
      scheduleRef.value.week.forEach((label, index) => {
        if (label.checked) {
          if (index === 0 ){ selectedDays.value.push('Mon')}
          if (index === 1 ){ selectedDays.value.push('Tue')}
          if (index === 2 ){ selectedDays.value.push('Wed')}
          if (index === 3 ){ selectedDays.value.push('Thu')}
          if (index === 4 ){ selectedDays.value.push('Fri')}
          if (index === 5 ){ selectedDays.value.push('Sat')}
          if (index === 6 ){ selectedDays.value.push('Sun')}
        }
      })
    } else {
      selectedDays.value = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }
  }
}

const backStep = () => {
  step.value = step.value - 1;

  if(step.value === 1){
    guideText.value = (selectedName.value ?? '') + '\n' + (selectedType.value ?? '')
  } else if(step.value === 0){
    guideText.value = ""
  } else {
    guideText.value = (selectedName.value ?? '') + '\n' + (selectedType.value ?? '') +', '+ (selectedStrength.value ?? '') + (selectedUnit.value ?? '')
  }

  if(step.value === 2){
    selectedDays.value = []
  }

  if(step.value === 3){
  selectedShape.value = null
  selectedShapeIndex.value = null
  selectedColorLeft.value = "white"
  selectedColorRight.value = "white"
  selectedBgIndex.value = 0
  selectedColorLeftIndex.value = 0
  selectedColorRightIndex.value = 0
  }
}

const selectShape = (index: number)=> {
  selectedShapeIndex.value = index
  selectedShape.value = medication.shapeImageNames[index]
  if (!(selectedShape.value.includes('capsule'))){
    selectedColorLeft.value = selectedShape.value.split('_')[1] 
  }

  selectedShape.value = selectedShape.value.split('_')[0] 
}

const selectBgColor = (index: number)=> {
  selectedBgIndex.value = index
}

const selectColorLeft = (index: number)=> {
  selectedColorLeftIndex.value = index
  selectedColorLeft.value = medication.chooseColorName[index]
}

const selectColorRight = (index: number)=> {
  selectedColorRightIndex.value = index
  selectedColorRight.value = medication.chooseColorName[index]
}

const done = ()=> {
  const timeArray: string[] = []
  const applicationArray: number[] = []

  scheduleRef.value?.schedule.map(item => {
    const hour = item.hour;
    const min = item.min.toString().padStart(2, '0')
    timeArray.push(`${hour}:${min}`)
  })

  scheduleRef.value?.schedule.map(item => {
    const application = item.application;
    applicationArray.push(application)
  })

  const d = 
  {
    name: selectedName.value ?? "",
    type: selectedType.value?? "",
    strength: selectedStrength.value ?? 0,
    unit: selectedUnit.value ?? "",
    schedule: scheduleRef.value?.selectedSchedule ?? "",
    days: selectedDays.value,
    time: timeArray,
    application: applicationArray,
    durationStart: scheduleRef.value?.startDate+'/'+scheduleRef.value?.startMonth+'/'+scheduleRef.value?.startYear,
    durationEnd: scheduleRef.value?.endDate === null? "" : scheduleRef.value?.endDate+'/'+scheduleRef.value?.endMonth+'/'+scheduleRef.value?.endYear,
    duration: scheduleRef.value?.duration ?? 0,
    shape: selectedShape.value ?? "",
    colorLeft: selectedColorLeft.value,
    colorRight: selectedColorRight.value,
    bgColorIndex: selectedBgIndex.value,
    memo: memo.value
  }
  dataStore.addNewArray(d)
  close.value = true
  reset()
}

const transform = (index: number) => {
  if (index === step.value){
    return 'translate(0, 0)'
  } else if (index < step.value){
    return 'translate(-100%, 0)'
  } else {
    return 'translate(100%, 0)'
  }
}

interface dataType {
  name: string
  type: string
  strength: number
  unit: string
  schedule: string
  days: string[]
  time: string[]
  application: number[]
  durationStart: string
  durationEnd: string
  shape: string
  colorLeft: string
  colorRight: string
  bgColorIndex: number
  memo: string
}

const data: dataType[] = [
  {
    name: "Metformin",
    type: "tablet",
    strength: 500,
    unit: "mg",
    schedule: "Every Day",
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    time: ["8:00", "18:00"],
    application: [1,1],
    durationStart: "1/1/23",
    durationEnd: "",
    shape: "tablet",
    colorLeft: "round",
    colorRight: "white",
    bgColorIndex: 8,
    memo: ""
  },
  {
    name: "Carbimazole",
    type: "capsule",
    strength: 10,
    unit: "mg",
    schedule: "On Specific Days of the Week",
    days: ["Tue", "Wed", "Thu", "Fri", "Sun"],
    time: ["8:00", "12:00", "17:00"],
    application: [1,1,1],
    durationStart: "1/1/23",
    durationEnd: "",
    shape: "capsule",
    colorLeft: "white",
    colorRight: "sky",
    bgColorIndex: 11,
    memo: ""
  },
]

defineExpose({ close, data })
</script>

<template>
  <div class="container-full">
    <div class="fixed">
      <span class="closeIcon topIcon" @click="reset"><slot name="close"></slot></span>
      <span class="backIcon topIcon" @click="backStep" v-if="step !== 0">
        <font-awesome-icon icon="fa-solid fa-chevron-left"/>
        <span>Back</span>
      </span>
      <span class="nav-title">{{guideText}}</span>
      <span class="top-title" v-if="step === 5">Review Details</span>
    </div>

    <div class="form-wrapper">
      <div class="form scroll-wrapper-full" :style="{transform: step === 0 ? 'translate(0, 0)' : 'translate(-100%, 0)'}">
        <div class="content-wrapper">
          <img src="/icons/default.png" class="guide-img">
          <p class="inputTitle" > Medication Name</p>
          <input type="text" placeholder="Add Medication Name" v-model="selectedName"/>

          <p class="inputTitle margin-top">Medication Type</p>
          <div>
            <label v-for="type in medication.types" class="radioSelection radioType">
              <span class="radioLabel">{{type}}</span>
              <input type="radio" :name="'medication_type'" :value="type" v-model="selectedType" >
              <font-awesome-icon icon="check" class="checkmark" v-if="selectedType === type"/>
            </label>
          </div>

          <button class="button" @click="nextStep" :disabled="(selectedName === null) || (selectedType === null)"
          :style="{
            backgroundColor: (selectedName === null) || (selectedType === null) ? 'var(--divider-light-2)' : 'var(--main-lila-hell)',
            color: (selectedName === null) || (selectedType === null) ? 'var(--divider-light-1)' : 'white'
          }">Next</button>
        </div>
      </div>

      <div class="form scroll-wrapper-full" :style="{ transform: transform(1)}">
        <div class="content-wrapper">
          <img src="/icons/default.png" class="guide-img" >
          <p class="inputTitle">Medication Strength</p>
          <p class="input-subtitle">Strength </p>
          <input type="number" placeholder="Add Strength" v-model="selectedStrength" min="1" class="inputNum">

          <p class="input-subtitle margin-top">Units</p>
          <div>
            <label v-for="unit in medication.units" class="radioSelection radioUnit">
              <span class="radioLabel">{{unit}}</span>
              <input type="radio" :name="'medication_type'" :value="unit" v-model="selectedUnit">
              <font-awesome-icon icon="check" class="checkmark" v-if="selectedUnit === unit"/>
            </label>
          </div>
          <button class="button" @click="nextStep" :disabled="(selectedUnit === null) || (selectedStrength === null)"
          :style="{
            backgroundColor: (selectedUnit === null) || (selectedStrength === null) ? 'var(--divider-light-2)' : 'var(--main-lila-hell)',
            color: (selectedUnit === null) || (selectedStrength === null) ? 'var(--divider-light-1)' : 'white'
          }">Next</button>
        </div>
      </div>

      <div class="form scroll-wrapper-full" :style="{ transform: transform(2)}">
        <div class="content-wrapper">
          <img src="/icons/calendar.png" class="guide-img" >
          <p class="inputTitle">Set a Schedule</p>
          <setSchedule ref="scheduleRef"
          :index="0"
          :edit="false"></setSchedule>
          <button class="button" @click="nextStep"
          :disabled="!(scheduleRef?.valid)"
          :style="{
            backgroundColor: !(scheduleRef?.valid) ? 'var(--divider-light-2)' : 'var(--main-lila-hell)',
            color: !(scheduleRef?.valid) ? 'var(--divider-light-1)' : 'white'
          }">Next</button>
        </div>
      </div> 

      <div class="form scroll-wrapper-full" :style="{ transform: transform(3)}">
        <div class="content-wrapper">
          <img v-bind:src="selectedShapeIndex === null ? '/icons/default.png' : '/pill/' + medication.shapeImageNames[selectedShapeIndex] + '.png'" 
          class="guide-img default-img"/>

          <p class="inputTitle">Choose the Shape</p>
          <div class="image-wrapper">
            <img v-for="(name, index) in medication.shapeImageNames" :key="index" 
            :src="'/pill/' + name +'.png'" class="shape-img" 
            @click="selectShape(index)"
            :style="{ 
              outline: selectedShapeIndex === index ? '0.3rem solid var(--white-lila-border)' : 'none',
              outlineOffset: '0.2rem',
              }">
          </div>
        
          <button class="button" @click="nextStep" :disabled="( selectedShapeIndex === null)"
          :style="{
            backgroundColor: selectedShapeIndex === null ? 'var(--divider-light-2)' : 'var(--main-lila-hell)',
            color: selectedShapeIndex === null ? 'var(--divider-light-1)' : 'white'
          }">Next</button>
        </div>
      </div> 

      <div class="form scroll-wrapper-full" :style="{ transform: transform(4)}">
        <div class="content-wrapper">
          <img 
          :style="{ backgroundColor: selectedBgIndex === null? 'var(--white-lila)' : medication.backgroundColor[selectedBgIndex] }"
          v-bind:src="(selectedShape === null || selectedColorLeft === null || selectedColorRight === null ) ? 
          '/pill/' + medication.shapeImageNames[selectedShapeIndex ?? -1] + '.png' : 
          '/pill/' + selectedShape + '_' + selectedColorLeft + '_' + selectedColorRight + '.png'" 
          class="guide-img default-img"/>

          <p class="inputTitle">Choose Colors</p>
          <div v-if="selectedShapeIndex !== null && medication.shapeImageNames[selectedShapeIndex].includes('capsule')">
            <p class="input-subtitle palette-title">Left Side</p>
            <div class="palette-wrapper">
              <div v-for="(item, index) in medication.chooseColor" :key="index" 
              class="palette" 
              @click="selectColorLeft(index)"
              :style="{ 
              backgroundColor: item,
              outline: selectedColorLeftIndex === index ? '0.3rem solid var(--white-lila-border)' : 'none',
              outlineOffset: '0.2rem',
              }">
              </div>
            </div>
          </div>

          <p class="input-subtitle palette-title" 
            v-if="selectedShapeIndex !== null && !(medication.shapeImageNames[selectedShapeIndex].includes('capsule'))">
            Shape Color
          </p>
          <p class="input-subtitle palette-title margin-top" v-else>Right Side</p>
          <div class="palette-wrapper">
            <div v-for="(item, index) in medication.chooseColor" :key="index" 
            class="palette" 
            @click="selectColorRight(index)"
            :style="{ 
            backgroundColor: item,
            outline: selectedColorRightIndex === index ? '0.3rem solid var(--white-lila-border)' : 'none',
            outlineOffset: '0.2rem',
              }">
            </div>
          </div>

          <p class="input-subtitle palette-title margin-top">Background</p>
          <div class="palette-wrapper">
            <div v-for="(item, index) in medication.backgroundColor" :key="index" 
            class="palette" 
            @click="selectBgColor(index)"
            :style="{ 
              backgroundColor: item,
              outline: selectedBgIndex === index ? '0.3rem solid var(--white-lila-border)' : 'none',
              outlineOffset: '0.2rem',
              }">
            </div>
          </div>
        
          <button class="button" @click="nextStep" :style="{ backgroundColor: 'var(--main-lila-hell)', color: 'white' }">Next</button>
        </div>
      </div> 

      <div class="form scroll-wrapper-full" :style="{ transform: transform(5)}">
        <div class="content-wrapper">
          <img 
          :style="{ backgroundColor: selectedBgIndex === null? 'var(--white-lila)' : medication.backgroundColor[selectedBgIndex] }"
          v-bind:src="'/pill/' + selectedShape + '_' + selectedColorLeft + '_' + selectedColorRight + '.png'" 
          class="guide-img default-img"/>

          <p class="inputTitle"> {{ selectedName }} </p>
          {{ selectedType }}, {{ selectedStrength }} {{ selectedUnit }}

          <p class="input-subtitle margin-top">Schedule</p>
          <div class="table-wrapper">
            <table>
              <tbody>
                <tr v-if= "scheduleRef?.selectedSchedule?.includes('Every Day') ">
                  <td colspan="2" class="align-left">{{ scheduleRef?.selectedSchedule }}</td>
                </tr>
                <tr v-if= "scheduleRef?.selectedSchedule?.includes('Specific') ">
                  <td colspan="2" class="align-left">{{ selectedDays.join(', ') }}</td>
                </tr>
                <!-- <tr v-if= "selectedSchedule?.includes('Every Few Days') ">
                  <td colspan="2" class="align-left">{{ selectedInterval }}</td>
                </tr> -->
                <tr v-for="(item, index) in scheduleRef?.schedule" :key="index" class="align-left">
                  <td>{{ item.hour < 10 ? '0' + item.hour : item.hour }}:{{ item.min < 10 ? '0' + item.min : item.min }} </td>
                  <td>{{ item.application > 1? item.application + ' applications' : item.application + ' application'}}</td>          
                </tr>
                <tr class="align-left">
                  <td colspan="2" class="align-left" :style="{ borderTop: '1px solid white', color: 'var(--white-lila-dunkel)' }">
                    Starts on {{ scheduleRef?.startDate }} {{ monthArray[scheduleRef?.startMonth ?? 0]}} {{ scheduleRef?.startYear }}
                    <div v-if="scheduleRef?.endDate !== null">Ends {{ scheduleRef?.endDate }} {{ monthArray[scheduleRef?.endMonth ?? 0] }} {{ scheduleRef?.endYear }} </div>
                    <div v-if="scheduleRef?.endDate !== null">Duration: {{ scheduleRef?.duration }} 
                      <span v-if="scheduleRef?.duration ?? 0 > 1">days</span>
                      <span v-else>day</span>
                    </div>
                  </td>
                </tr> 
              </tbody>
            </table>
          </div>
          
          <p class="input-subtitle margin-top">Optional Details</p>
          <textarea class="textArea" name="memo" rows="4" cols="50" v-model="memo" placeholder="Notes"></textarea>
          
          <button class="button" @click="done" :style="{ backgroundColor: 'var(--main-lila-hell)', color: 'white' }">Done</button>
        </div>
      </div> 
    </div>     
  </div>
</template>

<style scope>
.guide-img{
  width: 30%;
}

.nav-title {
  margin: 0.7rem 0;
  line-height: 1rem;
  font-size: 0.8rem;
  position: fixed;
  left: 50%;
  transform: translate(-50%,0);
  white-space: pre-wrap; 
  text-align: center;
}

.backIcon{
  font-size: 1.1rem;
  left: 0.4rem;
  top: 0.4rem;
}

.backIcon span {
  margin: 0 0 0 0.2rem;
}

.form-wrapper {
  margin: auto;
  width: 100%;
  text-align: center;
}

.form {
  transition-duration: 500ms;
}

.radioSelection{
  display: block;
  margin: auto;
  padding: 0.4rem 0.6rem;
  background-color: var(--white-lila);
  position: relative;
  text-align: left;
  border-bottom: 1px solid white;
  cursor: pointer;
}

.radioType:first-child,
.radioUnit:first-child {
  border-radius: 0.8rem 0.8rem 0 0;
  padding-top: 0.5rem;
}

.radioType:last-child,
.radioUnit:last-child {
  border-radius: 0 0 0.8rem .8rem;
  padding-bottom: 0.5rem;
  border: none;
}

.checkmark {
  position: absolute;
  margin: auto;
  right: 1rem;
  font-size: 1.2rem;
  color: var(--main-lila-hell);
  transform: translate(0 , 10%);
}

.radioLabel{
  padding-left: 0.4rem;
}

.textArea {
  border: none;
  border-radius: 0.8rem;
  background-color: var(--white-lila);
  padding: 1rem;
  line-height: 1.5rem;
  font-family: var(--font);
  font-size: 1rem;
}


input[type=text]:focus,
textarea:focus {
  border: none;
}

::placeholder {
  color: var(--white-lila-border);
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Edge 12-18 */
  color: var(--white-lila-border);
}

td {
  width: 50%;
  height: 2rem;
}

.image-wrapper{
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-items: ;
  gap: 1.2rem;
  margin-top: 1rem;
}

.selected-text{
  line-height: 1rem;
  font-size: 0.8rem;
  margin-bottom: .4rem;
}

.default-img,
.shape-img{
  border-radius: 50%;
  background-color: var(--white-lila);
  overflow: hidden;
}

.shape-img {
  width: 84%;
  margin: auto;
  cursor: pointer;
}

.default-img {
  transition-duration: 500ms;
}

.palette-wrapper{
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 1rem;
}

.palette {
  width:50%;
  aspect-ratio: 1;
  border-radius: 50%;
  cursor: pointer;
  margin: auto;
}

.palette-title {
  margin-bottom: 1rem;
  padding-left: 1%
}

@media screen and (max-aspect-ratio: 1) {
  .button{
    cursor: pointer;
  }

  .palette {
    width: 56%;
  }
}
</style>