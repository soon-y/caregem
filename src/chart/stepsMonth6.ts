import { getRandomNumber, getOrCreateTooltipKruz, month, month6, monthArray, date, NumOfDays } from './global_label'
import { avgValue as avgValueThisMonth, array as arrayMonth } from './stepsMonth'

export const array: number[] = [];
const labelArray: string[] = month6
export const climbed: number = getRandomNumber(5,10)
const lastMonth: number = Number(month[0]) === 1? month6.length-1 : month6.length-2

for (let i: number = 0; i < lastMonth; i++) {
  array.push(getRandomNumber(3000, 10000))
}

if(lastMonth === month6.length-1){
  array.push( avgValueThisMonth )
}else {
  let firstArray: number[] = []
  let lastArray: number[] = []

  for (let i: number = 0; i < (NumOfDays-date); i++) {
    firstArray.push(arrayMonth[i])
  }
  array.push( Math.floor(firstArray.reduce((a:number, b:number) => a+b, 0 )/firstArray.length))

  for (let i: number = 1; i <= date; i++) {
    lastArray.push(arrayMonth[arrayMonth.length - i])
  }
  array.push( Math.floor(lastArray.reduce((a:number, b:number) => a+b, 0 )/lastArray.length))
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
            tr.style.lineHeight = lineHeight +'px'

            const td = document.createElement('td')
            td.style.borderWidth = '0'
            td.style.fontSize = '24px'
            td.style.letterSpacing = '-0.8px'
            td.style.color = '#4b4b4b'
            td.style.fontWeight = '600'    

            const text = document.createTextNode(body)     

            const span = document.createElement('span')
            span.style.fontSize = '14px'

            const unit = document.createTextNode(" steps")
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