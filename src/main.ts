import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faPlus, faXmark, faCheck, faCircleMinus, faCirclePlus,
  faCalendarDay, faCalendar,
  faPills,
  faChartColumn,
  faHeartPulse,
  faBed, 
  faShoePrints,
  faPersonWalkingDashedLineArrowRight,
  faChevronRight,faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

/* add each imported icon to the library */
library.add(faCircleMinus, faCirclePlus,faChevronLeft,faCheck,faXmark,faChevronRight,
  faPlus,faCalendarDay,faCalendar,
  faPills,faChartColumn,faHeartPulse,faBed,faShoePrints,faPersonWalkingDashedLineArrowRight)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')