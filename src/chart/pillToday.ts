import { today } from './global_label'
import * as pill from '../global_array/medicationInfo'
import type { ChartType } from 'chart.js';

const labelArray: number[] = today
const maxInArray: number[] = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];
for (let i: number = 0; i < pill.pillTime.length; i++){
  maxInArray[pill.pillTime[i]] = maxInArray[pill.pillTime[i]] + pill.application[i]
}

let n:number = 0
interface ChartInterface {
  type?: ChartType;
  label: string,
  backgroundColor: string,
  data: (number | null)[];
}

let objs: object[] = [{
  label: pill.name[0],
  backgroundColor: pill.bgColor[0],
  data: maxInArray,
}]

for (let i: number = 0; i < pill.name.length; i++){
  let arrayData:number[] = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ];
  for (let j: number = n; j < n + pill.times[i]; j++){
    arrayData[pill.pillTime[j]] = pill.application[j]
  }
  n = n + pill.times[i]

  let obj: ChartInterface = {
    label: pill.name[i],
    backgroundColor: pill.bgColor[i],
    data: arrayData,
  }
  objs.push(obj)
}

export const datasets = () => ({
  labels: labelArray,
  datasets: [{
    label: pill.name[0],
    backgroundColor: pill.bgColor[0],
    data: [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  },{
    label: pill.name[1],
    backgroundColor: pill.bgColor[1],
    data: [0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0],
  },
]})

console.log(datasets().datasets)

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
        const lineHeight: string  = '15px'

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

            let number = Number(title)
            let newTitle: string = number > 12 ? (number-12).toString() + ' pm' : number + ' am' 
            if (number === 0) newTitle = '12 pm'
            const text = document.createTextNode(newTitle)
            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
          })

          const tableBody = document.createElement('tbody');
          bodyLines.forEach((body: string, i: number) => {
            let newBody: string = body[0].split(':')[0]
            let unit: string = body[0].split(':')[1]

            const tr = document.createElement('tr')
            tr.style.backgroundColor = 'inherit'
            tr.style.borderWidth = '0'
            tr.style.lineHeight = lineHeight

            const td = document.createElement('td')
            const br = document.createElement('br')

            td.style.borderWidth = '0'
            td.style.fontSize = '14px'
            td.style.letterSpacing = '-0.8px'
            td.style.color = '#4b4b4b'
            td.style.fontWeight = '600'    

            const text = document.createTextNode(newBody)     
            const textUnit = document.createTextNode(unit + " unit") 
            td.appendChild(text)
            td.appendChild(br)
            td.appendChild(textUnit)
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
        callback: function(value: string | number, index: number, ticks: any): string | number {
          if (index % 6 != 0){
            return ''
          }
          return labelArray[index] < 10 ? "0" + labelArray[index] : labelArray[index]
        }
      },
      grid: {
        display: true,
        color: 'rgba(200,200,200,0.3)'
      }
    },
    y: {
      stacked: true,
      beginAtZero: false,
      min: 0,
      max: Math.max(...maxInArray),
      step: 1,
      ticks: {
        color: 'rgba(190,190,190,1)',
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
    tooltipEl.style.width = '6rem'

    const table = document.createElement('table')
    table.style.margin = '0px'

    tooltipEl.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }
  return tooltipEl
}
