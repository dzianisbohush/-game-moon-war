import gameState from './game-state';
import checkCollisions from './collisions';
import { EnemyEasy, EnemyBoss } from './enemy';
import Bonus from './bonus';
import Bullet from './bullet';
import { FiringTower, TrapTower } from './tower';
import { getRandomArbitrary, getRandomInt } from './helpers';

function addEasyEnemies() {
  if (Math.random() < 1 - (0.999 ** gameState.gameTime)) {
    switch (getRandomInt(0, 4)) {
      // left
      case 0:
        gameState.enemies.push(new EnemyEasy([0, Math.random() * (gameState.canvas.height - 30)]));
        break;
        // top
      case 1:
        gameState.enemies.push(new EnemyEasy([Math.random() * gameState.canvas.width, 0]));
        break;
        // bottom
      case 2:
        gameState.enemies.push(new EnemyEasy([
          Math.random() * gameState.canvas.width,
          gameState.canvas.height - 30,
        ]));
        break;
      default:
        // right
        gameState.enemies.push(new EnemyEasy([
          gameState.canvas.width,
          Math.random() * (gameState.canvas.height - 30),
        ]));
        break;
    }
  }
}

function addBossEnemies() {
  if (Math.random() < 1 - (0.9999 ** gameState.gameTime)) {
    switch (getRandomInt(0, 2)) {
      // left
      case 0:
        gameState.enemies.push(new EnemyBoss([0, Math.random() * (gameState.canvas.height - 30)]));
        break;
      default:
        // right
        gameState.enemies.push(new EnemyBoss([
          gameState.canvas.width,
          Math.random() * (gameState.canvas.height - 30),
        ]));
        break;
    }
  }
}

function addBonuses() {
  if (Math.random() < 1 - (0.9995 ** gameState.gameTime)) {
    const kindOfBonus = getRandomInt(1, 4);
    switch (kindOfBonus) {
      case 1:
        if (gameState.bonusesIncreaseBulletSpeed.length <= 3) {
          gameState.bonusesIncreaseBulletSpeed.push(new Bonus(
            [getRandomInt(50, 1150), getRandomInt(50, 650)],
            '../img/bonus-increase-bullet-speed.png',
          ));
        }
        break;

      case 2:
        if (gameState.bonusesIncreaseScore.length <= 3) {
          gameState.bonusesIncreaseScore.push(new Bonus(
            [getRandomInt(50, 1150), getRandomInt(50, 650)],
            '../img/bonus-increase-score.png',
          ));
        }
        break;

      default:
        if (gameState.bonusesKillEnemies.length <= 3) {
          gameState.bonusesKillEnemies.push(new Bonus(
            [getRandomInt(50, 1150), getRandomInt(50, 650)],
            '../img/bonus-kill-enemies.png',
          ));
        }
        break;
    }
  }
}

function handleInput(dt) {
  if (input.isDown('DOWN') || input.isDown('s')) {
    gameState.player.pos[1] += gameState.playerSpeed * dt;
    gameState.player.sprite = gameState.player.down;
  }

  if (input.isDown('UP') || input.isDown('w')) {
    gameState.player.pos[1] -= gameState.playerSpeed * dt;
    gameState.player.sprite = gameState.player.up;
  }

  if (input.isDown('LEFT') || input.isDown('a')) {
    gameState.player.pos[0] -= gameState.playerSpeed * dt;
    gameState.player.sprite = gameState.player.left;
  }

  if (input.isDown('RIGHT') || input.isDown('d')) {
    gameState.player.pos[0] += gameState.playerSpeed * dt;
    gameState.player.sprite = gameState.player.right;
  }

  if (input.isDown('SHIFT') && !gameState.isGameOver) {
    let isClosest = false;
    for (let i = 0; i < gameState.towers.length; i += 1) {
      if (
        Math.abs(gameState.player.pos[0] - gameState.towers[i].pos[0]) < 70 &&
        Math.abs(gameState.player.pos[1] - gameState.towers[i].pos[1]) < 70
      ) {
        isClosest = true;
      }
    }

    if (!isClosest) {
      if (!gameState.isMuted) {
        AudioFX('../sounds/new-tower.mp3', { volume: 0.05 }).play();
      }
      gameState.towers[gameState.lastTower % 3] =
        new FiringTower([gameState.player.pos[0], gameState.player.pos[1] - 55]);
      gameState.lastTower += 1;
    }
  }

  if (input.isDown('ALT') && !gameState.isGameOver) {
    let isClosest = false;
    for (let i = 0; i < gameState.trapTowers.length; i += 1) {
      if (
        Math.abs(gameState.player.pos[0] - gameState.trapTowers[i].pos[0]) < 150 &&
        Math.abs(gameState.player.pos[1] - gameState.trapTowers[i].pos[1]) < 150
      ) {
        isClosest = true;
      }
    }
    if (!isClosest) {
      if (!gameState.isMuted) {
        AudioFX('../sounds/new-tower.mp3', { volume: 0.05 }).play();
      }
      gameState.trapTowers[gameState.lastTrapTower % 2] =
      new TrapTower([gameState.player.pos[0], gameState.player.pos[1] - 55]);
      gameState.lastTrapTower += 1;
    }
  }
}

function updateEntities(dt) {
  // Update the player sprite animation
  gameState.player.sprite.update(dt);

  // update bonuses animations
  for (let i = 0; i < gameState.bonusesIncreaseBulletSpeed.length; i += 1) {
    gameState.bonusesIncreaseBulletSpeed[i].sprite.update(dt);
  }
  for (let i = 0; i < gameState.bonusesIncreaseScore.length; i += 1) {
    gameState.bonusesIncreaseScore[i].sprite.update(dt);
  }
  for (let i = 0; i < gameState.bonusesKillEnemies.length; i += 1) {
    gameState.bonusesKillEnemies[i].sprite.update(dt);
  }

  // Update the firing towers
  for (let i = 0; i < gameState.towers.length; i += 1) {
    const tower = gameState.towers[i];
    tower.sprite.update(dt);

    if (!gameState.isGameOver && Date.now() - tower.lastFire > 500) {
      const x = tower.pos[0] + (tower.sprite.size[0] / 2);
      const y = tower.pos[1] + (tower.sprite.size[1] / 2);
      gameState.bullets.push((new Bullet([x, y], getRandomArbitrary(-2 * Math.PI, 2 * Math.PI))));
      tower.lastFire = Date.now();
    }
  }

  //   Update trap towers
  for (let i = 0; i < gameState.trapTowers.length; i += 1) {
    const trapTower = gameState.trapTowers[i];
    trapTower.sprite.update(dt);
  }

  // Update all the bullets
  for (let i = 0; i < gameState.bullets.length; i += 1) {
    const bullet = gameState.bullets[i];

    const pathBulletLenght = dt * gameState.bulletSpeed;
    const sin = Math.sin(bullet.angle);
    const cos = Math.cos(bullet.angle);

    bullet.pos[0] += sin * pathBulletLenght;
    bullet.pos[1] += cos * pathBulletLenght;

    // Remove the bullet if it goes offscreen
    if (
      bullet.pos[1] < 0 ||
      bullet.pos[1] > gameState.canvas.height ||
      bullet.pos[0] > gameState.canvas.width
    ) {
      gameState.bullets.splice(i, 1);
      i -= 1;
    }
  }

  // Update all the  enemies
  for (let i = 0; i < gameState.enemies.length; i += 1) {
    const x0 = gameState.enemies[i].pos[0];
    const y0 = gameState.enemies[i].pos[1];
    const x1 = gameState.player.pos[0];
    const y1 = gameState.player.pos[1];
    const c = gameState.enemySpeed * dt;
    const l = Math.sqrt(((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0)));

    gameState.enemies[i].pos[0] += (x1 - x0) * (c / l);
    gameState.enemies[i].pos[1] += (y1 - y0) * (c / l);

    gameState.enemies[i].sprite.update(dt);

    // Remove if offscreen
    if (gameState.enemies[i].pos[0] + gameState.enemies[i].sprite.size[0] < 0) {
      gameState.enemies.splice(i, 1);
      i -= 1;
    }
  }

  // Update all the explosions
  for (let i = 0; i < gameState.explosions.length; i += 1) {
    gameState.explosions[i].sprite.update(dt);

    // Remove if animation is done
    if (gameState.explosions[i].sprite.done) {
      gameState.explosions.splice(i, 1);
      i -= 1;
    }
  }
}

function update(dt) {
  gameState.gameTime += dt;
  handleInput(dt);
  updateEntities(dt);
  addBossEnemies();
  addEasyEnemies();
  addBonuses();
  checkCollisions();
  gameState.scoreEl.innerHTML = gameState.score;
  gameState.lifesCountEl.innerHTML = gameState.player.lifesCount;
}

export default update;
