
export const index: number = 0

interface dataType {
  name: string
  type: string
  strength: number
  unit: string
  schedule: string
  days: string[]
  time: string[]
  application: number[]
  durationStart: string
  durationEnd: string
  shape: string
  colorLeft: string
  colorRight: string
  bgColorIndex: number
  memo: string
}

export const data: dataType[] = [
  {
    name: "Metformin",
    type: "tablet",
    strength: 500,
    unit: "mg",
    schedule: "Every Day",
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    time: ["8:00", "18:00"],
    application: [1,1],
    durationStart: "12/1/23",
    durationEnd: "",
    shape: "tablet",
    colorLeft: "round",
    colorRight: "white",
    bgColorIndex: 8,
    memo: ""
  },
  {
    name: "Carbimazole",
    type: "capsule",
    strength: 10,
    unit: "mg",
    schedule: "On Specific Days of the Week",
    days: ["Tue", "Wed", "Thu", "Fri", "Sun"],
    time: ["8:00", "12:00", "17:00"],
    application: [1,1,1],
    durationStart: "12/1/23",
    durationEnd: "",
    shape: "capsule",
    colorLeft: "white",
    colorRight: "sky",
    bgColorIndex: 11,
    memo: ""
  },
]

export const types: string[] = ["Capsule", "Tablet", "Liquid", "Topical", "Injection"]
export const units: string[] = ["mg", "mcg", "g", "ml", "%"]
export const schedule: string[] = [
  "Every Day", 
  "On Specific Days of the Week", 
  //"Every Few Days"
]
export const intervalDays: string[] = ["Every Other Day"]
export const shapeImageNames: string[] = [
  "capsule_white_white",
  "capsuleB_white_white",
  "tablet_round_white",
  "tablet_oval_white",
  "tablet_ovalC_white",
  "injection_injection_white",
  "bottle_bottle_white",
  "topical_topical_white",
]

export const chooseColor: string[] = [
  "#f5f5f5",
  "#d6d2d8",
  "#fde261",
  "#f4e7b0",
  "#dff4b0",
  "#63c560",
  "#b3e9ec",
  "#4ba5ee",
  "#ad70bd",
  "#f6dedd",
  "#f65750",
  "#fcb607",
]

export const backgroundColor: string[] = [
  "rgb(248, 246, 249)",
  "#8a808f",
  "#ffcf00",
  "#b89227",
  "#bfda07",
  "#179d14",
  "#3ed5de",
  "#0d63a9",
  "#6f2982",
  "#d39e9c",
  "#d30f07",
  "#ffb900",
]

export const chooseColorName: string[] = [
  "white",
  "gray",
  "yellow",
  "salgu",
  "yellowgreen",
  "green",
  "sky",
  "blue",
  "lila",
  "rose",
  "red",
  "orange",
]

function intervalArray() {
  for(let i:number = 3; i < 100; i++){
    intervalDays.push("Every " +i+ " Days")
  }
}
intervalArray()