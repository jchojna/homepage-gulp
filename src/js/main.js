const pageOverlay = document.querySelector('.page-overlay--js');
const headerDescription = document.querySelector('.header__description--js');
const gridContainer = document.querySelector('.nav__grid-container--js');
const navListGrid = document.querySelector('.nav__grid-list--js');
const buttons = document.querySelector('.buttons--js');
const burgerButton = document.querySelector('.button__burger--js');
const burgerButtonUpperPart = document.querySelector('.button__burger-upper--js');
const randomButton = document.querySelector('.button__random--js');
const mainRandomButton = document.querySelector('.random__button--js');

const amountOfImages = 26;
const mediaFirstBreakpoint = 768;

const addWelcomeText = (firstName, lastName) => {
  const welcome = `Great to see you here, ${firstName} ${lastName}! <br>`
  headerDescription.innerHTML = welcome + headerDescription.innerHTML;
}

function fadeIn() {
  pageOverlay.classList.remove('page-overlay--onload');
}

const transitionPage = (event, callback, timeout) => {
  event.preventDefault();
  setTimeout(() => callback(event.target), timeout);
  pageOverlay.classList.add('page-overlay--visible');
}

const delayLink = (element) => {
  window.location = element.href;
}

const handleMobileMenu = () => {
  burgerButtonUpperPart.classList.toggle('button__burger-upper--open');
  gridContainer.classList.toggle('nav__grid-container--visible');
  buttons.classList.toggle('buttons--background');
  randomButton.classList.toggle('button--hidden');
}

const make2DigitsNumber = (number) => {
  if (number < 10 && number > 0) {
    return number = `0${number}`;
  } else {
    return number;
  }
}

const generateMobileMenu = (parent) => {
  let navItemGrid, navLinkGrid, currentNumber;
  for ( let i=1; i <= amountOfImages ; i++ ) {
    navItemGrid = document.createElement('li');
    navLinkGrid = document.createElement('a');
    currentNumber = make2DigitsNumber(i);
    navItemGrid.className = "nav__item nav__grid-item";
    navLinkGrid.className = `nav__link nav__grid-link nav__grid-link--${i} nav__link--js`;
    parent.appendChild(navItemGrid);
    navItemGrid.appendChild(navLinkGrid);

    navLinkGrid.setAttribute('href', `quote_${currentNumber}.html`);
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

window.onload = () => {
  fadeIn();
}

addWelcomeText('Dear', 'Guest');

generateRandomUrl(randomButton);
if ( ifPageAddressContains('index') ) {
  generateRandomUrl(mainRandomButton);
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

if ( navListGrid.children.length <= 3 ) {
  generateMobileMenu(navListGrid);
}

ifPageAddressContains('fds');

const navigationLinks = document.querySelectorAll('.nav__link--js');
for ( let i = 0; i < navigationLinks.length; i++ ) {
  navigationLinks[i].addEventListener('click', () => transitionPage(event, delayLink, 500));
}