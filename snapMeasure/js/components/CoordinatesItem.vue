<template>
  <div :class=$style.coordinatesContainer
       :style="{
           left: cursorPos.x + 10 + 'px',
           top: cursorPos.y + 10 + 'px'
         }"
  >
    <div :class=$style.coordinatesBox>
      <div>x: {{ cursorPos.x }}</div>
      <div>y: {{ cursorPos.y }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CoordinatesItem',
    props: ['cursorPos']
  };
</script>

<style module>
  .coordinatesContainer {
    position: absolute;
    pointer-events: none;
  }

  .coordinatesBox {
    white-space: nowrap;
    position: absolute;
    top: 10px;
    left: 10px;
    background: #BD10E0 linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1));
    color: #fff;
    padding: 5px 10px;
    border-radius: 2px;
    z-index: 9999;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }
</style>