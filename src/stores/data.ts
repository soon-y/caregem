import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    data: [
      {
        name: "Metformin",
        type: "tablet",
        strength: 500,
        unit: "mg",
        schedule: "Every Day",
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        time: ["8:00", "18:00"],
        application: [1,1],
        durationStart: "1/0/2023",
        durationEnd: "",
        duration: 0,
        shape: "tablet",
        colorLeft: "round",
        colorRight: "white",
        bgColorIndex: 8,
        memo: "Metformin is used to treat high blood sugar levels that are caused by a type of diabetes mellitus or sugar diabetes called type 2 diabetes. With this type of diabetes, insulin produced by the pancreas is not able to get sugar into the cells of the body where it can work properly."
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
        durationStart: "1/0/2023",
        durationEnd: "",
        duration: 0,
        shape: "capsule",
        colorLeft: "white",
        colorRight: "sky",
        bgColorIndex: 11,
        memo: ""
      },
    ],

    history: [
      {
        name: "Metformin",
        type: "tablet",
        strength: 500,
        unit: "mg",
        schedule: "Every Day",
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        time: ["8:00", "18:00"],
        application: [1,1],
        durationStart: "1/0/2023",
        durationEnd: "",
        duration: 0,
        shape: "tablet",
        colorLeft: "round",
        colorRight: "white",
        bgColorIndex: 8,
        memo: "Metformin is used to treat high blood sugar levels that are caused by a type of diabetes mellitus or sugar diabetes called type 2 diabetes. With this type of diabetes, insulin produced by the pancreas is not able to get sugar into the cells of the body where it can work properly."
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
        durationStart: "1/0/2023",
        durationEnd: "",
        duration: 0,
        shape: "capsule",
        colorLeft: "white",
        colorRight: "sky",
        bgColorIndex: 11,
        memo: ""
      },
    ]
  }),
  actions: {
   addNewArray(newArray: {
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
    duration: number
    shape: string
    colorLeft: string
    colorRight: string
    bgColorIndex: number
    memo: string
   }){
    this.data.push(newArray)
   },

   deleteArray(index: number){
    this.data.splice(index, 1)
   }
  },
})
