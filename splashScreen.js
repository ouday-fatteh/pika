//create elements
import { changeHandler } from "./app.js";
import { screens } from "./consts.js";


function splashScreen() {
  let animSpeed = 8000;
  let fadeInPerc = 50;
  let fadeOutPerc = 50;
  let timeBetween = 1000;
  let loaderTimeout = 3000;

  function animate(start, element) {
    let timer = setInterval(() => {
      let timePassed = Date.now() - start;
      if (timePassed >= animSpeed) {
        clearInterval(timer);
        return;
      }
      fadeIn(element, timePassed);
      fadeOut(element, timePassed);
      zoom(element, timePassed);
    }, 20);
  }

  function fadeIn(element, timePassed) {
    if (timePassed < (fadeInPerc / 100) * animSpeed)
      element.style.opacity = timePassed / ((fadeInPerc / 100) * animSpeed);
    return;
  }
  function fadeOut(element, timePassed) {
    if (timePassed >= (fadeInPerc / 100) * animSpeed)
      element.style.opacity =
        (animSpeed - timePassed) / ((fadeOutPerc / 100) * animSpeed);
    return;
  }

  function zoom(element, timePassed) {
    element.childNodes[0].style.fontSize =
      2 + timePassed / animSpeed + "rem";
  }
  function initElement() {
    screens.forEach((element, index) => {
      element.scElement = document.createElement("div");
      element.scElement.classList.add(`sc-${index + 1}`);
    });
  }

  //import main element
  const root = document.getElementById("main-screen");
  if (root === null) return;
  function removeElement(parent, selector) {
    const elem = document.querySelector(`.${selector}`);
    parent.removeChild(elem);
  }

  function screenInit(num) {
    let start = Date.now();
    const text = document.createElement("span");
    text.classList.add("textcontent");
    if (num + 1 === screens.length) {
      text.innerHTML = screens[num].text;
      const loader = document.createElement("div");
      loader.classList.add("loader");
      screens[num].scElement.appendChild(loader);
      root.appendChild(screens[num].scElement);
      root.appendChild(text);
      setTimeout(() => {
        removeElement(root.childNodes[0], "loader");
        removeElement(root, "textcontent");
        changeHandler(true);
      }, loaderTimeout);
    } else {
      text.innerHTML = screens[num].text.toUpperCase();
      screens[num].scElement.appendChild(text);
      root.appendChild(screens[num].scElement);
      animate(start, screens[num].scElement);
      setTimeout(() => {
        screens[num].show = false;
        removeElement(root, screens[num].scElement.classList[0]);
        if (num + 1 < screens.length) {
          screens[num + 1].show = true;
          displayElements(num + 1);
        }
      }, animSpeed);
    }
  }

  function displayElements(i) {
    if (screens[i].show && i === 0) screenInit(i);
    else if (screens[i].show && i != 0)
      setTimeout(() => screenInit(i), timeBetween);
  }

  initElement();
  displayElements(0);
}

export default splashScreen;