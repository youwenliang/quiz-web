import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

$(document).ready(function(){
  $('body').scrollTop(0);
  var $div = $('#preload_area');
  var array = [];
  $.each($div.css('background-image').split(', '), function(key, value){
    array.push(value.replace(/^url\(["']?/, '').replace(/["']?\)$/, ''));
  });
  var img = [];
  var count = 0;
  for (var i = 0; i < array.length; i++) {
      $('<img/>').attr('src', array[i]).on('load', function() {
        $(this).remove(); 
        console.log(count);
        count++;
        if(count === array.length) $('#loading').addClass('fade');
      });
  }
});

$(window).on('hashchange', function() {
  if(window.location.hash === "") window.location.href = window.location.href;
});