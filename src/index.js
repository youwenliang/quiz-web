import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import loadImage from 'image-promise';
import bodymovin from 'bodymovin';

ReactDOM.render(
 <BrowserRouter basename="quiz-web">
   <App />
 </BrowserRouter>,
 document.getElementById("root")
);
registerServiceWorker();

if(window.location.hash !== "") window.location.href = window.location.href.split('#')[0];

$(document).ready(function(){
  $('body').scrollTop(0);
  if(isFacebookApp() && $('#main-content h1').height() > 60) $('body').css('font-size', '8px');
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
for (var k = 1; k < 12; k++) {
  images.push('images/quiz-images/Quiz-icon-'+k+'.png');
}
//results
for (var l = 0; l < 72; l++) {
  $('#preload').append('<img src="'+images[l]+'"></div>');
}

for (var x = 1; x <= 10; x ++) {
  images.push('images/result-images/Results-'+x+'m.png');
  images.push('images/result-images/Results-'+x+'f.png'); 
}

for (var y = 1; y <= 10; y ++) {
  for (var z = 1; z <= 3; z++) {
    images.push('images/result-images/Icons-'+y+'-'+z+'.png');
  }
}

function isFacebookApp() {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

loadImage(images)
.then(function (allImgs) {
  console.log(allImgs.length, 'images loaded!', allImgs);
  $('#loading').addClass('fade');

  if(document.getElementById('main-animation') !== null) {
    setTimeout(function(){
      $('#main-header').addClass('done');
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