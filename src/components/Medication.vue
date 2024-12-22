<template>
  <div class="box">
    <slot name="image" class="box-img"></slot>
    <div class="box-text">
      <div>
        <span class="box-name"><slot name="name"></slot></span>
        <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
      </div>
      <div><slot name="dose"></slot></div>
      <div><slot name="schedule"></slot></div>
      <div><slot name="interval"></slot></div>
      <div><slot name="time"></slot></div>    
    </div>
  </div>
</template>

<style scope>
img {
  width: var(--width);
  height: var(--width);
}
</style>