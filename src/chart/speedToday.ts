const array2: number[][] = [];
const currentHour: number = new Date().getHours();
const sleep: number = 22;
const awake: number = 6;

const labelArray: string[] = [
  '12 AM',
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
  '12 AM',
]

for (let i: number = 0; i < awake; i++) {
  let data: number[] = [0,0]
  array2.push(data)
}

for (let i: number = awake; i <= currentHour; i++) {
  if(i <= sleep){
    let random: number[] = [getRandomNumber(0, 5),getRandomNumber(0, 5)]
    let data: number[] = [Math.min(...random), Math.max(...random)]
    array2.push(data)
  }else {
    let data: number[] = [0,0]
    array2.push(data)
  }
}

export const array = () => {
  let arrayNum: number[] = [];
  for (let i: number = 0; i < array2.length; i++) {
    for (let j: number = 0; j < array2[i].length; j++) {
      if(array2[i][j] > 0) arrayNum.push(array2[i][j])
    }
  }
  return arrayNum
}

function getRandomNumber(min: number, max: number): number {
  return parseFloat(((Math.random() * (max - min + 1)) + min).toFixed(1))
}

export const datasets = () => ({
  labels: labelArray,
  datasets: [
    {
      label: '',
      backgroundColor: 'rgb(20, 165, 255)',
      borderRadius: 8,
      data: array2,
      borderSkipped: false,
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
        const lineHeight: string  = '20px'

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
            td.style.fontSize = '30px'
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
      max: 8,
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