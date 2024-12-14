import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faPlus,
  faCalendarDay,
  faPills,
  faChartColumn,
  faHeartPulse,
  faBed,
  faShoePrints,
  faPersonWalkingDashedLineArrowRight 
} from '@fortawesome/free-solid-svg-icons'

/* add each imported icon to the library */
library.add(faPlus,faCalendarDay,faPills,faChartColumn,faHeartPulse,faBed,faShoePrints,faPersonWalkingDashedLineArrowRight)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')