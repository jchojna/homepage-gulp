const pageOverlay = document.querySelector('.page-overlay--js');
const headerDescription = document.querySelector('.header__description--js');
const gridContainer = document.querySelector('.grid__container--js');
const gridList = document.querySelector('.grid__list--js');

const buttons = document.querySelector('.buttons--js');
const burgerButton = document.querySelector('.button__burger--js');
const burgerButtonUpperPart = document.querySelector('.button__svg--burger-upper-js');
const randomButton = document.querySelector('.button__random--js');
const randomButtonMain = document.querySelector('.button__random-main--js');

const navIcons = document.querySelectorAll('.nav__link--js');
const arrowLeft = navIcons[0];
const arrowRight = navIcons[1];

const amountOfImages = 26;
const mediaFirstBreakpoint = 768;

const addWelcomeText = (firstName, lastName) => {
  const welcome = `Great to see you here, ${firstName} ${lastName}! <br>`
  headerDescription.innerHTML = welcome + headerDescription.innerHTML;
}

function fadeIn() {
  pageOverlay.classList.remove('page-overlay--onload');
}

const transitionPage = (element, callback, timeout) => {
  event.preventDefault();
  setTimeout(() => callback(element), timeout);
  pageOverlay.classList.add('page-overlay--visible');
}

const delayLink = (element) => {
  window.location = element.href;
}

const handleMobileMenu = () => {
  const gridItems = document.querySelectorAll('.grid__item');

  burgerButtonUpperPart.classList.toggle('button__svg--burger-open');
  gridContainer.classList.toggle('grid__container--visible');
  buttons.classList.toggle('buttons--background');
  randomButton.classList.toggle('button--hidden');

  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.toggle('grid__item--animated');
    gridItems[i].classList.toggle(`grid__item--${i+1}`);
  }
}

const make2DigitsNumber = (number) => {
  if (number < 10 && number > 0) {
    return number = `0${number}`;
  } else {
    return number;
  }
}

const generateMobileMenu = (parent) => {
  let gridItem, gridLink, currentNumber;
  for ( let i=1; i <= amountOfImages ; i++ ) {
    gridItem = document.createElement('li');
    gridLink = document.createElement('a');
    currentNumber = make2DigitsNumber(i);
    gridItem.className = "grid__item";
    gridLink.className = `grid__link grid__link--${i} grid__link--js fade-link--js`;
    parent.appendChild(gridItem);
    gridItem.appendChild(gridLink);

    gridLink.setAttribute('href', `quote_${currentNumber}.html`);
  }
}

const getHrefOfElement = (element) => {
  return element.getAttribute('href');
}

const handleKeyboard = (e) => {
  const keyCode = e.keyCode;
  
  switch ( keyCode ) {
    case 37:
      if ( !arrowLeft.classList.contains('nav__link--disabled') ) {
        transitionPage(arrowLeft, delayLink, 500);
      }
      break;
    case 39:
      if ( !arrowRight.classList.contains('nav__link--disabled') ) {
        transitionPage(arrowRight, delayLink, 500);
      }
      break;
    case 13:
      transitionPage(randomButton, delayLink, 500);
      break;
  }
}

const ifPageAddressContains = (string) => {
  const pageAddress = window.location.toString();
  return pageAddress.includes(string);
}

const generateRandomUrl = (obj) => {
  const randomNumber = make2DigitsNumber( Math.floor(Math.random() * amountOfImages) + 1 );
  obj.setAttribute('href', `quote_${randomNumber}.html`);
}

/*
 ######     ###    ##       ##        ######
##    ##   ## ##   ##       ##       ##    ##
##        ##   ##  ##       ##       ##
##       ##     ## ##       ##        ######
##       ######### ##       ##             ##
##    ## ##     ## ##       ##       ##    ##
 ######  ##     ## ######## ########  ######
*/

addWelcomeText('Dear', 'Guest');

window.onload = () => { fadeIn(); }

generateRandomUrl(randomButton);

if (randomButtonMain) {
  generateRandomUrl(randomButtonMain);
}

/*
######## ##     ## ######## ##    ## ########  ######
##       ##     ## ##       ###   ##    ##    ##    ##
##       ##     ## ##       ####  ##    ##    ##
######   ##     ## ######   ## ## ##    ##     ######
##        ##   ##  ##       ##  ####    ##          ##
##         ## ##   ##       ##   ###    ##    ##    ##
########    ###    ######## ##    ##    ##     ######
*/

burgerButton.addEventListener('click', handleMobileMenu);

if ( gridList.children.length <= 3 ) {
  generateMobileMenu(gridList);
}

const fadeLinks = document.querySelectorAll('.fade-link--js');
for ( let i = 0; i < fadeLinks.length; i++ ) {
  fadeLinks[i].addEventListener('click', () => transitionPage(event.target, delayLink, 500));
}

if ( arrowLeft ) {
  window.addEventListener('keyup', handleKeyboard);
}