export const index: number = 0

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
  "#f6f1f8",
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