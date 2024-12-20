import { getRandomNumber, getOrCreateTooltipKruz, getRandom, month, date, monthArray, monthNum, sleepYtime, awakeColor, remColor, coreColor, deepColor } from './global_label'

export const array: number[] = [];
const labelArray: string[] = month

let numAwake: number = getRandomNumber(400,450)
let numREM: number = getRandomNumber(100,150)
let numCore: number = getRandomNumber(250,300)
let numDeep: number = getRandomNumber(20,30)

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
      data: getRandom(month.length-1 ,1, 1),
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,0, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,0, 5),
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,0, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,0, 5),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,0, 7),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,1, 1),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,0, 8),
      borderSkipped: true,
    },

    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'Awake',
      backgroundColor: awakeColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 5),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-2, 8),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-2, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-3, 8),
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-2, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 4),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 5),
      borderSkipped: true,
    },
    {
      label: 'Awake',
      backgroundColor: awakeColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-3, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-3, 5),
      borderSkipped: true,
    },

    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-2, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-2, 8),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 4),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 4),
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 8),
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: getRandom(month.length-1 ,-1, 4),
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
        const tooltipEl = getOrCreateTooltipKruz(chart)
        const lineHeight: number = 18

        // Set Text
        if (tooltip.body) {
          const titleLines = tooltip.title || []
          const bodyLines = tooltip.body.map((b: any) => b.lines)

          const tableHead = document.createElement('thead')
          titleLines.forEach((title: string) => {
            const tr = document.createElement('tr')
            tr.style.borderWidth = '0'
            tr.style.lineHeight = lineHeight +'px'

            const th = document.createElement('th')
            th.style.borderWidth = '0'
            th.style.textAlign = 'left'
            th.style.fontSize = '14px'
            th.style.letterSpacing = '-0.5px'

            let month: number = 0
            if(Number(title) <= date) {
              month = monthNum
            }else {
              month = monthNum - 1 < 0 ? monthNum - 1 + 12 : monthNum - 1
            }
            const text = document.createTextNode(monthArray[month] + " " + title)
            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
          })

          const tableBody = document.createElement('tbody');
          bodyLines.forEach((body: string, i: number) => {
            const tr = document.createElement('tr')
            tr.style.backgroundColor = 'inherit'
            tr.style.borderWidth = '0'
            tr.style.lineHeight = lineHeight +'px'

            const td = document.createElement('td')
            td.style.borderWidth = '0'
            td.style.fontSize = '20px'
            td.style.letterSpacing = '-0.8px'
            td.style.color = '#4b4b4b'
            td.style.fontWeight = '600' 

            let newBody: string = body[0].split(':')[0]
            let time: number = Math.floor(Math.abs(Number(body[0].split(':')[1]))*60)
            const text = document.createTextNode(newBody)   
           
            const span = document.createElement('span')
            span.style.fontSize = '14px'

            const unit = document.createTextNode(time +" mins")
            const br = document.createElement('br')
            span.appendChild(unit)

            td.appendChild(text)
            td.appendChild(br)
            td.appendChild(span)
            tr.appendChild(td)
            tableBody.appendChild(tr)
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