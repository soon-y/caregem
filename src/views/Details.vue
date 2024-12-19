<template>
  <div class="container-full">
  <div class="fixed">
      <span class="closeIcon topIcon"><slot name="close"></slot></span>
  </div>

  <div class="content-wrapper">
    <div class="name margin-top"><slot name="name"></slot></div>

  <div class="tabs">
    <slot name="tab"></slot>
  </div>

  <div class="pill-graph">
    <slot name="graph"></slot>
  </div>


  <p class="input-subtitle">Schedule </p>

  <div class="box">
    <slot name="image" class="image"></slot>
    <div class="text">
      <div><slot name="dose"></slot></div>
      <div><slot name="schedule"></slot></div>
      <div><slot name="interval"></slot></div>
      <div><slot name="time"></slot></div>    
    </div>
    </div>
  </div>

</div>
</template>

<style scope>
.box{
  --width: 7rem;

  display: grid;
  grid-template-columns: var(--width) auto;
  width: 100%;
  height: calc(var(--width));
  background-color: var(--white-lila);
  border-radius: 1rem;
  margin: 0;
  margin-bottom: 0.8rem;
  padding: 0rem;
  overflow: hidden;
}

.text{
  margin: auto 0;
  margin-left: 1rem;
  line-height: 1.3rem;
}

.name {
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
}

img {
  width: var(--width);
  height: var(--width);
}

@media screen and (max-aspect-ratio: 1) {
}
</style>