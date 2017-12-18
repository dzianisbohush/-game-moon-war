import Hero from './hero';

const gameState = {
  player: new Hero([0, 0], 3),

  playerSpeed: 170,
  bulletSpeed: 100,
  enemySpeed: 100,

  towers: [],
  trapTowers: [],
  bullets: [],
  enemies: [],
  explosions: [],

  bonusesIncreaseScore: [],
  bonusesIncreaseBulletSpeed: [],
  bonusesKillEnemies: [],

  lastTower: 0,
  lastTrapTower: 0,
  gameTime: 0,
  lastTime: new Date(),
  isGameOver: false,
  isPause: false,
  isMuted: false,
  score: 0,

  scoreEl: document.getElementById('score'),
  lifesCountEl: document.getElementById('lifesCount'),
  canvasContext: undefined,
  canvas: undefined,
  terrainPattern: undefined,

};

export default gameState;
