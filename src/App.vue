<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <nav>
    <RouterLink to="/">
      <div class="flex">
        <font-awesome-icon class="nav-icon nav-margin" icon="calendar-day" />
      Today
      </div>
    </RouterLink>

    <RouterLink to="/medications">
      <div class="flex">
        <font-awesome-icon class="nav-icon" icon="pills" />
        Medications
      </div>
    </RouterLink>

    <RouterLink to="/records">
      <div class="flex">
        <font-awesome-icon class="nav-icon nav-margin" icon="chart-column" />
        Records
      </div>
    </RouterLink>

    <RouterLink to="/account">
      <div class="flex">
        <img src="/portrait.jpg" class="nav-img" />
        Account
      </div>
    </RouterLink>
  </nav>

  <RouterView />
</template>

<style scope>
nav {
  position: fixed;
  height: 100vh;
  display: grid;
  grid-template-rows: 3rem 3rem 3rem 3rem;
  padding: 1rem;
  align-items: center;
  width: 11.4rem;
  z-index: 10;
  border-right: 1px solid var(--white-lila-border);
  background-color: var(--white-lila)
}

.nav-icon{
  margin-right: 0.5rem;
  font-size: 1.4rem;
}

.nav-margin{
  margin-right: 0.7rem;
}

.nav-img{
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--divider-light-1);
  border-radius: 50%;
  margin-right: 0.7rem;
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

.flex {
    display: flex;
    flex-direction: row;
    justify-content: left;
  }

@media screen and (max-aspect-ratio: 1) {
  nav {
    padding: 0.6rem 0;
    bottom: 0;
    width: 100%;
    height: 5rem;
    text-align: center; 
    grid-template-columns: auto auto auto auto;
    border: none;
    border-top: 1px solid var(--white-lila-border);
  }

  nav a{
    font-size: 0.7rem;
  }

  .flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .nav-icon{
    position: relative;
    margin: auto;
    font-size: 1.4rem;
    margin-bottom: 0.2rem;
  }

  .nav-margin, .nav-img{
    margin: auto;
    margin-bottom: 0.2rem;
  }
}
</style>
