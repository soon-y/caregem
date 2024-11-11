import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { faPills } from '@fortawesome/free-solid-svg-icons'
import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faShoePrints } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'



/* add each imported icon to the library */
library.add(faCalendarDay,faPills,faChartColumn,faHeartPulse,faBed,faShoePrints,faLocationDot)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')


//<font-awesome-icon icon="fa-solid fa-heart-pulse" />
//<font-awesome-icon icon="fa-solid fa-shoe-prints" />
//<font-awesome-icon icon="fa-solid fa-location-dot" />
//<font-awesome-icon icon="fa-solid fa-bed" />