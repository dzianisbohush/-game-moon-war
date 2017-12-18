
const requestAnimFrame = (function createRequestAnimFrame() {
  return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function createTimeoutForRequestAnimFrame(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
}());

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * ((max - min) + min);
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export { requestAnimFrame, getRandomArbitrary, getRandomInt };
