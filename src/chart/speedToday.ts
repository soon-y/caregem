const array2: number[] = [];
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
  return (Math.random() * (max - min + 1)) + min;
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
  plugins: {
    legend: {
      display: false,
    }
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 0,
        callback: function(value, index, ticks){
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
