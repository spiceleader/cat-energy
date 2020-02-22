'use strict'; // Picture element HTML5 shiv

document.createElement('picture'); // eslint-disable-line
// Shadow SVG for IE11

svg4everybody(); // eslint-disable-line
// JavaScript Page Toggler

var pageBody = document.querySelector('.page');

if (pageBody.classList.contains('page--no-js')) {
  pageBody.classList.remove('page--no-js');
} // Menu Toggler


var toggleButton = document.querySelector('.site-nav__toggle');
var siteNavigation = document.querySelector('.site-nav__list');

if (toggleButton) {
  toggleButton.addEventListener('click', function (event) {
    event.preventDefault();
    siteNavigation.classList.toggle('site-nav__list--closed');
    this.classList.toggle('site-nav__toggle--opened');
  });
} // Error Input Style Handler


if (document.querySelector('.program-form__form')) {
  inputErrorHandler();
}

function inputErrorHandler() {
  var submitted = false; // On submit, run evaluation and prevent if necessary

  var form = document.querySelector('.program-form__form');

  form.onsubmit = function () {
    submitted = true;
    setTimeout(function () {
      submitted = false;
    }, 0);
  }; // Iterate over fields in form


  var invalidOnSubmit = false;
  var field = form.querySelectorAll('input, textarea, select');

  for (var i = 1; i < field.length; i++) {
    Array.from(field, function (el) {
      return el.addEventListener('invalid', function () {
        if (submitted && !invalidOnSubmit) {
          invalidOnSubmit = true;
          setTimeout(function () {
            invalidOnSubmit = false;
          }, 1000);
          el.focus();
        }

        el.classList.add('program-form__input--error'); // Reset invalid state & error message on `input` event, trigger validation check

        var inputHandler = function inputHandler() {
          el.classList.remove('program-form__input--error');
          el.checkValidity();
        };

        el.oninput = inputHandler;
      });
    });
  }
}
/* eslint-disable */
// Google Map API


function initMap() {
  // Defining map position and marker size
  var viewport = document.documentElement.clientWidth || window.innerWidth;
  var mapCenter = viewport < 1300 ? {
    lat: 59.938882,
    lng: 30.32323
  } : {
    lat: 59.939065,
    lng: 30.319335
  };
  var markerCenter = viewport < 768 ? {
    lat: 59.93871,
    lng: 30.32323
  } : {
    lat: 59.93871,
    lng: 30.32299
  };
  var smallMarker = {
    width: 62,
    height: 53
  };
  var bigMarker = {
    width: 124,
    height: 106
  };
  var markerSize = viewport < 768 ? smallMarker : bigMarker; // Map option

  var option = {
    zoom: 17,
    center: mapCenter,
    mapTypeControl: false,
    zoomControl: true,
    scrollwheel: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    streetViewControl: false
  }; // Adding Map to DOM

  var map = new google.maps.Map(document.getElementById('map__google'), option); // Marker Option

  var marker = {
    url: 'img/map-pin.png',
    scaledSize: markerSize
  }; // Adding Marker

  var mapMarker = new google.maps.Marker({
    position: markerCenter,
    animation: google.maps.Animation.DROP,
    map: map,
    optimized: true,
    icon: marker
  });
}
/* eslint-enable */
// Image Compare


if (document.querySelector('.compare__controls-slider')) {
  imageCopare();
}

function imageCopare() {
  // Defining variables
  var controls = document.querySelector('.compare__controls');
  var buttonBefore = controls.querySelector('.compare__controls--before');
  var buttonAfter = controls.querySelector('.compare__controls--after');
  var sliderField = controls.querySelector('.compare__controls-slider-field');
  var slider = controls.querySelector('.compare__controls-slider');
  var slideWrapper = document.querySelector('.compare__wrapper');
  var slideBefore = slideWrapper.querySelector('.compare__image-before');
  var slideAfter = slideWrapper.querySelector('.compare__image-after');
  var sliderWidth;
  var fieldWidth; // Getting width of elements

  var getWidth = function getWidth(element) {
    // return parseInt(getComputedStyle(element).width, 10);
    return element.getBoundingClientRect().width;
  }; // Changing slide width on before button click


  buttonBefore.onclick = function (event) {
    event.preventDefault();
    slideBefore.style.width = '100%';
    slideAfter.style.width = '0';
    slider.style.left = '0';
  }; // Changing slide width on after button click


  buttonAfter.onclick = function (event) {
    event.preventDefault();
    slideBefore.style.width = '0';
    slideAfter.style.width = '100%';
    slider.style.left = fieldWidth - sliderWidth + 'px';
  }; // Moving slider to center and setting images width to 50% on double click


  slider.ondblclick = function () {
    slideBefore.style.width = '50%';
    slideAfter.style.width = '50%';
    slider.style.left = (fieldWidth - sliderWidth) / 2 + 'px';
  }; // Getting coordinates from the left brink of element  to window left edge


  var getCords = function getCords(element) {
    return element.getBoundingClientRect().left + pageXOffset;
  }; // Setting up slider


  var sliderHandler = function sliderHandler(eDown) {
    var sliderCords = getCords(slider);
    var fieldCords = getCords(sliderField);
    var shiftX = eDown.pageX - sliderCords;

    document.onmousemove = function (eMove) {
      var sliding = eMove.pageX - shiftX - fieldCords;

      if (sliding < 0) {
        sliding = 0;
      }

      var sliderOffset = fieldWidth - sliderWidth;

      if (sliding > sliderOffset) {
        sliding = sliderOffset;
      }

      var sliderValue = sliding / sliderOffset * 100;
      slider.style.left = sliding + 'px';
      slideBefore.style.width = 100 - sliderValue + '%';
      slideAfter.style.width = sliderValue + '%';
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  }; // Adding slider events


  var addSlider = function addSlider() {
    slider.addEventListener('mousedown', sliderHandler);
  }; // Removing slider events


  var removeSlider = function removeSlider() {
    slider.removeEventListener('mousedown', sliderHandler);
  }; // Initializing slider function


  function sliderInit() {
    var viewport = document.documentElement.clientWidth || window.innerWidth;

    if (viewport >= 768) {
      addSlider();
    } else {
      removeSlider();
    }

    sliderWidth = getWidth(slider);
    fieldWidth = getWidth(sliderField);
    slideBefore.style.width = '';
    slideAfter.style.width = '';
    slider.style.left = '';
  } // Calling function on page load and window resize


  window.addEventListener('load', sliderInit);
  window.addEventListener('resize', sliderInit);
}