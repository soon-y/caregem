<template>
  <div class="box">
    <slot name="image" class="image"></slot>
    <div class="text">
      <span class="name"><slot name="name"></slot></span>
      <font-awesome-icon icon="chevron-right" class="arrowRight"/>
      <br />
      <slot name="dose"></slot><br />
      <slot name="interval"></slot><br />
      <slot name="time"></slot>
    </div>
  </div>
</template>

<style scope>
.box{
  --width: 8rem;

  display: grid;
  grid-template-columns: var(--width) auto;
  width: calc(100% - 0.8rem);
  height: calc(var(--width));
  background-color: var(--white-lila);
  border-radius: 1rem;
  margin: auto;
  margin-bottom: 0.8rem;
  padding: 0rem;
  overflow: hidden;
}

.arrowRight {
  float: right;
  margin-right: 1rem;
  margin-top: 0.4rem;
  font-size: 1.2rem;
  color: rgb(173, 150, 174);
}

.text{
  margin: auto 0;
  margin-left: 1rem;
}

.name {
  font-weight: 600;
  font-size: 1.2rem
}

img {
  width: var(--width);
  height: var(--width);
}


@media screen and (max-aspect-ratio: 1) {
  
}
</style>