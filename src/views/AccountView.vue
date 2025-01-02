<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="content-wrapper">
      <div class="account-img-wrapper">
        <img src="/portrait.jpg" class="account-img"/>
      </div>

    <div>
      <h1 class="center ">John Deo</h1>
    </div>

    <div class="card-wrapper">
      <font-awesome-icon icon="person-arrow-up-from-line" class="icon" />
      Height
      <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
      <div>
        <span class="value">180</span>
        <span class="unit">cm</span>
      </div>
    </div>

    <div class="card-wrapper">
      <font-awesome-icon icon="weight-scale" class="icon" />
      Weight
      <font-awesome-icon icon="chevron-right" class="box-arrowRight"/>
      <div>
        <span class="value">68</span>
        <span class="unit">kg</span>
      </div>
    </div>

    <div>
      date
    </div>
  </div>
</div>

</template>

<style scope>
  .account-img-wrapper{
  }

  .account-img {
    object-fit: cover;
    border-radius: 50%;
    width: 50%;
    aspect-ratio: 1 / 1; 
  }

  .icon{
    color: var(--white-lila-dunkel);
    margin: 0 0.2rem;
  }

  .card-wrapper{
    width: 100%;
    background-color: var(--white-lila);
    border-radius: 0.8rem;
    margin-bottom: 1rem;
    padding: 1rem 0 0.4rem 1rem;
  }

  .value{
    margin-top:1rem;
    font-size: 2rem;
    color: var(--white-lila-dunkel)
  }

  .unit{
    margin-left: 0.4rem;
    color: var(--white-lila-dunkel)
  }

@media (min-width: 1024px) {

}
</style>
