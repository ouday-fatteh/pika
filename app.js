import splashScreen from "./splashScreen.js";

let isPaused = false;
function app() {
  splashScreen();
  function waitForIt() {
    const baseurl = window.location.origin+window.location.pathname;
    if (!isPaused) {
      setTimeout(function () {
        waitForIt();
      }, 100);
    } else {
      window.location.replace(baseurl+"home.html");
    }
  }
  waitForIt();
}
app();

export function changeHandler(value) {
  isPaused = value;
}
