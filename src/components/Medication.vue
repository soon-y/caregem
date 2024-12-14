<template>
  <div class="box">
    <slot name="image" class="image"></slot>
    <slot name="name"></slot><br />
    <slot name="dose"></slot><br />
    <slot name="time"></slot>
  </div>
</template>

<style scope>
.box{
  --width: 7rem;

  width: calc(100% - 0.8rem);
  height: var(--width);
  background-color: var(--white-lila);
  border-radius: 1rem;
  margin: auto;
  padding: 1rem;
}

.image {
  width: var(--width);
  height: var(--width);
}


@media screen and (max-aspect-ratio: 1) {
  
}
</style>