const array: number[] = [];
const labelArray: number[] = [];
const sleep: number = 22;
const awake: number = 6;


const yLabels = ["","Deep", "", "Core","", "REM","", "Awake"]

for (let i: number = sleep; i <= awake+23; i++) {
  for (let j: number = 1; j <= 60; j++) {
    array.push(getRandomNumber(1, 6)) 
    labelArray.push(i)
  }
}
labelArray.push(awake+24)
console.log(array)

export function getRandomNumber(min: number, max: number): number {
  return Math.round(Math.random() * (max - min + 1) + min);
}

export const datasets = () => ({
  labels: labelArray,
  datasets: [
    {
      label: '',
      backgroundColor: 'rgb(243, 5, 148)',
      data: array,
      pointStyle: false,
      borderColor: function(context){
        const chart = context.chart
        const {ctx, chartArea} = chart
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
        gradient.addColorStop(1, 'rgb(255, 200, 0)')
        gradient.addColorStop(.66, '#bc7cff')
        gradient.addColorStop(.33, '#7d00ff')
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
  plugins: {
    legend: {
      display: false,
    }
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 0,
        callback: function(index, value){
          if (index % 120 != 0){
            return ''
          }
          return labelArray[index] > 24? labelArray[index]-24 + " AM" : labelArray[index]-12 + " PM"
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
      ticks: {
        stepSize: 1,
        callback: function(index) {
          return yLabels[index];
        },
      },
      grid: {
        display: true,
      },
    }
  }
}
