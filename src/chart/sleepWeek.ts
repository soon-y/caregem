import { getRandomNumber, getOrCreateTooltipKruz, week, sleepYtime, awakeColor, remColor, coreColor, deepColor } from './global_label'

export const array: number[] = [];
const labelArray: string[] = week
let numAwake: number = 434
let numREM: number = 114
let numCore: number = 271
let numDeep: number = 21

export const awakeHour: number = Math.floor(numAwake/60)
export const awakeMins: number = numAwake - awakeHour*60
export const remHour: number = Math.floor(numREM/60)
export const remMins: number = numREM - remHour*60
export const coreHour: number = Math.floor(numCore/60)
export const coreMins: number = numCore - coreHour*60
export const deepHour: number = Math.floor(numDeep/60)
export const deepMins: number = numDeep - deepHour*60

export const datasets = () => ({
  labels: labelArray,
  datasets: [
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [1.3, 1.2, 1.0, 1.2, 1.4, 1.0, 1.2],
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: [0.17, 0.16, 0.14, 0.13, 0.14, 0.15, 0.1,],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [0.15, 0.1, 0.15, 0.1, 0.2, 0.1, 0.1,],
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: [0.15, 0.12, 0.13, 0.14, 0.11, 0.15, 0.1,],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [0.4, 0.7, 0.5, 0.7, 0.6, 0.8, 0.7],
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [0.1, 0.13, 0.1, 0.15, 0.12, 0.15, 0.15],
      borderSkipped: false,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [1.5, 1., 1.5, 1.5, 1., 1.5, 1.5],
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [0.1, 0.13, 0.17, 0.1, 0.15, 0.2, 0.15],
      borderSkipped: true,
    },

    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [-0.3, -0.23, -0.22, -0.25, -0.2, -0.25, -0.2],
      borderSkipped: false,
    },
    {
      label: 'Awake',
      backgroundColor: awakeColor,
      borderRadius: 6,
      data: [-0.05, -0.06, -0.1, -0.08, -0.1, -0.08, -0.1],
      borderSkipped: false,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [-0.2, -0.15, -0.1, -0.12, -0.15, -0.13, -0.15],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [-0.21, -0.24, -0.22, -0.21, -0.24, -0.2, -0.2],
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [-0.21, -0.18, -0.15, -0.16, -0.2, -0.22, -0.2],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [-0.15, -0.2, -0.17, -0.18, -0.2, -0.21, -0.2],
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: [-0.11, -0.14, -0.17, -0.12, -0.11, -0.14, -0.1],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [-0.11, -0.14, -0.15, -0.14, -0.11, -0.17, -0.1],
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [-0.13, -0.16, -0.15, -0.13, -0.11, -0.12, -0.15],
      borderSkipped: true,
    },
    {
      label: 'Awake',
      backgroundColor: awakeColor,
      borderRadius: 6,
      data: [-0.11, -0.14, -0.13, -0.1, -0.15, -0.1, -0.1],
      borderSkipped: false,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [-0.21, -0.22, -0.28, -0.27, -0.22, -0.21, -0.25],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [-0.22, -0.21, -0.25, -0.22, -0.23, -0.18, -0.25],
      borderSkipped: true,
    },

    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [-0.11, -0.12, -0.14, -0.17, -0.18, -0.19, -0.1],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [-0.13, -0.12, -0.13, -0.14, -0.15, -0.12, -0.1],
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [-0.1, -0.16, -0.18, -0.13, -0.12, -0.11, -0.15],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [-0.14, -0.15, -0.16, -0.12, -0.11, -0.12, -0.1],
      borderSkipped: true,
    },
    {
      label: 'Deep',
      backgroundColor: deepColor,
      borderRadius: 6,
      data: [-0.13, -0.12, -0.14, -0.17, -0.16, -0.15, -0.1],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [-0.11, -0.15, -0.12, -0.13, -0.15, -0.14, -0.1],
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [-0.17, -0.19, -0.12, -0.25, -0.2, -0.21, -0.15],
      borderSkipped: true,
    },
    {
      label: 'Core',
      backgroundColor: coreColor,
      borderRadius: 6,
      data: [-0.14, -0.12, -0.14, -0.12, -0.11, -0.13, -0.1],
      borderSkipped: true,
    },
    {
      label: 'REM',
      backgroundColor: remColor,
      borderRadius: 6,
      data: [-0.13, -0.15, -0.26, -0.22, -0.16, -0.19, -0.1],
      borderSkipped: true,
    },
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
            if (title == week[week.length-1]){
              newTitle = "Today"
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
            td.style.fontSize = '20px'
            td.style.letterSpacing = '-0.8px'
            td.style.color = '#4b4b4b'
            td.style.fontWeight = '600' 

            let newBody: string = body[0].split(':')[0]
            let time: number = Math.floor(Math.abs(Number(body[0].split(':')[1]))*60)
            const text = document.createTextNode(newBody)   
           
            const span = document.createElement('span')
            span.style.fontSize = '14px'

            const unit = document.createTextNode(time +" mins")
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
      stacked: true,
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
      stacked: true,
      beginAtZero: false,
      min: -6,
      max: 6,
      ticks: {
        color: 'rgba(190,190,190,1)',
        stepSize: 1,
        callback: function(value: string | number, index: number, ticks: any): string | number {
          if (index % 2 != 0){
            return ''
          }
          return sleepYtime[index]
        },
      },
      grid: {
        display: false,
      },
    }
  }
}
