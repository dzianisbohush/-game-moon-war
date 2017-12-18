import '../scss/landing-page.scss';
import gameState from './game-state';
import render from './render-game';
import update from './update-game';
// import Hero from './hero';
import { requestAnimFrame } from './helpers';

const musicWall = AudioFX('../sounds/wall.mp3', {
  volume: 0.03,
  loop: true,
  autoplay: true,
});

// The main game loop
function main() {
  const now = Date.now();
  const dt = (now - gameState.lastTime) / 1000.0;
  update(dt);
  render();
  gameState.lastTime = now;
  if (!gameState.isPause) {
    requestAnimFrame(main);
  }
}

resources.load([
  '../img/tower.png',
  '../img/ufo.png',
  '../img/hero.png',
  '../img/bullet.png',
  '../img/terrain.png',
  '../img/bonus-increase-bullet-speed.png',
  '../img/bonus-increase-score.png',
  '../img/bonus-kill-enemies.png',
  '../img/enemy-boss.png',
  '../img/enemy-boss-explosion.png',
  '../img/trap-tower.png',
]);

function createCanvas() {
  gameState.canvas = document.createElement('canvas');
  gameState.canvasContext = gameState.canvas.getContext('2d');
  gameState.canvas.width = 1200;
  gameState.canvas.height = 700;
  document.querySelector('.canvas').appendChild(gameState.canvas);
}

function pause() {
  if (!gameState.isPause) {
    gameState.isPause = true;
    document.getElementById('pause-button').innerText = 'RESUME';
    musicWall.stop();
  } else if (gameState.isPause) {
    document.getElementById('pause-button').innerText = 'PAUSE';
    gameState.isPause = false;
    gameState.lastTime = new Date();
    if (!gameState.isMuted) {
      musicWall.play();
    }
    main();
  }
}

function reset() {
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('lifesCount').style.display = 'block';
  gameState.isGameOver = false;
  gameState.gameTime = 0;
  gameState.lastTower = 0;
  gameState.lastTrapTower = 0;
  gameState.score = 0;
  gameState.player.lifesCount = 3;
  gameState.bulletSpeed = 350;
  gameState.isPause = true;
  pause();
  gameState.bonusesIncreaseScore = [];
  gameState.bonusesIncreaseBulletSpeed = [];
  gameState.bonusesKillEnemies = [];
  gameState.towers = [];
  gameState.trapTowers = [];
  gameState.enemies = [];
  gameState.bullets = [];
  gameState.player.pos = [gameState.canvas.width / 2, gameState.canvas.height / 2];
}

function mute() {
  const muteButton = document.getElementById('mute-button');
  if (!gameState.isMuted) {
    gameState.isMuted = true; muteButton.classList.remove('fa-volume-up');
    muteButton.classList.add('fa-volume-off');
    musicWall.stop();
  } else if (gameState.isMuted) {
    gameState.isMuted = false;
    muteButton.classList.remove('fa-volume-off');
    muteButton.classList.add('fa-volume-up');
    musicWall.play();
  }
}

window.addEventListener('keydown', (event) => {
  const key = event.keyCode;
  if (key === 80) {
    pause();
  }
  if (key === 77) {
    mute();
  }
});

function init() {
  createCanvas();
  gameState.terrainPattern = gameState.canvasContext.createPattern(
    resources.get('../img/terrain.png'),
    'repeat',
  );

  document.getElementById('play-again').addEventListener('click', reset);
  document.getElementById('pause-button').addEventListener('click', pause);
  document.getElementById('mute-button').addEventListener('click', mute);
  reset();
  gameState.lastTime = Date.now();
  musicWall.play();
  main();
}

resources.onReady(init);

export default pause;

