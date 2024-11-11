
<template>
  <div class="container">
    <h1>This is an tday page</h1>
  </div>
</template>

<style>
.container {
  width: calc(100vw - 11rem);
  height: 100vh;
  position: relative;
  left: 11rem;
}

@media screen and (max-aspect-ratio: 1) {
  .container {
  width: 100vw;
  height: calc(100vh - 4.6rem);
  left: 0;
}
}
</style>
