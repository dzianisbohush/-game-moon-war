import gameState from './game-state';
import pause from './index';
import { BigExplosion, EasyExplosion } from './explosion';
import { EnemyEasy, EnemyBoss } from './enemy';

function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
  return collides(
    pos[0],
    pos[1],
    pos[0] + size[0],
    pos[1] + size[1],
    pos2[0],
    pos2[1],
    pos2[0] + size2[0],
    pos2[1] + size2[1],
  );
}

function addScore(count) {
  gameState.score += count;
}

function detectCollisionsEnemiesWithTrapTowers() {
  for (let i = 0; i < gameState.enemies.length; i += 1) {
    const pos = gameState.enemies[i].pos;
    const size = gameState.enemies[i].sprite.size;

    for (let j = 0; j < gameState.trapTowers.length; j += 1) {
      const pos2 = gameState.trapTowers[j].pos;
      const size2 = gameState.trapTowers[j].sprite.size;

      if (boxCollides(pos, size, pos2, size2)) {
        addScore(200);

        if (!gameState.isMuted) {
          AudioFX('../sounds/explosion.mp3').play();
        }
        if (gameState.enemies[i] instanceof EnemyBoss) {
          gameState.trapTowers.splice(j, 1);
          gameState.explosions.push(new BigExplosion(pos2));
          gameState.explosions.push(new BigExplosion(pos));
        } else {
          gameState.explosions.push(new EasyExplosion(pos));
        }
        gameState.enemies.splice(i, 1);
        i += 1;
      }
    }
  }
}

function detectColisionsEasyEnemiesWithBulletsAndPlayer() {
  // collisions detection for enemies and bullets
  for (let i = 0; i < gameState.enemies.length; i += 1) {
    const pos = gameState.enemies[i].pos;
    const size = gameState.enemies[i].sprite.size;

    for (let j = 0; j < gameState.bullets.length; j += 1) {
      const pos2 = gameState.bullets[j].pos;
      const size2 = gameState.bullets[j].sprite.size;

      if (boxCollides(pos, size, pos2, size2)) {
        // Remove the bullet
        gameState.bullets.splice(j, 1);
        addScore(200);
        if (gameState.enemies[i].lifesCount > 1) {
          if (!gameState.isMuted) {
            AudioFX('../sounds/explosion.mp3').play();
          }
          gameState.enemies[i].lifesCount -= 1;
          if (gameState.enemies[i].lifesCount < 2) {
            gameState.enemies.splice(i, 1);
          }
          i += 1;
          gameState.explosions.push(new BigExplosion(pos));
          break;
        }
        if (gameState.enemies[i].lifesCount === 1) {
          if (!gameState.isMuted) {
            AudioFX('../sounds/explosion.mp3').play();
          }
          // Remove the enemy
          gameState.enemies.splice(i, 1);
          i += 1;
          gameState.explosions.push(new EasyExplosion(pos));
          break;
        }
      }
    }

    if (boxCollides(pos, size, gameState.player.pos, gameState.player.sprite.size)) {
      if (gameState.enemies[i] instanceof EnemyEasy) {
        gameState.explosions.push(new EasyExplosion(pos));
        gameState.player.lifesCount -= 1;
        gameState.enemies.splice(i, 1);
        i += 1;
      } else {
        gameState.explosions.push(new BigExplosion(pos));
        gameState.player.lifesCount -= 5;
        gameState.enemies.splice(i, 1);
        i += 1;
      }

      if (gameState.player.lifesCount <= 1) {
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('lifesCount').style.display = 'none';
        if (!gameState.isMuted) {
          AudioFX('../sounds/game-over.mp3', { volume: 0.2 }).play();
        }
        gameState.isGameOver = true;
        pause();
      }
      if (!gameState.isMuted) {
        AudioFX('../sounds/explosion.mp3').play();
      }
    }
  }
}

function detectColisionsBonusesIncreaseScore() {
  for (let i = 0; i < gameState.bonusesIncreaseScore.length; i += 1) {
    const pos = gameState.bonusesIncreaseScore[i].pos;
    const size = gameState.bonusesIncreaseScore[i].sprite.size;

    if (boxCollides(pos, size, gameState.player.pos, gameState.player.sprite.size)) {
      if (!gameState.isMuted) {
        AudioFX('../sounds/bonus.mp3', { volume: 0.03 }).play();
      }

      // Remove the bonus
      gameState.bonusesIncreaseScore.splice(i, 1);
      i -= 1;
      gameState.player.lifesCount += 1;
      addScore(10000);
    }
  }
}

function detectColisionsBonusesIncreaseBulletSpeed() {
  for (let i = 0; i < gameState.bonusesIncreaseBulletSpeed.length; i += 1) {
    const pos = gameState.bonusesIncreaseBulletSpeed[i].pos;
    const size = gameState.bonusesIncreaseBulletSpeed[i].sprite.size;

    if (boxCollides(pos, size, gameState.player.pos, gameState.player.sprite.size)) {
      if (!gameState.isMuted) {
        AudioFX('../sounds/bonus.mp3', { volume: 0.03 }).play();
      }

      // Remove the bonus
      gameState.bonusesIncreaseBulletSpeed.splice(i, 1);
      i -= 1;

      gameState.bulletSpeed += 100;
      addScore(2000);
    }
  }
}

function detectColisionsBonusesKillEnemies() {
  for (let i = 0; i < gameState.bonusesKillEnemies.length; i += 1) {
    const pos = gameState.bonusesKillEnemies[i].pos;
    const size = gameState.bonusesKillEnemies[i].sprite.size;

    if (boxCollides(pos, size, gameState.player.pos, gameState.player.sprite.size)) {
      if (!gameState.isMuted) {
        AudioFX('../sounds/explosion-big.mp3').play();
        AudioFX('../sounds/bonus.mp3', { volume: 0.03 }).play();
      }

      // Remove the bonus
      gameState.bonusesKillEnemies.splice(i, 1);
      i -= 1;
      // kill all enemies
      for (let j = 0; j < gameState.enemies.length; j += 1) {
        const pos2 = gameState.enemies[j].pos;
        gameState.explosions.push(new BigExplosion(pos2));
      }
      gameState.enemies.length = 0;
      addScore(5000);
    }
  }
}

function checkPlayerBounds() {
  if (gameState.player.pos[0] < 0) {
    gameState.player.pos[0] = 0;
  } else if (gameState.player.pos[0] > gameState.canvas.width - gameState.player.sprite.size[0]) {
    gameState.player.pos[0] = gameState.canvas.width - gameState.player.sprite.size[0];
  }

  if (gameState.player.pos[1] < 0) {
    gameState.player.pos[1] = 0;
  } else if (gameState.player.pos[1] > gameState.canvas.height - gameState.player.sprite.size[1]) {
    gameState.player.pos[1] = gameState.canvas.height - gameState.player.sprite.size[1];
  }
}

function checkCollisions() {
  checkPlayerBounds();
  detectColisionsEasyEnemiesWithBulletsAndPlayer();
  detectColisionsBonusesKillEnemies();
  detectColisionsBonusesIncreaseScore();
  detectCollisionsEnemiesWithTrapTowers();
  detectColisionsBonusesIncreaseBulletSpeed();
}

export default checkCollisions;
