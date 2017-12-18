(function detectInput() {
  let pressedKeys = {};

  function setKey(event, status) {
    const code = event.keyCode;
    let key;

    switch (code) {
      case 16:
        key = 'SHIFT'; break;
      case 27:
        key = 'ESC'; break;
      case 37:
        key = 'LEFT'; break;
      case 38:
        key = 'UP'; break;
      case 39:
        key = 'RIGHT'; break;
      case 40:
        key = 'DOWN'; break;
      case 18:
        key = 'ALT'; break;
      default:
        // Convert ASCII codes to letters
        key = String.fromCharCode(code);
    }

    pressedKeys[key] = status;
  }

  document.addEventListener('keydown', (e) => {
    setKey(e, true);
  });

  document.addEventListener('keyup', (e) => {
    setKey(e, false);
  });

  window.addEventListener('blur', () => {
    pressedKeys = {};
  });

  window.input = {
    isDown(key) {
      return pressedKeys[key.toUpperCase()];
    },
  };
}());
