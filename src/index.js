import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import loadImage from 'image-promise';
import bodymovin from 'bodymovin';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

$(document).ready(function(){
  $('body').scrollTop(0);
});

$(window).on('hashchange', function() {
  if(window.location.hash === "") window.location.href = window.location.href;
});

var images = [];

//animation
for (var i = 0; i < 43; i++) {
  images.push('images/home-images/img_'+i+'.png');
}

for (var j = 0; j < 18; j++) {
  images.push('images/tone-images/img_'+j+'.png');
}

//quiz
for (var k = 1; k < 4; k++) {
  images.push('images/quiz-images/q'+k+'.png');
}

//results


loadImage(images)
.then(function (allImgs) {
  console.log(allImgs.length, 'images loaded!', allImgs);
  $('#loading').addClass('fade');

  if(document.getElementById('main-animation') !== null) {
    setTimeout(function(){
      var animationData = require('./json/start/start.json');
      var animation = bodymovin.loadAnimation({
          container: document.getElementById('main-animation'),
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: animationData
      });
      animation.addEventListener("complete", function() {
        animation.destroy();
        if(document.getElementById('main-animation') !== null) {
          var animationLoopData = require('./json/loop/loop.json');
          var animationLoop = bodymovin.loadAnimation({
              container: document.getElementById('main-animation'),
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData: animationLoopData
          });
        }
      });
    },200);
  }
})
.catch(function (err) {
  console.error('One or more images have failed to load :(');
  console.error(err.errored);
  console.info('But these loaded fine:');
  console.info(err.loaded);
});