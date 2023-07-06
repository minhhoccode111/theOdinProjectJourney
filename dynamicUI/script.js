'use strict';
const container = document.querySelector('.container');
const child = document.querySelector('.child');

const text = `transform: translate(400%, 0rem) rotateZ(11450deg) scale(0.02)`;

container.addEventListener('click', () => {
  container.classList.toggle('clicked');
});
