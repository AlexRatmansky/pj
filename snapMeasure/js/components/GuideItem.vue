<template>
  <div :class="{
          [$style.guide]: true,
          [$style.vertical]: isVertical,
          [$style.horizontal]: !isVertical
       }"
       :style="{
          left: xPos - scrollPosition.scrollLeft + 'px',
          top: yPos - scrollPosition.scrollTop + 'px'
       }"
  >
    <div :class=$style.label>
      <template v-if=isVertical>{{xPos}}</template>
      <template v-else>{{yPos}}</template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GuideItem',
    props: {
      isVertical: Boolean,
      yPos: Number,
      xPos: Number,
      scrollPosition: {
        type: Object,
        default: function () {
          return {
            scrollTop: 0,
            scrollLeft: 0
          }
        },
      }
    },
  };
</script>

<style module>
  .guide {
    position: fixed;
    display: block;
    top: 50%;
    left: 50%;
    background-color: #e62ee6;
    pointer-events: none;
    z-index: 9998;
  }

  .label {
    position: absolute;
    display: inline-block;
    padding: 5px;
    border-radius: 2px;
    background: #BD10E0 linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1));
    color: #fff;
  }

  .guide.vertical {
    top: 0;
    width: 1px;
    height: 100%;
  }

  .vertical .label {
    top: 5px;
    left: 0;
    transform: translateX(-50%);
  }

  .guide.horizontal {
    left: 0;
    width: 100%;
    height: 1px;
  }

  .horizontal .label {
    top: 0;
    left: 5px;
    transform: translateY(-50%);
  }
</style>