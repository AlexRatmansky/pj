import Vue from 'vue'
import SnapMeasure from './components/SnapMeasure.vue'
import _ from 'lodash';

let rootEl = document.createElement('div');
rootEl.id = 'app';
document.body.appendChild(rootEl);

let App = new Vue({

  el: '#app',

  data: {
    eventData: {},
    eventName: '',
    scrollPosition: {
      scrollTop: window.pageYOffset,
      scrollLeft: window.pageXOffset
    },
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },

  template: '<SnapMeasure :event-data=eventData :event-name=eventName :scroll-position=scrollPosition :window-size=windowSize />',

  components: {SnapMeasure}
});

document.onmousemove = function (e) {
  passMousePosition(e);
};

window.onscroll = function () {
  passScrollPosition();
};

window.onresize = function () {
  passUpdatedWindowSize();
};

document.onkeypress = function (e) {
  e.preventDefault();

  switch (e.code) {
    // v - for vertical
    case 'KeyV':
      App.eventName = {
        name: 'toggleVerticalRule'
      };
      break;

    // h - for horizontal
    case 'KeyH':
      App.eventName = {
        name: 'toggleHorizontalRule'
      };
      break;

    default:
      break;
  }
};

passMousePosition = _.throttle(passMousePosition, 1);
passScrollPosition = _.throttle(passScrollPosition, 1);
passUpdatedWindowSize = _.throttle(passUpdatedWindowSize, 1);

function passMousePosition(eventData) {
  App.eventData = eventData;
}

function passScrollPosition() {
  App.scrollPosition = {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset
  }
}

function passUpdatedWindowSize() {
  App.windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  }
}