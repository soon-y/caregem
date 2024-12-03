const array: number[] = [];
const labelArray: string[] = [];
const sleep: number = 22;
const awake: number = 6;


const yLabels = ["Deep", "Core", "REM", "Awake", ""]

for (let i: number = sleep; i <= awake+23; i++) {
  for (let j: number = 1; j <= 60; j++) {
    array.push(getRandomNumber(0, 3)) 
  }
}

for (let i: number = sleep; i <= awake+23; i++) {
  for (let j: number = 0; j < 60; j++) {
    
    let hour: number = i > 24 ? i-24 : i-12
    let min: string = j < 10 ? "0" + j : j.toString()
    let text: string = i > 24 ? " AM" : " PM" 

    if(j === 0) {
      labelArray.push(hour.toString() + text) 
    } else {
      labelArray.push(hour.toString() + ":" + min + text)
    }
  }
}

labelArray.push(awake.toString())

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const datasets = () => ({
  labels: labelArray,
  datasets: [
    {
      label: '',
      backgroundColor: 'rgb(243, 5, 148)',
      data: array,
      pointStyle: false,
      borderColor: function(context: { chart: any }){
        const chart = context.chart
        const {ctx, chartArea} = chart
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
        gradient.addColorStop(.66, 'rgb(255, 200, 0)')
        gradient.addColorStop(.5, '#bc7cff')
        gradient.addColorStop(.25, '#7d00ff')
        gradient.addColorStop(0, '#4a0493') 
        return gradient;
      },
      stepped: 'right',
      clip:5,
    }
  ]
})

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      position: 'nearest',
      external: function(context: { chart: any, tooltip: any }){
        const {chart, tooltip} = context
        const tooltipEl = getOrCreateTooltip(chart)
        const lineHeight: string  = '16px'

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

            const text = document.createTextNode(title)
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

            let newBody: string = ""
            switch (body[0]) {
              case "3":
                newBody = "Awake"
                break;
              case "2":
                newBody = "REM"
                break;
              case "1":
                newBody = "Core"
                break;
              case "0":
                newBody = "Deep"
                break;
            }

            const text = document.createTextNode(newBody)   
            td.appendChild(text)
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
        callback: function(index: number){
          if (index % 3 != 0){
            return ''
          }
          return labelArray[index]
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
      max: 4,
      ticks: {
        stepSize: 1,
        callback: function(index: number) {
          return yLabels[index];
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
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.transform = 'translate(-50%, 0)'
    tooltipEl.style.transition = 'all .1s ease'

    const table = document.createElement('table')
    table.style.margin = '0px'

    tooltipEl.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }
  return tooltipEl
}