<script setup lang="ts">
import { ref } from 'vue'

const now = new Date()
const battery = ref<number>(100)
const status = ref<string>("In Use")
const age = ref<number>(0)

const calcBattery = () => {
  battery.value = now.getHours() > 6 ? 100 - ((now.getHours() - 7) * 5) : 100
  if (now.getHours() ){
    status.value = "In Use"
  }else {
    status.value = "charging"
  }
}

const calcAge = () => {
  const birthDate = new Date(1950,9,10)
  const today = new Date()
  
  age.value = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age.value--
  }
}
calcBattery()
calcAge()
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
        <font-awesome-icon icon="calendar-day" class="icon" />
        <span :style="{ color: 'var(--white-lila-dunkel)' }">Age</span>
        <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
        <div>
          <span class="value-text">{{ age }}</span>
          <span class="unit">years</span>
        </div>
      </div>

      <div class="card-wrapper">
        <font-awesome-icon icon="person-arrow-up-from-line" class="icon" />
        <span :style="{ color: 'var(--white-lila-dunkel)' }">Height</span>
        <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
        <div>
          <span class="value-text">180</span>
          <span class="unit">cm</span>
        </div>
      </div>

      <div class="card-wrapper">
        <font-awesome-icon icon="weight-scale" class="icon" />
        <span :style="{ color: 'var(--white-lila-dunkel)' }">Weight</span>
        <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
        <div>
          <span class="value-text">68</span>
          <span class="unit">kg</span>
        </div>
      </div>

      <p class="input-subtitle margin-top"> Emergency Contact 
        <font-awesome-icon icon="star-of-life" class="heart-pulse"/>
      </p>
      <div class="card-wrapper contact">
        <font-awesome-icon icon="user" class="icon" />
        <span>Jane Deo</span>
        <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
        <div>
          <span :style="{ color:'var(--white-lila-dunkel)', textDecoration: 'none' }">+49 1354 321354</span>
        </div>
      </div>

      <div class="card-wrapper contact">
        <font-awesome-icon icon="user-doctor" class="icon"/>
        <span>Dr. Smith</span>
        <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
        <div>
          <span :style="{ color:'var(--white-lila-dunkel)', textDecoration: 'none' }">+49 654 31535</span>
        </div>
      </div>

      <p class="input-subtitle margin-top"> Device Info</p>
      <div>
        <div class="table-wrapper" :style="{ padding: '.6rem 1rem 0.1rem 1rem' }">
          <div :style="{ textAlign: 'right', verticalAlign: 'top'}">
            <div>
              <div v-if="battery > 75"> 
                <font-awesome-icon icon="battery-full" class="icon" />
                <span :style="{ color: 'var(--white-lila-dunkel)' }">{{battery}}%</span>
              </div>
              <div v-if="battery <= 75 && battery > 50"> 
                <font-awesome-icon icon="fa-solid fa-battery-three-quarters" class="icon" />
                <span :style="{ color: 'var(--white-lila-dunkel)' }">{{battery}}%</span>
              </div>
              <div v-if="battery <= 50 && battery > 25"> 
                <font-awesome-icon icon="fa-solid fa-battery-half" class="icon" />
                <span :style="{ color: 'var(--white-lila-dunkel)' }">{{battery}}%</span>
              </div>
              <div v-if="battery <= 25 && battery > 0"> 
                <font-awesome-icon icon="fa-solid fa-battery-quarter" class="icon" />
                <span :style="{ color: 'var(--white-lila-dunkel)' }">{{battery}}%</span>
              </div>
            </div>
          </div>
          <div :style="{ textAlign: 'center' }">
            <img src="/watch.png" class="watch"/>
          </div>
          <div :style="{ textAlign: 'center' }">
            <span class="box-name" :style="{ textAlign: 'center' }">Caregem Pro </span>
          </div>
          <table :style="{  margin: '1rem auto', borderCollapse: 'collapse' }">
            <tbody>
              <tr>
                <td class="td-height" :style="{ color: 'var(--white-lila-dunkel)' }">Syncing <font-awesome-icon icon="rotate" class="icon"/></td>
                <td class="td-height align-right" :style="{ color: 'var(--white-lila-dunkel)' }">
                  Updated 1 min ago
                </td>
              </tr>
              <tr>
                <td class="td-height">Serial Number</td>
                <td class="td-height align-right">KR21354324</td>
              </tr>
              <tr>
                <td class="td-height">Since</td>
                <td class="td-height align-right">1 January 2023</td>
              </tr>
              <tr>
                <td class="td-height">Status</td>
                <td class="td-height align-right">{{ status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button class="button" :style="{ 
        marginBottom: '0rem', backgroundColor: 'var(--white-lila)', color: 'var(--white-lila-dunkel)',
        borderRadius: '0.8rem 0.8rem 0 0', borderBottom: '2px solid white', fontSize: '0.94rem'
        }">Add Account</button>
      <button class="button" :style="{ 
        marginTop: '0rem', backgroundColor: 'var(--white-lila)', color: 'var(--white-lila-dunkel)',
        borderRadius: '0 0 0.8rem 0.8rem', fontSize: '0.94rem', 
        }">Switch Account</button>
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

  .contact {
    padding: 1rem 0 1rem 1rem;
  }

  .watch{
    height: 10rem;
    margin: auto;
  }

  .value-text{
    margin-top:1rem;
    font-size: 1.8rem;
    color: var(--main-lila-hell);
  }

  .unit{
    margin-left: 0.4rem;
    color: var(--white-lila-dunkel);
  }

@media (min-width: 1024px) {

}
</style>
