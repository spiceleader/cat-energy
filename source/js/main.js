'use strict';

// Picture element HTML5 shiv
document.createElement('picture'); // eslint-disable-line

// Shadow SVG for IE11
svg4everybody(); // eslint-disable-line

// JavaScript Page Toggler
const pageBody = document.querySelector('.page');
if (pageBody.classList.contains('page--no-js')) {
  pageBody.classList.remove('page--no-js');
}

// Menu Toggler
const toggleButton = document.querySelector('.site-nav__toggle');
const siteNavigation = document.querySelector('.site-nav__list');

if (toggleButton) {
  toggleButton.addEventListener('click', function (event) {
    event.preventDefault();
    siteNavigation.classList.toggle('site-nav__list--closed');
    this.classList.toggle('site-nav__toggle--opened');
  });
}

let submitted = false;

// On submit, run evaluation and prevent if necessary
const form = document.querySelector('.program-form__form');
form.onsubmit = () => {
  submitted = true;
  setTimeout(() => {
    submitted = false;
  }, 0);
};

// Iterate over fields in form
let invalidOnSubmit = false;
for (const field of form.querySelectorAll('input, textarea, select')) {

  // Show message on `invalid` event
  field.oninvalid = () => {
    if (submitted && !invalidOnSubmit) {
      invalidOnSubmit = true;
      setTimeout(() => {
        invalidOnSubmit = false;
      }, 1000);

      field.focus();
    }

    field.classList.add('program-form__input--error');

    // Reset invalid state & error message on `input` event, trigger validation check
    const inputHandler = () => {
      field.classList.remove('program-form__input--error');
      field.checkValidity();
    };
    field.oninput = inputHandler;
  };
}

// Image Compare
(function () {

  // Defining variables
  let controls = document.querySelector('.compare__controls');
  let buttonBefore = controls.querySelector('.compare__controls--before');
  let buttonAfter = controls.querySelector('.compare__controls--after');
  let sliderField = controls.querySelector('.compare__controls-slider-field');
  let slider = controls.querySelector('.compare__controls-slider');
  let slideWrapper = document.querySelector('.compare__wrapper');
  let slideBefore = slideWrapper.querySelector('.compare__image-before');
  let slideAfter = slideWrapper.querySelector('.compare__image-after');
  let sliderWidth,
    fieldWidth;

  // Getting width of elements
  let getWidth = function (element) {
    return parseInt(getComputedStyle(element).width, 10);
  };

  // Changing slide width on before button click
  buttonBefore.onclick = function (event) {
    event.preventDefault();
    slideBefore.style.width = '100%';
    slideAfter.style.width = '0';
    slider.style.left = '0';
  };

  // Changing slide width on after button click
  buttonAfter.onclick = function (event) {
    event.preventDefault();
    slideBefore.style.width = '0';
    slideAfter.style.width = '100%';
    slider.style.left = fieldWidth - sliderWidth + 'px';
  };

  // Moving slider to center and setting images width to 50% on double click
  slider.ondblclick = function () {
    slideBefore.style.width = '50%';
    slideAfter.style.width = '50%';
    slider.style.left = (fieldWidth - sliderWidth) / 2 + 'px';
  };

  // Getting coordinates from the left brink of element  to window left edge
  let getCords = function (element) {
    return element.getBoundingClientRect().left + pageXOffset;
  };

  // Setting up slider
  let sliderHandler = function (eDown) {

    let sliderCords = getCords(slider);
    let fieldCords = getCords(sliderField);

    let shiftX = eDown.pageX - sliderCords;

    document.onmousemove = function (eMove) {
      let sliding = eMove.pageX - shiftX - fieldCords;

      if (sliding < 0) {
        sliding = 0;
      }

      let sliderOffset = fieldWidth - sliderWidth;

      if (sliding > sliderOffset) {
        sliding = sliderOffset;
      }

      let sliderValue = sliding / sliderOffset * 100;
      slider.style.left = sliding + 'px';

      slideBefore.style.width = (100 - sliderValue) + '%';
      slideAfter.style.width = sliderValue + '%';
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  };

  // Adding slider events
  let addSlider = function () {
    slider.addEventListener('mousedown', sliderHandler);
  };

  // Removing slider events
  let removeSlider = function () {
    slider.removeEventListener('mousedown', sliderHandler);
  };

  // Initializing slider function
  function sliderInit() {
    let viewport = document.documentElement.clientWidth || window.innerWidth;

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
  }

  // Calling function on page load and window resize
  window.addEventListener('load', sliderInit);
  window.addEventListener('resize', sliderInit);
})();
