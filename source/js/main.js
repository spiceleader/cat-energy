'use strict';

// Picture element HTML5 shiv
document.createElement("picture"); // eslint-disable-line

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
