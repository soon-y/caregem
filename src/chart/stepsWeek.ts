import { week } from './global_label'
import { totalValue } from './stepsToday'

const array: number[] = [];
const labelArray: string[] = week

for (let i: number = 0; i < week.length-1; i++) {
  array.push(getRandomNumber(3000, 10000))
}
array.push(totalValue)

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const avgValue: number = Math.floor(array.reduce((a:number, b:number) => a+b, 0 )/array.length)
const durationValue: number = parseFloat((avgValue / 6000).toFixed(1))
export const durationHour: number = Math.floor(durationValue)
const mins: number = Math.floor((durationValue - durationHour) * 60)
export const durationMins: string = mins < 10? "0" + mins.toString() : mins.toString()
export const distanceValue: number = parseFloat(((avgValue*7.5)/10000).toFixed(1))

export const datasets = () => ({
  labels: labelArray,
  datasets: [
    {
      label: '',
      backgroundColor: 'rgb(19, 163, 3)',
      borderRadius: 6,
      data: array,
      borderSkipped: false,
    }
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
            if (title === "Mon"){
              newTitle = "Monday"
            } else if (title ==="Tue"){
              newTitle = "Tuesday"
            } else if (title ==="Wed"){
              newTitle = "Wednesday"
            } else if (title ==="Thu"){
              newTitle = "Thursday"
            } else if (title ==="Fri"){
              newTitle = "Friday"
            } else if (title ==="Sat"){
              newTitle = "Saturday" 
            } else if (title ==="Sun"){
              newTitle = "Sunday"
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
            td.style.fontSize = '24px'
            td.style.letterSpacing = '-0.8px'
            td.style.color = '#4b4b4b'
            td.style.fontWeight = '600'    

            const text = document.createTextNode(body)     
            td.appendChild(text)
            tr.appendChild(td)
            tableBody.appendChild(tr)
          })

          const tableUnit = document.createElement('tbody')

          const tr = document.createElement('tr')
          tr.style.backgroundColor = 'inherit'
          tr.style.borderWidth = '0'
          tr.style.lineHeight = lineHeight

          const td = document.createElement('td')
          td.style.borderWidth = '0'
          td.style.fontSize = '12px'

          const unit = document.createTextNode(" steps")
          td.appendChild(unit)
          tr.appendChild(td)
          tableUnit.appendChild(tr)

          const tableRoot = tooltipEl.querySelector('table') as HTMLTableElement

          // Remove old children
          while (tableRoot.firstChild) {
            tableRoot.firstChild.remove()
          }

          // Add new children
          tableRoot.appendChild(tableHead)
          tableRoot.appendChild(tableBody)
          tableRoot.appendChild(tableUnit)
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
      beginAtZero: false,
      min: 0,
      max: 10000,
      ticks: {
        color: 'rgba(190,190,190,1)',
        callback: function(value: string | number, index: number, ticks: any): string | number {
          if (index % 2 != 0){
            return ''
          }
          return value
        },
      },
      grid: {
        display: true,
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
    tooltipEl.style.width = '5rem'

    const table = document.createElement('table')
    table.style.margin = '0px'

    tooltipEl.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }
  return tooltipEl
}