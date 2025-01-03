import { getRandomNumber, getOrCreateTooltip, month, monthNum, date, monthArray  } from './global_label'
import { array as arrayToday } from './heartToday'

const array2: number[][] = []
const labelArray: string[] = month

for (let i: number = 0; i < month.length-1; i++) {
  let data: number[] = [getRandomNumber(60, 80),getRandomNumber(90, 110)]
  array2.push(data)
}
array2.push( [Math.min(...arrayToday()), Math.max(...arrayToday())] )

const tupleArray: (number | [number, number] | null)[] = array2.map(subArray => {
  if (subArray.length === 2) {
      return [subArray[0], subArray[1]]; // Convert sub-array to tuple
  }
  return null; // Or handle cases where sub-array length is not 2
})

export const array = () => {
  let arrayNum: number[] = [];
  for (let i: number = 0; i < array2.length; i++) {
    for (let j: number = 0; j < array2[i].length; j++) {
      arrayNum.push(array2[i][j])
    }
  }
  return arrayNum
}

export const datasets = () => ({
  labels: labelArray,
  datasets: [
    {
      label: '',
      backgroundColor: 'rgb(243, 5, 148)',
      borderColor: 'rgb(243, 5, 148)',
      borderRadius: 6,
      borderSkipped: false,
      data: tupleArray,
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

            console.log(date)

            let month: number = 0
            if(Number(title) <= date) {
              month = monthNum
            }else {
              month = monthNum - 1 < 0 ? monthNum - 1 + 12 : monthNum - 1
            }
            const text = document.createTextNode( Number(title) === date ? 'Today' : monthArray[month] + " " + title)
            th.appendChild(text)
            tr.appendChild(th)
            tableHead.appendChild(tr)
          })

          const tableBody = document.createElement('tbody')
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

            let newBody: string = body[0].replace("[", "")
            newBody = newBody.replace("]", "")
            newBody = newBody.replace(", ", "-")
            const text = document.createTextNode(newBody)       

            const span = document.createElement('span')
            span.style.fontSize = '14px'

            const unit = document.createTextNode(" bpm")
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
      min: 60,
      max: 120,
      ticks: {
        color: 'rgba(190,190,190,1)',
        callback: function(value: string | number, index: number, ticks: any): string | number {
          if (index % 2 != 0){
            return ''
          }
          return value + " bpm"
        }
      },
      grid: {
        display: true,
      },
    },
  }
}
