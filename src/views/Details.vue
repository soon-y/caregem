<template>
  <div class="container-full">
    <div class="fixed">
        <span class="closeIcon topIcon"><slot name="close"></slot></span>
        <span class="top-title" :style="{fontSize: '1.2rem', marginTop:'0.7rem'}"><slot name="name"></slot></span>
    </div>

    <div class="scroll-wrapper-full">
    <div class="content-wrapper">
      <div class="tabs">
        <slot name="tab"></slot>
      </div>

      <p class="input-subtitle margin-top">Schedule </p>
      <div class="schedule-wrapper">
        <div><slot name="schedule"></slot></div>
        <div :style="{ color: 'var(--main-lila-hell)', cursor:'pointer' }">Edit</div>
      </div>
      <div class="scheduleDate"><slot name="scheduleDate"></slot></div>

      <p class="input-subtitle margin-top">Details </p>
      <div class="box">
        <slot name="image"></slot>
        <div class="box-text">
          <div class="box-name"><slot name="name"></slot></div>
          <div><slot name="type"></slot></div>
          <div><slot name="strength"></slot> <slot name="unit"></slot></div>
        </div>
      </div>

      <p class="input-subtitle margin-top">Memo </p>
      <div class="schedule-wrapper" :style=" { height: '6rem' }">
        <slot name="memo"></slot>
        <span :style="{ color: 'var(--white-lila-border)' }"><slot name="empty"></slot></span>
      </div>

      <button class="button"  :style="{ backgroundColor: 'var(--white-lila)', color: 'var(--main-lila-hell)' }">show All data</button>
      <button class="button"  :style="{ margin: '0 0 5rem 0', backgroundColor: 'var(--white-lila)', color: 'var(--main-lila-hell)' }">Delete Medication</button>  
    
      </div>
    </div>
  </div>
</template>

<style scope>
.box-name{
  margin-bottom: 0.4rem;
}

.schedule-wrapper{
  padding: 0.6rem 1rem;
}

.scheduleDate{
  color: var(--white-lila-border);
  margin: 0.2rem 1rem 0 1rem;
  line-height: 1rem;
}

@media screen and (max-aspect-ratio: 1) {
}
</style>