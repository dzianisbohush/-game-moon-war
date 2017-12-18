class Enemy {
  constructor(pos) {
    this.pos = pos;
  }
}

class EnemyEasy extends Enemy {
  constructor(pos) {
    super(pos);
    this.lifesCount = 1;
    this.sprite = new Sprite(
      '../img/ufo.png',
      [115, 89],
      [52, 38.5],
      7,
      [0, 1, 2, 3, 4, 5, 6, 7],
    );
  }
}

class EnemyBoss extends Enemy {
  constructor(pos) {
    super(pos);
    this.lifesCount = 6;
    this.sprite = new Sprite(
      '../img/enemy-boss.png',
      [0, 0],
      [128, 128],
      6,
      [0, 1, 2, 3, 4, 3, 2, 1],
    );
  }
}

export { EnemyEasy, EnemyBoss };

