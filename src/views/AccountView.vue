<script setup lang="ts">
import { ref } from 'vue'
import Box from '../components/Box.vue'

const now = new Date()
const battery = ref<number>(100)
const status = ref<string>("In Use")

const calcBattery = () => {
  battery.value = 100 - ((now.getHours() - 7) * 5)
  if (now.getHours() ){
    status.value = "In Use"
  }else {
    status.value = "charging"
  }
}
calcBattery()
</script>

<template>
  <div class="container">
    <div class="content-wrapper">
      <div>
        <img src="/portrait.jpg" class="account-img"/>
      </div>

    <div>
      <h1 class="center" :style="{ padding: '1rem 0' }">John Deo</h1>
    </div>

    <div class="card-wrapper">
      <font-awesome-icon icon="person-arrow-up-from-line" class="icon" />
      <span :style="{ color: 'var(--white-lila-dunkel)' }">Height</span>
      <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
      <div>
        <span class="value">180</span>
        <span class="unit">cm</span>
      </div>
    </div>

    <div class="card-wrapper">
      <font-awesome-icon icon="weight-scale" class="icon" />
      <span :style="{ color: 'var(--white-lila-dunkel)' }">Weight</span>
      <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
      <div>
        <span class="value">68</span>
        <span class="unit">kg</span>
      </div>
    </div>

    <p class="input-subtitle margin-top"> Device </p>
      <Box>
        <template v-slot:image>
          <img src="/watch.png" />
        </template>
        <template v-slot:name> Caregem Pro </template>
        <template v-slot:sync>
          Syncing <font-awesome-icon icon="rotate" class="icon"/>
        </template>
        <template v-slot:update>
          Updated 1 min ago
        </template>
        <template v-slot:number>KR21354324 </template>
        <template v-slot:schedule>1 January 2023 </template>
        <template v-slot:status> {{ status }} </template>
        <template v-slot:battery v-if="battery > 75"> 
          <font-awesome-icon icon="battery-full" class="icon" />
          <span :style="{ color: 'var(--white-lila-dunkel)' }">{{battery}}%</span>
        </template>
         <template v-slot:battery v-if="battery <= 75 && battery > 50"> 
          <font-awesome-icon icon="fa-solid fa-battery-three-quarters" class="icon" />
          <span :style="{ color: 'var(--white-lila-dunkel)' }">{{battery}}%</span>
        </template>
        <template v-slot:battery v-if="battery <= 50 && battery > 25"> 
          <font-awesome-icon icon="fa-solid fa-battery-half" class="icon" />
          <span :style="{ color: 'var(--white-lila-dunkel)' }">{{battery}}%</span>
        </template>
        <template v-slot:battery v-if="battery <= 25 && battery > 0"> 
          <font-awesome-icon icon="fa-solid fa-battery-quarter" class="icon" />
          <span :style="{ color: 'var(--white-lila-dunkel)' }">{{battery}}%</span>
        </template>
      </Box>
  </div>
</div>

</template>

<style scope>
  .account-img {
    object-fit: cover;
    border-radius: 50%;
    width: 30%;
    aspect-ratio: 1 / 1; 
    margin: auto;
    margin-top: 1.5rem;
    display: block;
  }

  .icon{
    color: var(--white-lila-dunkel);
    margin: 0 0.4rem 0 0.2rem;
    font-size: 1rem;
  }

  .card-wrapper{
    width: 100%;
    background-color: var(--white-lila);
    border-radius: 0.8rem;
    margin-bottom: 1rem;
    padding: 1rem 0 0.4rem 1rem;
  }

  .value{
    margin-top:1rem;
    font-size: 2rem;
  }

  .unit{
    margin-left: 0.4rem;
    color: var(--white-lila-dunkel);
  }

@media (min-width: 1024px) {

}
</style>
