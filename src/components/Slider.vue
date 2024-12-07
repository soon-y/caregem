<script lang="ts" setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

// Define the props with their types
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 3,
  },
  step: {
    type: Number,
    default: 1,
  },
	rangeText: {
		type: String,
		default: "Week"
	}
});

// Define the emit function for emitting updates with type safety
const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();

// Create a reactive reference for the slider value with an explicit type
const sliderValue = ref<number>(props.modelValue)
const rangeValue = ref<string>(props.rangeText)

// Watch for changes to sliderValue and emit an update
watch(sliderValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Method to emit the current value when the input event is triggered
function emitUpdate(): void {
  emit('update:modelValue', sliderValue.value); // sliderValue.value is of type `number`
}

const left = () => {
	switch(sliderValue.value) {
		case 0:
			rangeValue.value = "WEEK"
			return 0
		case 1:
			rangeValue.value = "MONTH"
			return 25
		case 2:
			rangeValue.value = "6 MONTH"
			return 50
		case 3:
			rangeValue.value = "YEAR"
			return 75
	}
}
</script>

<template>
  <div class="sliderContainer">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="sliderValue"
			class="slider"
      @input="emitUpdate"
    />
		<div class="rangeText"
		:style="{left: `${left()}%`}">
		{{ rangeValue }}
		</div>
  </div>
</template>

<style scoped>
.sliderContainer {
	width: 100%;
	--width: 2rem;
	margin: 0;
}

.slider {
	-webkit-appearance: none;
	appearance: none;
	width: 100%;
	height: var(--width);
	border-radius: 1rem;
	background-color: var(--divider-light-2);
	outline: none;
	opacity: 0.7;
	transition: opacity .2s;
	transition-duration: 500ms;
}

.slider:hover {
	opacity: 1;
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 25%;
	height: var(--width);
	background: var(--main-lila-hell);
	cursor: pointer;
	border-radius: 1rem;
}

.slider::-moz-range-thumb {
	width: 25%;
	height: var(--width);
	background: var(--main-lila-hell);
	cursor: pointer;
	border-radius: 1rem;
}

.rangeText {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  text-align: center;
  line-height: 1;
  height: var(--width);
  width: 25%;
	color: white;
	font-weight: 600;
}
</style>
