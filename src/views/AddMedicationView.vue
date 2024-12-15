<script setup lang="ts">
import * as medication from '../global_array/medicationInfo'
import { ref } from 'vue'

let step = ref(0)
const selectedType = ref<string>('');
const selectedUnit = ref<string>('');

console.log(selectedType.value)

const nextStep = () => {
  step.value = step.value + 1;
}

const backStep = () => {
  step.value = step.value - 1;
}

console.log(selectedType.value !== "" )

let buttonStyleType = {
  backgroundColor: selectedType.value === "" ? 'var(--divider-light-2)' : 'red',
  color: selectedType.value === "" ? 'var(--divider-light-1)' : 'white'
}

let buttonStyleUnit = {
  backgroundColor: selectedUnit.value === "" ? 'var(--divider-light-2)' : 'red',
  color: selectedType.value === "" ? 'var(--divider-light-1)' : 'white'
}

</script>

<template>
  <div class="container_Add">
    <span class="closeIcon topIcon"><slot name="close"></slot></span>
    <span class="backIcon topIcon" @click="backStep" v-if="step !== 0">
      <font-awesome-icon icon="fa-solid fa-chevron-left"/>
      <span>Back</span>
    </span>

    <div class="form-wrapper">
      <div>
        <p class="inputTitle">Medication Name</p>
        <input type="text" placeholder="Add Medication Name" />

        <p class="inputTitle marginTop">Medication Type</p>
        <div>
          <label v-for="type in medication.types" class="radioSelection radioType">
            <span class="radioLabel">{{type}}</span>
            <input type="radio" :name="'medication_type'" :value="type" v-model="selectedType" >
            <font-awesome-icon icon="check" class="checkmark"/>
          </label>
        </div>
        <button class="button" @click="nextStep" :style="buttonStyleType">Next</button>
      </div>




      <div>
        <p class="inputTitle marginTop">Medication Strength</p>
        <p class="inputSubtitle">Strength </p>
        <input type="number" placeholder="Add Strength" />

        <p class="inputSubtitle marginTop">Units</p>
        <div>
          <label v-for="unit in medication.units" class="radioSelection radioUnit">
            <span class="radioLabel">{{unit}}</span>
            <input type="radio" :name="'medication_type'" :value="unit" v-model="selectedUnit">
            <font-awesome-icon icon="check" class="checkmark"/>
          </label>
        </div>
        <button class="button" @click="nextStep" :style="buttonStyleUnit">Next</button>
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
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
  margin-bottom: 3rem;
}

.container_Add::-webkit-scrollbar {
  display: none;
}

.topIcon{
  font-size: 1.4rem;
  color: var(--main-lila-hell);
  padding: 0.5rem;
}

.closeIcon{
  float: right;
  margin: 0 0.5rem 0 0;
}

.backIcon{
  float: left;
  margin: 0.4rem 0 0 0.4rem;
}

.backIcon span {
  font-size: 1rem;
  margin: 0 0 0 0.4rem;
}

.form-wrapper {
  margin: auto;
  width: 50vw;
  text-align: center;
  padding-top: 4rem;
}

.inputTitle{
  font-size: 1.6rem;
  margin-bottom: 0.4rem;
}

.inputSubtitle{
  font-size: 1rem;
  margin-bottom: 0.4rem;
  margin-left: 10%;
  text-align: left;
}

.marginTop {
  margin-top: 2rem;
}

.radioSelection{
  display: block;
  width: 80%;
  margin: auto;
  padding: 0.3rem 0.6rem;
  background-color: var(--white-lila);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
}

.radioType:first-child,
.radioUnit:first-child {
  border-radius: 0.8rem 0.8rem 0 0;
  padding-top: 0.6rem;
}

.radioType:last-child,
.radioUnit:last-child {
  border-radius: 0 0 0.8rem .8rem;
  padding-bottom: 0.6rem;
}

.checkmark {
  position: absolute;
  margin: auto;
  right: 1rem;
  font-size: 1.2rem;

}

input[type=radio]:checked ~ .checkmark{
  display: block;
}

input[type=radio] {
  opacity: 0;
}

.radioSelection{
  text-align: left;
}

.radioLabel{
  padding-left: 0.4rem
}

input[type=text],
input[type=number] {
  background-color: var(--white-lila);
  border: none;
  border-radius: 0.8rem;
  width: 80%;
  height: 2.4rem;
  font-size: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  outline: none;
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

.button {
  width: 94%;
  height: 2.6rem;
  border: none;
  border-radius: 0.8rem;
  font-size: 1rem;
}

@media screen and (max-aspect-ratio: 1) {
  .form-wrapper {
    width: 100vw;
  }

  input[type=text],
  input[type=number],
  .radioSelection {
    width: 94%;
  }

  .inputSubtitle{
    margin-left: 3%;
  }
}
</style>