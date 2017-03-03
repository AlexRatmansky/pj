<template>
  <div :class="$style.element"
       :style="{
      top: elementProps.top + 'px',
      left: elementProps.left + 'px',
      width: elementProps.width + 'px',
      height: elementProps.height + 'px'
      }"
  ></div>
</template>

<script>
  export default {
    name: 'ViewElement',
    props: ['elementProps']
  };
</script>

<style module>
  .element {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background: rgba(255, 0, 0, 0.3);
    pointer-events: none;
  }
</style>