

export const name: string[] = ["Metformin","Carbimazole"]
export const type: string[] = ["tablet", "capsule"]
export const shape: string[] = ["round", "white"]
export const strength: number[] = [500, 10]
export const unit: string[] = ["mg", "mg"]
export const interval: string[] = ["Every Day","Every Day"]
export const time: string[] = ["8 AM, 6 PM", "8 AM, 12 PM, 5 PM"]
export const pillTime: number[] = [8, 18, 8, 12, 17]
export const application: number[] = [1,1,1,1,1]
export const times: number[] = [2, 3]
export const color: string[] = ["white", "sky"]
export const bgColor: string[] = ["#6f2982","#ff9900"]

export const types: string[] = ["Capsule", "Tablet", "Liquid", "Topical"]
export const units: string[] = ["mg", "mcg", "g", "ml", "%"]
export const colors: string[] = ["white", "red", "orange", "blue", "purple"]
export const schedule: string[] = ["Every Day", "On Specific Days of the Week", "Every Few Days"]
export const intervalDays: string[] = ["Every Other Day"]
export const shapeImageNames: string[] = [
  "capsule_white_white",
  "capsuleB_white_white",
  "tablet_round_white",
  "tablet_oval_white",
  "tablet_ovalC_white"
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
  "#ff9900",
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

export const chooseShape: string[] = [
  "round",
  "oval",
  "ovalC",
]

function intervalArray() {
  for(let i:number = 3; i < 100; i++){
    intervalDays.push("Every " +i+ " Days")
  }
}
intervalArray()