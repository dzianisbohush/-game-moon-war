import gameState from './game-state';

function renderEntity(entity) {
  gameState.canvasContext.save();
  gameState.canvasContext.translate(entity.pos[0], entity.pos[1]);
  entity.sprite.render(gameState.canvasContext);
  gameState.canvasContext.restore();
}

function renderEntities(collection) {
  for (let i = 0; i < collection.length; i += 1) {
    renderEntity(collection[i]);
  }
}

function render() {
  gameState.canvasContext.fillStyle = gameState.terrainPattern;
  gameState.canvasContext.fillRect(0, 0, gameState.canvas.width, gameState.canvas.height);
  if (!gameState.isGameOver) {
    renderEntity(gameState.player);
    renderEntities(gameState.towers);
    renderEntities(gameState.trapTowers);
    renderEntities(gameState.bonusesIncreaseScore);
    renderEntities(gameState.bonusesIncreaseBulletSpeed);
    renderEntities(gameState.bonusesKillEnemies);
    renderEntities(gameState.enemies);
    renderEntities(gameState.bullets);
    renderEntities(gameState.explosions);
  }
}

export default render;
