<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <nav>
    <RouterLink to="/">
      <div class="flex">
        <font-awesome-icon class="navIcon" icon="calendar-day" />
      Today
      </div>
    </RouterLink>

    <RouterLink to="/pills">
      <div class="flex">
        <font-awesome-icon class="navIcon" icon="pills" />
        Pills
      </div>
    </RouterLink>

    <RouterLink to="/records">
      <div class="flex">
        <font-awesome-icon class="navIcon" icon="chart-column" />
        Records
      </div>
    </RouterLink>

    <RouterLink to="/account">
      <div class="flex">
        <font-awesome-icon class="navIcon" icon="chart-column" />
        Account
      </div>
    </RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  position: absolute;
  height: 100vh;
  display: grid;
  grid-template-rows: 3rem 3rem 3rem 3rem;
  padding: 1rem;
  align-items: center;
  width: 10rem;
  z-index: 100;
  border-right: 1px solid var(--divider-light-2);
}

.navIcon{
  margin-right: 0.4rem;
  font-size: 1.4rem;
  }

nav a {
  display: inline-block;
  padding: 0 0.8rem;
  color: var(--divider-light-1);
  font-size: 1rem;
}

nav a.router-link-exact-active {
  color: var(--main-lila-hell);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

@media screen and (max-aspect-ratio: 1) {
  nav {
    padding: 0.6rem 0 ;
    bottom: 0;
    width: 100%;
    height: 4rem;
    text-align: center; 
    grid-template-columns: auto auto auto auto;
    border: none;
    border-top: 1px solid var(--divider-light-2);
  }

  nav a{
    font-size: 0.7rem;
  }

  .flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .navIcon{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.4rem;
    margin-bottom: 0.2rem;
  }
}
</style>
