import { getRandomNumber, getOrCreateTooltip, year, monthArray } from './global_label'
import { array2 as arrayMonth6 } from './speedMonth6'

const array2: number[][] = [];
const labelArray: string[] = year

for (let i: number = 0; i < year.length/2; i++) {
  let random: number[] = [getRandomNumber(2, 3),getRandomNumber(4, 5)]
  array2.push(random)
}

for (let i: number = 0; i < year.length/2; i++) {
  array2.push(arrayMonth6[i])
}

const tupleArray: (number | [number, number] | null)[] = array2.map(subArray => {
  if (subArray.length === 2) {
      return [subArray[0], subArray[1]]; // Convert sub-array to tuple
  }
  return null; // Or handle cases where sub-array length is not 2
});

export const array = () => {
  let arrayNum: number[] = [];
  for (let i: number = 0; i < array2.length; i++) {
    for (let j: number = 0; j < array2[i].length; j++) {
      if(array2[i][j] > 0) arrayNum.push(array2[i][j])
    }
  }
  return arrayNum
}

export const datasets = () => ({
  labels: labelArray,
  datasets: [
    {
      label: '',
      backgroundColor: 'rgb(20, 165, 255)',
      borderRadius: 6,
      data: tupleArray,
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
            td.style.fontSize = '24px'
            td.style.letterSpacing = '-0.8px'
            td.style.color = '#4b4b4b'
            td.style.fontWeight = '600'    

            let newBody: string = body[0].replace("[", "")
            newBody = newBody.replace("]", "")
            newBody = newBody.replace(", ", "-")
            const text = document.createTextNode(newBody)     
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

          const unit = document.createTextNode(" km/h")
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
      max: 8,
      ticks: {
        color: 'rgba(190,190,190,1)',
        callback: function(value: string | number, index: number, ticks: any): string | number {
          if (index % 2 != 0){
            return ''
          }
          return value + " km/h"
        },
      },
      grid: {
        display: true,
      },
    }
  }
}
