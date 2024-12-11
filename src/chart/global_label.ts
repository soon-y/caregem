export const awakeColor: string = 'rgb(255, 200, 0)'
export const remColor: string = '#bc7cff'
export const coreColor: string = '#7d00ff'
export const deepColor: string = '#4a0493'

export const date: number = new Date().getDate()
export const weekNum: number = new Date().getDay()
export const monthNum: number = new Date().getMonth()
const thisYear: number = new Date().getFullYear()
export const NumOfDays: number = getDaysInMonth(thisYear, monthNum-1)
export const week: string[] = []
export const month: string[] = []
export const month6: string[] = []
export const year: string[] = []

const weekArray: string[] = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
]

export const monthArray: string[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

for (let i: number = 0; i <= 6; i++) {
  const num: number = weekNum - i < 0 ? weekNum - i + 7 : weekNum - i
  week.unshift(weekArray[num])
}

for (let i: number = 0; i < NumOfDays; i++) {
  const d = new Date()
  const date = new Date(d)
  date.setDate(date.getDate() - i)
  const num: string = (date.getDate()).toString()
  month.unshift(num)
}

for (let i: number = 0; i < 6; i++) {
  const num: number = monthNum - i < 0 ? monthNum - i + 7 : monthNum - i
  month6.unshift(monthArray[num])
}

for (let i: number = 0; i <= 11; i++) {
  const num: number = monthNum - i < 0 ? monthNum - i + 12 : monthNum - i
  year.unshift(monthArray[num])
}

export const today: number[] = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
]

export const sleepYtime: string[] = [
  "8 AM",
  "7 AM",
  "6 AM",
  "5 AM",
  "4 AM",
  "3 AM",
  "2 AM",
  "1 AM",
  "12 AM",
  "11 PM",
  "10 PM",
  "9 PM",
  "8 PM",
]

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month+1, 0).getDate();
}

export function getRandom(count: number, min: number, divide: number): number[] {
  let array: number[] = []
  for(let i = 0; i < count; i++){
    let num:number = parseFloat(((Math.random() + min )/ divide).toFixed(2))
    array.push(num)
  }
  return array
}