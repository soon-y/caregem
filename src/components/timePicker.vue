<script setup lang="ts">
import { ref } from 'vue'

const scrolledHour = ref<HTMLElement | null>(null);
const scrolledMin = ref<HTMLElement | null>(null);
const scrollTopHour = ref(0)
const scrollTopMin = ref(0)
const finalHour = ref<number>(0)
const finalMin = ref<number>(0)
const display = ref<string>("block")
let hourArray: string[] = []
let minArray: string[] = []
let nbsp = "\u00A0"

for(let i:number = 0; i < 2; i++){
    hourArray.push(nbsp)
    minArray.push(nbsp)
  }

for(let i:number = 0; i < 24; i++){
  hourArray.push((i < 10) ? '0' + i.toString() : i.toString())
}

for(let i:number = 0; i < 60; i++){
  minArray.push((i < 10) ? '0' + i.toString() : i.toString())
}

const close = () => {
  display.value = 'none'
  console.log(finalHour.value +' '+ finalMin.value)
}

const onScrollHour = () => {
  if (scrolledHour.value) {
    scrollTopHour.value = scrolledHour.value.scrollTop;
  }
  finalHour.value = scrollTopHour.value/32
}

const onScrollMin = () => {
  if (scrolledMin.value) {
    scrollTopMin.value = scrolledMin.value.scrollTop;
  }
  finalMin.value = scrollTopMin.value/32
}

</script>
<template>
  <div class="container" @click="close"
  :style="{ backgroundColor:'gray', display: display, top: 0}">
    <div class="modal-wrapper">
      <div class='selection-bar'>
      </div>
      
      <div class='timePicker-wrapper'>
        <div class='timePicker' @scroll="onScrollHour" ref="scrolledHour" >
          <p v-for="(item ,index) in hourArray" :key="index" class="timeArray"> {{ item }} </p>
        </div>
        <div class='timePicker' @scroll="onScrollMin" ref="scrolledMin" >
        <p v-for="(item ,index) in minArray" :key="index" class="timeArray"> {{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper{
  --height: 2rem;

  width: 8rem;
  height: auto;
  border-radius: 0.8rem;
  background-color: var(--white-lila);
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%,-60%);
  margin: 0;
}

.timePicker-wrapper{
  display: grid;
  grid-template-columns: auto auto;
  width: 100%;
  margin: auto;
}

.selection-bar{
  background: var(--white-lila-border);
  height: var(--height);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 90%;
  margin-left: 5%;
  border-radius: 0.4rem;
}

.timePicker {
  height: calc(var(--height) * 5);
  display: grid;
  grid-auto-rows: var(--height);
  overflow-y: auto;
  overscroll-behavior-y: contain;
  scroll-snap-type: y mandatory;
}

.timePicker::-webkit-scrollbar {
  display: none;
}

.timePicker p {
  height: var(--height);
  line-height: var(--height);
  color: var(--main-lila-hell)
}

.timePicker p:last-child {
  padding-bottom: calc( var(--height) * 3 );
}

.timeArray {
  scroll-snap-align: center;
  position: relative;
  font-size: 1rem;
  text-align: center;
}
</style>
