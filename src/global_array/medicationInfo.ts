

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
export const bgColor: string[] = ["#6f2982","#eb962e"]

export const types: string[] = ["Capsule", "Tablet", "Liquid", "Topical"]
export const units: string[] = ["mg", "mcg", "g", "ml", "%"]
export const colors: string[] = ["white", "red", "orange", "blue", "purple"]
export const schedule: string[] = ["Every Day", "On Specific Days of the Week", "Every Few Days"]
export const intervalDays: string[] = ["Every Other Day"]
export const shapeImageNames: string[] = [
  "capsule_white_white",
  "capsuleBeads_white_white",
  "tablet_round_white",
  "tablet_oval_white",
  "tablet_capsule_white"
]

export const backgroundColor: string[] = [
  "#6f2982",
  "#ac7bb8",
  "#c290b5",
  "#b62b2b",
  "#eb962e",
  "#b89227",
  "#fccf00",
  "#b7e978",
  "#669a1c",
  "#1c9a45",
  "#0895b9",
  "#527db0",
]

export const chooseColor: string[] = [
  "#f0dcf5",
  "#bbf0f4",
  "#c290b5",
  "#b62b2b",
  "#eb962e",
  "#b89227",
  "#fccf00",
  "#b7e978",
  "#669a1c",
  "#1c9a45",
  "#0895b9",
  "#527db0",
]

function intervalArray() {
  for(let i:number = 3; i < 100; i++){
    intervalDays.push("Every " +i+ " Days")
  }
}
intervalArray()