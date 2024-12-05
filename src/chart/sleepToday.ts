export const array: number[] = [];
const labelArray: string[] = [];
const sleep: number = 22;
const awake: number = 5;
const awakeColor: string = 'rgb(255, 200, 0)'
const remColor: string = '#bc7cff'
const coreColor: string = '#7d00ff'
const deepColor: string = '#4a0493'
let numAwake: number = 0
let numREM: number = 0
let numCore: number = 0
let numDeep: number = 0
const yLabels = ["Deep", "Core", "REM", "Awake"]

for (let i: number = 1; i <= 10; i++) {
  let num: number = 2
  numREM++
  array.push(num)
}

for (let i: number = 11; i <= 100; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 101; i <= 110; i++) {
  let num: number = 2
  numREM++
  array.push(num) 
}

for (let i: number = 111; i <= 150; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 151; i <= 155; i++) {
  let num: number = 0
  numDeep++
  array.push(num) 
}

for (let i: number = 156; i <= 165; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 166; i <= 170; i++) {
  let num: number = 0
  numDeep++
  array.push(num) 
}

for (let i: number = 171; i <= 240; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 241; i <= 250; i++) {
  let num: number = 2
  numREM++
  array.push(num) 
}

for (let i: number = 251; i <= 255; i++) {
  let num: number = 3
  numAwake++
  array.push(num) 
}

for (let i: number = 256; i <= 260; i++) {
  let num: number = 2
  numREM++
  array.push(num) 
}

for (let i: number = 261; i <= 278; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 279; i <= 290; i++) {
  let num: number = 2
  numREM++
  array.push(num) 
}

for (let i: number = 291; i <= 300; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 301; i <= 306; i++) {
  let num: number = 0
  numDeep++
  array.push(num) 
}

for (let i: number = 307; i <= 310; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 311; i <= 320; i++) {
  let num: number = 2
  numREM++
  array.push(num) 
}

for (let i: number = 321; i <= 325; i++) {
  let num: number = 3
  numAwake++
  array.push(num) 
}

for (let i: number = 326; i <= 340; i++) {
  let num: number = 2
  numREM++
  array.push(num) 
}

for (let i: number = 341; i <= 355; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 356; i <= 360; i++) {
  let num: number = 2
  numREM++
  array.push(num) 
}

for (let i: number = 361; i <= 370; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 371; i <= 378; i++) {
  let num: number = 2
numREM++
  array.push(num) 
}

for (let i: number = 379; i <= 385; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 386; i <= 390; i++) {
  let num: number = 0
  numDeep++
  array.push(num) 
}

for (let i: number = 391; i <= 398; i++) {
  let num: number = 1
numCore++
  array.push(num) 
}

for (let i: number = 399; i <= 410; i++) {
  let num: number = 2
  numREM++
  array.push(num) 
}

for (let i: number = 411; i <= 414; i++) {
  let num: number = 1
  numCore++
  array.push(num) 
}

for (let i: number = 415; i <= 421; i++) {
  let num: number = 2
  numREM++
  array.push(num) 
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

labelArray.push(awake.toString() + " AM") 

export const totalHour: number = Math.floor(array.length/60)
export const totalMins: number = Math.floor(((array.length/60) - totalHour)*60)
export const awakeMins: number = numAwake
export const remHour: number = Math.floor(numREM/60)
export const remMins: number = numREM - remHour*60
export const coreHour: number = Math.floor(numCore/60)
export const coreMins: number = numCore - coreHour*60
export const deepHour: number = Math.floor(numDeep/60)
export const deepMins: number = numDeep - deepHour*60

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
      pointStyle: false as const,
      borderColor: function(context: { chart: any }){
        const chart = context.chart
        const {ctx, chartArea} = chart
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
        gradient.addColorStop(1, awakeColor)
        gradient.addColorStop(.66, remColor)
        gradient.addColorStop(.33, coreColor)
        gradient.addColorStop(0, deepColor) 
        return gradient;
      },
      stepped: true,
      clip: 5,
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

            const span = document.createElement('span');
            span.style.borderWidth = '2px';
            span.style.marginTop = '5px';
            span.style.height = '14px';
            span.style.width = '14px';
            span.style.borderRadius = '50%';
            span.style.display = 'inline-block';

            let newBody: string = ""
            switch (body[0]) {
              case "3":
                newBody = "Awake"
                span.style.background = awakeColor
                span.style.borderColor = awakeColor
                break;
              case "2":
                newBody = "REM"
                span.style.background = remColor
                span.style.borderColor = remColor
                break;
              case "1":
                newBody = "Core"
                span.style.background = coreColor
                span.style.borderColor = coreColor
                break;
              case "0":
                newBody = "Deep"
                span.style.background = deepColor
                span.style.borderColor = deepColor
                break;
            }

            const text = document.createTextNode(newBody)   
            td.appendChild(text)
            var br = document.createElement('br')
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
        maxTicksLimit: 5,
      },
      grid: {
        display: true,
        color: 'rgba(200,200,200,0.3)'
      }
    },
    y: {
      beginAtZero: false,
      min: 0,
      max: 3,
      ticks: {
        stepSize: 1,
        callback: function(value: string | number, index: number, ticks: any): string | number {
          return yLabels[index];
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
    tooltipEl.style.transform = 'translate(-70%, -130%)'
    tooltipEl.style.transition = 'all .1s ease'
    tooltipEl.style.width = '5rem'

    const table = document.createElement('table')
    table.style.margin = '0px'

    tooltipEl.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }
  return tooltipEl
}