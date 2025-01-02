<template>
  <div class="card" :style="{ 
      marginBottom: '2rem'
      }">
    <slot name="image" class="box-img"></slot>
    <table :style="{ 
      margin: 'auto', borderCollapse: 'collapse'
      }">
      <tbody>
        <tr>
          <td>
            <span class="box-name"><slot name="name"></slot></span>
          </td>
          <td :style="{ textAlign: 'right'}">
            <div :style="{ marginRight: '1rem'}"><slot name="battery"></slot></div>
          </td>
        </tr>
        <tr>
          <td class="td-height"><slot name="sync"></slot></td>
          <td class="td-height" :style="{ color: 'var(--white-lila-dunkel)' }"><slot name="update"></slot></td>
        </tr>
        <tr>
          <td class="td-height">Serial Number</td>
          <td class="td-height"><slot name="number"></slot></td>
        </tr>
        <tr>
          <td class="td-height">Since</td>
          <td class="td-height"><slot name="schedule"></slot></td>
        </tr>
        <tr>
          <td class="td-height">Status</td>
          <td class="td-height"><slot name="status"></slot></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scope>
.card {
  --width: 10rem;

  display: grid;
  grid-template-columns: var(--width) auto;
  width: 100%;
  height: calc(var(--width));
  background-color: var(--white-lila);
  border-radius: 1rem;
  margin: auto;
  padding: 0rem;
  overflow: hidden;
}

.td-height {
  height: 1rem;
}

img {
  width: var(--width);
  height: var(--width);
}
</style>