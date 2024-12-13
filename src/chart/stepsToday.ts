import { getRandomNumber, getOrCreateTooltip, today } from './global_label'

const array: number[] = [];
const currentHour: number = new Date().getHours();
const sleep: number = 22;
const awake: number = 6;
const labelArray: number[] = today

for (let i: number = 0; i < awake; i++) {
  array.push(0)
}

for (let i: number = awake; i <= currentHour; i++) {
  if(i <= sleep){
    array.push(getRandomNumber(10, 700))
  }else {
    array.push(0)
  }
}

export const climbed = getRandomNumber(1,10)
export const totalValue: number = array.reduce((a:number, b:number) => a+b, 0 )
const durationValue: number = parseFloat((totalValue / 6000).toFixed(1))
export const durationHour: number = Math.floor(durationValue)
const mins: number = Math.floor((durationValue - durationHour) * 60)
export const durationMins: string = mins < 10? "0" + mins.toString() : mins.toString()
export const distanceValue: number = parseFloat(((totalValue*7.5)/10000).toFixed(1))

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
      beginAtZero: false,
      min: 0,
      max: 1000,
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
