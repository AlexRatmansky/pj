<template>
  <div :class=$style.snapMeasure>

    <GuideItem :is-vertical=true :x-pos=crossPos.x />
    <GuideItem :is-vertical=false :y-pos=crossPos.y />

    <template v-for="guidePos in verticalGuides">
      <GuideItem
        :is-vertical=true
        :x-pos=guidePos
        :scroll-position=scrollPosition
      />
    </template>

    <template v-for="guidePos in horizontalGuides">
      <GuideItem
        :is-vertical=false
        :y-pos=guidePos
        :scroll-position=scrollPosition
      />
    </template>

    <CoordinatesItem :cursor-pos=cursorPos></CoordinatesItem>

    <ViewElement :element-props=elem></ViewElement>

  </div>
</template>

<script>
  import GuideItem from './GuideItem.vue';
  import ViewElement from './ViewElement.vue';
  import CoordinatesItem from './CoordinatesItem.vue';
  import _ from 'lodash';

  function checkSnap(obj, xPos, yPos) {

    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = obj.getBoundingClientRect();

    let top = Math.round(elemRect.top - bodyRect.top);
    let left = Math.round(elemRect.left - bodyRect.left);
    let right = left + elemRect.width;
    let bottom = top + elemRect.height;

    let newXPos = xPos;
    let newYPos = yPos;

    let isSnapped = false;
    let snapFactor = 10;

    if (checkTop(top, yPos)) {
      newYPos = top;
      isSnapped = true;
    }

    if (checkLeft(left, xPos)) {
      newXPos = left;
      isSnapped = true;
    }

    if (checkRight(right, xPos)) {
      newXPos = right;
      isSnapped = true;
    }

    if (checkBottom(bottom, yPos)) {
      newYPos = bottom;
      isSnapped = true;
    }

    function checkTop(top, y) {
      return y <= top + snapFactor && y >= top
    }

    function checkLeft(left, x) {
      return x <= left + snapFactor && x >= left
    }

    function checkRight(right, x) {
      return x >= right - snapFactor && x <= right
    }

    function checkBottom(bottom, y) {
      return y >= bottom - snapFactor && y <= bottom
    }

    return {
      xPos: newXPos,
      yPos: newYPos,
      isSnapped: isSnapped
    };
  }

  export default {

    name: 'App',

    data: function () {
      return {
        cursorPos: {
          x: 0,
          y: 0
        },
        crossPos: {
          x: 0,
          y: 0
        },
        elem: '',
        crossGuides: [
          {isVertical: false,},
          {isVertical: true,}
        ],
        verticalGuides: [],
        horizontalGuides: []
      }
    },

    components: {GuideItem, ViewElement, CoordinatesItem},

    props: ['eventData', 'eventName', 'scrollPosition', 'windowSize'],

    methods: {
      toggleRule: function (direction) {
        let guidesArr;
        let currGuide;

        switch (direction) {
          case 'vertical':
            guidesArr = this.verticalGuides;
            currGuide = this.cursorPos.x;
            break;
          case 'horizontal':
            guidesArr = this.horizontalGuides;
            currGuide = this.cursorPos.y;
            break;
        }

        if (guidesArr.indexOf(currGuide) >= 0) {
          _.pull(guidesArr, currGuide)

        } else {
          guidesArr.push(currGuide);

          guidesArr.sort(function (a, b) {
            return a - b;
          });
        }


      },

      toggleVerticalRule: function () {
        this.toggleRule('vertical');
      },

      toggleHorizontalRule: function () {
        this.toggleRule('horizontal');
      }
    },

    watch: {
      eventData: function (data) {
        if (data !== undefined) {
          const currElement = data.path[0] || undefined;
          const snapObj = checkSnap(currElement, data.pageX, data.pageY);

          const bodyRect = document.body.getBoundingClientRect();
          const elemRect = currElement.getBoundingClientRect();

          this.cursorPos = {
            x: snapObj.xPos,
            y: snapObj.yPos
          };

          this.crossPos = {
            x: Math.round(this.cursorPos.x + bodyRect.left),
            y: Math.round(this.cursorPos.y + bodyRect.top),
          };

          let left = Math.round(elemRect.left - bodyRect.left);
          let top = Math.round(elemRect.top - bodyRect.top);

          this.elem = {
            top: top,
            left: left,
            right: left + elemRect.width,
            bottom: top + elemRect.height,
            width: elemRect.width,
            height: elemRect.height
          };
        }
      },

      scrollPosition: function (data) {
        console.log('scroll', data);
      },

      windowSize: function (data) {
        console.log('resize', data);
      },

      eventName: function (data) {
        if (this[data.name]) {
          this[data.name]()
        }
      }
    }
  }
</script>

<style module>
  .snapMeasure {
    font-family: Menlo, Consolas, Courier, monospace;
    font-size: 12px;
  }
</style>