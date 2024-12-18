<script setup lang="ts">
import * as medication from '../global_array/medicationInfo'
import { ref } from 'vue'

const now = new Date();
const selectedDays = ref<string>("")
const todayDate = ref<string>(new Date().toLocaleDateString())
let step = ref<number>(0)
const selectedName = ref<string | null>(null)
const selectedStrength = ref<number | null>(null)
const selectedType = ref<string | null>(null)
const selectedUnit = ref<string | null>(null)
const selectedSchedule = ref<string | null>(medication.schedule[0])
const selectedInterval = ref<string | null>(medication.intervalDays[0])
const week = ref([
  { label: 'M', checked: false },
  { label: 'T', checked: false },
  { label: 'W', checked: false },
  { label: 'T', checked: false },
  { label: 'F', checked: false },
  { label: 'S', checked: false },
  { label: 'S', checked: false }, 
])

interface ScheduleItem {
  hour: number
  min: number
  application: number
}

const schedule = ref<ScheduleItem[]>([
  { hour: now.getHours(), min: now.getMinutes(), application: 1 },
])

const selectedShapeIndex = ref<number | null>(null)
const selectedBgIndex = ref<number>(0)
const selectedShape = ref<string | null>(null)
const selectedColorLeft = ref<string | null>("white")
const selectedColorRight = ref<string | null>("white")
const selectedColorLeftIndex = ref<number>(0)
const selectedColorRightIndex = ref<number>(0)

const nextStep = () => {
  step.value = step.value + 1;

  if(step.value == 3 && selectedSchedule.value?.includes('Specific')) {
    week.value.forEach((day, index) => {
      if (day.checked) {
        if (index === 0 ){ selectedDays.value += 'Mon, '}
        if (index === 1 ){ selectedDays.value += 'Tue, '}
        if (index === 2 ){ selectedDays.value += 'Wed, '}
        if (index === 3 ){ selectedDays.value += 'Thu, '}
        if (index === 4 ){ selectedDays.value += 'Fri, '}
        if (index === 5 ){ selectedDays.value += 'Sat, '}
        if (index === 6 ){ selectedDays.value += 'Sun, '}
      }
    })
      selectedDays.value = selectedDays.value.replace(/,\s*$/, "");
  }
}

const backStep = () => {
  step.value = step.value - 1;

  if(step.value === 2){
    selectedDays.value = " "
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

const addNewTime = () => {
  let data = { hour: now.getHours(), min: now.getMinutes(), application: 1 }
  if (schedule.value.length > 0) {
    data.hour = schedule.value[schedule.value.length-1].hour + 1 > 23 ? 0 : schedule.value[schedule.value.length-1].hour + 1
    data.min = schedule.value[schedule.value.length-1].min
  }  
  schedule.value.push(data)
}

const deleteSchedule = (index : number) => {
  schedule.value.splice(index, 1)
}

const selectShape = (index: number)=> {
  selectedShapeIndex.value = index
  selectedShape.value = medication.shapeImageNames[index]
  if (selectedShape.value.includes('tablet')){
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

const done  = ()=> {

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
</script>

<template>
  <div class="container_Add">
    <div class="fixed">
      <span class="closeIcon topIcon"><slot name="close"></slot></span>
      <span class="backIcon topIcon" @click="backStep" v-if="step !== 0">
        <font-awesome-icon icon="fa-solid fa-chevron-left"/>
        <span>Back</span>
      </span>
    </div>

    <div class="form-wrapper">
      <div class="form" :style="{transform: step === 0 ? 'translate(0, 0)' : 'translate(-100%, 0)'}">
        <p class="inputTitle">Medication Name</p>
        <input type="text" placeholder="Add Medication Name" v-model="selectedName"/>

        <p class="inputTitle marginTop">Medication Type</p>
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

      <div class="form" :style="{ transform: transform(1)}">
        <p class="inputTitle">Medication Strength</p>
        <p class="inputSubtitle">Strength </p>
        <input type="number" placeholder="Add Strength" v-model="selectedStrength" min="1" class="inputNum">

        <p class="inputSubtitle marginTop">Units</p>
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

      <div class="form" :style="{ transform: transform(2)}">
        <p class="inputTitle">Set a Schedule</p>
        <p class="inputSubtitle">When will you take this? </p>
        <select v-model="selectedSchedule">
          <option v-for="(item, index) in medication.schedule" :key="index" :value="item">
            {{ item }}
          </option>
        </select>

        <div v-if="selectedSchedule === medication.schedule[1]">
          <p class="inputSubtitle marginTop">On these days:</p>
          <div class="week-wrapper">
            <div v-for="(item, index) in week" :key="index" 
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

        <div v-if="selectedSchedule === medication.schedule[2]">
          <p class="inputSubtitle marginTop">Interval</p>
          <select v-model="selectedInterval">
            <option v-for="(item, index) in medication.intervalDays" :key="index" :value="item">
              {{ item }}
            </option>
          </select>
        </div>

        <p class="inputSubtitle marginTop">At what time</p>
        <div class="table-wrapper">
          <table>
            <tbody>
              <tr v-for="(item, index) in schedule" :key="index" >
                <td class="align-left" :style="{
                    display: 'flex', alignItems: 'center',
                }">
                  <font-awesome-icon icon="circle-minus" class="circleIcon" @click="deleteSchedule(index)"
                  :style="{color: 'var(--white-lila-border)', marginRight: '0.5rem' }"/>
                  <input type="number" v-model="item.hour" min="0" max="23" 
                  class="inlineNumInput" :style="{ textAlign: 'right' }" /> : 
                  <input type="number" v-model="item.min" min="0" max="59" class="inlineNumInput"/>
                  </td>
                <td class="align-right" :style="{color: 'var(--main-lila-hell)'}">
                  <input type="number" v-model="item.application" min="1" class="inlineNumInput"
                  :style="{ textAlign: 'right' }"
                  />
                  <span v-if="item.application === 1"> application</span>
                  <span v-else> applications</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div @click="addNewTime" :style="{ 
            textAlign: 'left', 
            marginLeft: '0.2rem',
            display: 'flex', cursor: 'pointer',
            }"> 
            <font-awesome-icon icon="circle-plus" class="circleIcon" :style="{
              color: 'var(--main-lila-hell)', marginRight: '0.56em' }"/> 
              Add a Time
          </div>
        </div>

        <p class="inputSubtitle marginTop">Duration</p>
        <div class="table-wrapper">
          <table>
            <tbody>
              <tr :style="{color: 'var(--white-lila-border)' }">
                <td class="align-left">Start Date</td>
                <td class="align-left">End Date</td>
              </tr>
              <tr>
                <td class="align-left">
                  <font-awesome-icon icon="calendar" class="calenderIcon"/>{{ todayDate }}
                </td>
                <td class="align-left">
                  <font-awesome-icon icon="calendar" class="calenderIcon"/>
                  None
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button class="button" @click="nextStep" :disabled="schedule.length === 0"
        :style="{
          backgroundColor: schedule.length === 0 ? 'var(--divider-light-2)' : 'var(--main-lila-hell)',
          color: schedule.length === 0 ? 'var(--divider-light-1)' : 'white'
        }">Next</button>
      </div> 

      <div class="form" :style="{ transform: transform(3)}">
        <div class="selected-text">{{ selectedName }} <br> 
          {{ selectedType }}, {{ selectedStrength }} {{ selectedUnit }}
        </div>
        <img v-bind:src="selectedShapeIndex === null ? '/pill/default.png' : '/pill/' + medication.shapeImageNames[selectedShapeIndex] + '.png'" class="default-img"/>

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

      <div class="form" :style="{ transform: transform(4)}">
        <div class="selected-text">{{ selectedName }} <br> 
          {{ selectedType }}, {{ selectedStrength }} {{ selectedUnit }}
        </div>
        <img 
        :style="{ backgroundColor: selectedBgIndex === null? 'var(--white-lila)' : medication.backgroundColor[selectedBgIndex] }"
        v-bind:src="(selectedShape === null || selectedColorLeft === null || selectedColorRight === null ) ? 
        '/pill/' + medication.shapeImageNames[selectedShapeIndex ?? -1] + '.png' : 
        '/pill/' + selectedShape + '_' + selectedColorLeft + '_' + selectedColorRight + '.png'" 
        class="default-img"/>

        <p class="inputTitle">Choose Colors</p>
        <div v-if="selectedShapeIndex !== null && medication.shapeImageNames[selectedShapeIndex].includes('capsule')">
          <p class="inputSubtitle marginTop">Left Side</p>
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

        <p class="inputSubtitle marginTop" v-if="selectedShapeIndex !== null && !(medication.shapeImageNames[selectedShapeIndex].includes('capsule'))">Shape Color</p>
        <p class="inputSubtitle marginTop" v-else>Right Side</p>
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

        <p class="inputSubtitle marginTop">Background</p>
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

      <div class="form" :style="{ transform: transform(5)}">
        <img 
        :style="{ backgroundColor: selectedBgIndex === null? 'var(--white-lila)' : medication.backgroundColor[selectedBgIndex] }"
        v-bind:src="'/pill/' + selectedShape + '_' + selectedColorLeft + '_' + selectedColorRight + '.png'" 
        class="default-img"/>

        <p class="inputTitle"> {{ selectedName }} </p>
        {{ selectedType }}, {{ selectedStrength }} {{ selectedUnit }}

        <p class="inputSubtitle marginTop">Schedule</p>
        <div class="table-wrapper">
          <table>
            <tbody>
              <tr v-if= "selectedSchedule?.includes('Every Day') ">
                <td colspan="2" class="align-left" :style="{ borderBottom: '1px solid white' }">{{ selectedSchedule }}</td>
              </tr>
              <tr v-if= "selectedSchedule?.includes('Specific') ">
                <td colspan="2" class="align-left" :style="{ borderBottom: '1px solid white' }">{{ selectedDays }}</td>
              </tr>
              <tr v-if= "selectedSchedule?.includes('Every Few Days') ">
                <td colspan="2" class="align-left" :style="{ borderBottom: '1px solid white' }">{{ selectedInterval }}</td>
              </tr>
              <tr v-for="(item, index) in schedule" :key="index" class="align-left">
                <td>{{ item.hour < 10 ? '0' + item.hour : item.hour }}:{{ item.min }} </td>
                <td>{{ item.application > 1? item.application + ' applications' : item.application + ' application'}}</td>          
              </tr>
              <tr class="align-left">
                <td colspan="2" class="align-left" :style="{ borderTop: '1px solid white', color: 'var(--white-lila-border)' }">Starts on {{ todayDate }}
                </td>
              </tr> 
            </tbody>
          </table>
        </div>
      
        <button class="button" @click="done" :style="{ backgroundColor: 'var(--main-lila-hell)', color: 'white' }">Done</button>
      </div> 
    </div>     
  </div>
</template>

<style scope>
.container_Add{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: white;
  transition-duration: 500ms;
  z-index: 100;
  top: 0;
}

.container_Add::-webkit-scrollbar {
  display: none;
}

.topIcon{
  color: var(--main-lila-hell);
  padding: 0.5rem 0.5rem 0 0.5rem;
  position: fixed;
  cursor: pointer;
}

.closeIcon{
  font-size: 1.4rem;
  right: 0.4rem;
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
  padding-top: 3.2rem;
  }

.form {
  transition-duration: 500ms;
  background-color: white;
  position: fixed;
  width: 100%;
  height: calc(100vh - 3.2rem);
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
  margin-bottom: 3rem;
}

.inputTitle{
  font-size: 1.6rem;
  margin-bottom: 0.4rem;
  font-weight: 500;
}

.inputSubtitle{
  font-size: 1rem;
  margin-bottom: 0.4rem;
  margin-left: 25%;
  text-align: left;
}

.marginTop {
  margin-top: 2rem;
}

input[type=text],
.inputNum,
.radioSelection,
select, .button,
.week-wrapper,
.table-wrapper,
.image-wrapper,
.palette-wrapper{
  width: 50%;
  margin: auto;
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

input[type=radio],
input[type=checkbox] {
  opacity: 0;
  position: absolute;
}

.radioLabel{
  padding-left: 0.4rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=text],
.inputNum,
select {
  background-color: var(--white-lila);
  border: none;
  border-radius: 0.8rem;
  height: 2.4rem;
  font-size: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  outline: none;
  -moz-appearance: textfield;
}

.inlineNumInput {
  -moz-appearance: textfield;
  background-color: var(--white-lila);
  border: none;
  width: 1.3rem;
  height: 1.2rem;
  color: var(--main-lila-hell);
  font-size: 0.96rem;
}

select{
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.65rem auto;
  cursor: pointer;
  color: black;
}

input[type=text]:focus {
  border: none;
}

::placeholder {
  color: var(--white-lila-border);
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Edge 12-18 */
  color: var(--white-lila-border);
}

.circleIcon {
  font-size: 1.2rem;
  cursor: pointer;
  align-self: center;
}

.calenderIcon {
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--white-lila-border);
  margin-right: 0.3rem;
}

.button {
  height: 2.6rem;
  border: none;
  border-radius: 0.8rem;
  font-size: 1rem;
  left: 10%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  cursor: pinter;
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

.week-label {
  position: absolute;
  top: 50%;
  transform: translate(-50%,-50%);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 1rem;
}

.table-wrapper {
  background-color: var(--white-lila);
  padding: 0.4rem 0.6rem;
  border-radius: 0.8rem;
}

table{
  width: 100%;
}

tr {
  border-bottom: 1px solid white;
}

td {
  width: 50%;
  height: 2rem;
}

.align-left{
  text-align: left;
}

.align-right{
  text-align: right;
}

.image-wrapper{
  display: grid;
  grid-template-columns: repeat(4, auto);
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
  width: 14rem;
  margin-bottom: 0.5rem;
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

@media screen and (max-aspect-ratio: 1) {
  input[type=text],
  .inputNum,
  .radioSelection,
  .button,
  select,
  .week-wrapper,
  .table-wrapper,
  .image-wrapper,
  .palette-wrapper {
    width: 90%;
  }

  .button{
    left: 3%;
    cursor: pointer;
  }

  .inputSubtitle{
    margin-left: 6%;
  }

  .default-img {
    width: 10rem;
  }

  .palette {
    width:70%;
  }
}
</style>