import { getRandom, year, monthArray, sleepYtime, awakeColor, remColor, coreColor, deepColor } from './global_label'

export const array: number[] = [];
const labelArray: string[] = year

let numAwake: number = getRandomNumber(400,450)
let numREM: number = getRandomNumber(100,150)
let numCore: number = getRandomNumber(250,300)
let numDeep: number = getRandomNumber(20,30)

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const awakeHour: number = Math.floor(numAwake/60)
export const awakeMins: string = (numAwake - awakeHour*60) < 10? "0" + (numAwake - awakeHour*60).toString() : (numAwake - awakeHour*60).toString()
export const remHour: number = Math.floor(numREM/60)
export const remMins: string = (numREM - remHour*60) < 10? "0" + (numREM - remHour*60).toString() : (numREM - remHour*60).toString()
export const coreHour: number = Math.floor(numCore/60)
export const coreMins: string = (numCore - coreHour*60) < 10? "0" + (numCore - coreHour*60).toString() : (numCore - coreHour*60).toString()
export const deepHour: number = Math.floor(numDeep/60)
export const deepMins: string = (numDeep - deepHour*60) < 10? "0" + (numDeep - deepHour*60).toString() : (numDeep - deepHour*60).toString()

export const datasets = () => ({
  labels: labelArray,
  datasets: [
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,1, 1),
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: getRandom(year.length ,0, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,0, 5),
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: getRandom(year.length ,0, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,0, 5),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,0, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,1, 1),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,0, 8),
      borderSkipped: true,
    },

    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'Awake',
      backgroundColor: awakeColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 5),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,-2, 8),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,-2, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,-3, 8),
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: getRandom(year.length ,-2, 10),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 4),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 5),
      borderSkipped: true,
    },
    {
      label: 'Awake',
      backgroundColor: awakeColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 10),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,-3, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,-3, 5),
      borderSkipped: true,
    },

    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,-2, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,-2, 8),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 10),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 4),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 4),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(year.length ,-1, 4),
      borderSkipped: true,
    },
  ]
})

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false as const,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: function(context: { chart: any, tooltip: any }){
        const {chart, tooltip} = context
        const tooltipEl = getOrCreateTooltip(chart)
        const lineHeight: string  = '18px'

        // Hide if no tooltip
        // if (tooltip.opacity === 0) {
        //   tooltipEl.style.opacity = '0'
        //   return
        // }

        // Set Text
        if (tooltip.body) {
          const titleLines = tooltip.title || []
          const bodyLines = tooltip.body.map((b: any) => b.lines)

          const tableHead = document.createElement('thead')
          titleLines.forEach((title: string) => {
            const tr = document.createElement('tr')
            tr.style.borderWidth = '0'
            tr.style.lineHeight = lineHeight

            const th = document.createElement('th')
            th.style.borderWidth = '0'
            th.style.textAlign = 'left'
            th.style.fontSize = '14px'
            th.style.letterSpacing = '-0.5px'

            let newTitle: string = ""
            if (title === monthArray[0]){
              newTitle = "January"
            } else if (title === monthArray[1]){
              newTitle = "February"
            } else if (title === monthArray[2]){
              newTitle = "March"
            } else if (title === monthArray[3]){
              newTitle = "April"
            } else if (title === monthArray[4]){
              newTitle = "May"
            } else if (title === monthArray[5]){
              newTitle = "June" 
            } else if (title === monthArray[6]){
              newTitle = "July"
            } else if (title === monthArray[7]){
              newTitle = "August"
            } else if (title === monthArray[8]){
              newTitle = "September"
            } else if (title === monthArray[9]){
              newTitle = "October"
            } else if (title === monthArray[10]){
              newTitle = "November"
            } else if (title === monthArray[11]){
              newTitle = "December"
            } 
            const text = document.createTextNode(newTitle)
            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
          })

          const tableBody = document.createElement('tbody');
          bodyLines.forEach((body: string, i: number) => {
            const tr = document.createElement('tr')
            tr.style.backgroundColor = 'inherit'
            tr.style.borderWidth = '0'
            tr.style.lineHeight = lineHeight

            const td = document.createElement('td')
            td.style.borderWidth = '0'
            td.style.fontSize = '20px'
            td.style.letterSpacing = '-0.8px'
            td.style.color = '#4b4b4b'
            td.style.fontWeight = '600' 

            let newBody: string = body[0].split(':')[0]
            let time: number = Math.floor(Math.abs(Number(body[0].split(':')[1]))*60)

            const text1 = document.createTextNode(newBody)   
            td.appendChild(text1)
            tr.appendChild(td)
            tableBody.appendChild(tr)

            const timetr = document.createElement('tr')
            timetr.style.backgroundColor = 'inherit'
            timetr.style.borderWidth = '0'
            timetr.style.lineHeight = lineHeight
  
            const timetd = document.createElement('td')
            timetd.style.borderWidth = '0'
            timetd.style.fontSize = '14px'
  
            const text2 = document.createTextNode(time +" mins") 
            timetd.appendChild(text2)
            timetr.appendChild(timetd)
            tableBody.appendChild(timetr)            
          })

          const tableRoot = tooltipEl.querySelector('table') as HTMLTableElement

          // Remove old children
          while (tableRoot.firstChild) {
            tableRoot.firstChild.remove()
          }

          // Add new children
          tableRoot.appendChild(tableHead)
          tableRoot.appendChild(tableBody)
      }

      const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas
        // Display, position, and set styles for font
        tooltipEl.style.opacity = '1'
        tooltipEl.style.left = positionX + tooltip.caretX + 'px'
        tooltipEl.style.top = positionY + 'px'
        tooltipEl.style.font = tooltip.options.bodyFont.string
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
      }
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        maxRotation: 0,
        color: 'rgba(190,190,190,1)',
      },
      grid: {
        display: true,
        color: 'rgba(200,200,200,0.3)'
      }
    },
    y: {
      stacked: true,
      beginAtZero: false,
      min: -6,
      max: 6,
      ticks: {
        color: 'rgba(190,190,190,1)',
        stepSize: 1,
        callback: function(value: string | number, index: number, ticks: any): string | number {
          if (index % 2 != 0){
            return ''
          }
          return sleepYtime[index]
        },
      },
      grid: {
        display: false,
      },
    }
  }
}

const getOrCreateTooltip = (chart: any): HTMLElement => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div')

  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.style.background = 'rgba(200,200,200,0.3)'
    tooltipEl.style.borderRadius = '10px'
    tooltipEl.style.color = 'black'
    tooltipEl.style.opacity = 1
    tooltipEl.style.pointerEvents = 'none'
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.transform = 'translate(-70%, -100%)'
    tooltipEl.style.transition = 'all .1s ease'
    tooltipEl.style.width = '5.5rem'

    const table = document.createElement('table')
    table.style.margin = '0px'

    tooltipEl.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }
  return tooltipEl
}