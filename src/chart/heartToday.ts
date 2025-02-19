import { getRandomNumber, getOrCreateTooltip, today } from './global_label'

export const array2: number[][] = [];
const currentHour: number = new Date().getHours();
const labelArray: number[] = today

for (let i: number = 0; i <= currentHour; i++) {
  let random: number[] = [getRandomNumber(70, 110),getRandomNumber(70, 110)]
  while (random[0] === random[1]){
    random = [getRandomNumber(70, 110),getRandomNumber(70, 110)]
    break
  }
  let data: number[] = [Math.min(...random), Math.max(...random)]
  array2.push(data)
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

            let number = Number(title)
            let newTitle: string = number > 12 ? (number-12).toString() + ' pm' : number + ' am' 
            if (number === 0) newTitle = '12 am'
            const text = document.createTextNode(newTitle)
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
