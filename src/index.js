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
});

$(window).on('hashchange', function() {
  if(window.location.hash === "") window.location.href = window.location.href;
});