class Explosion {
  constructor(pos) {
    this.pos = pos;
  }
}

class EasyExplosion extends Explosion {
  constructor(pos) {
    super(pos);
    this.sprite = new Sprite(
      '../img/ufo.png',
      [30, 196],
      [73, 59],
      15,
      [0, 1, 2, 3, 4, 5, 6, 7],
      null,
      true,
    );
  }
}

class BigExplosion extends Explosion {
  constructor(pos) {
    super(pos);
    this.sprite = new Sprite(
      '../img/enemy-boss-explosion.png',
      [0, 0],
      [96, 96],
      15,
      [0, 1, 2, 3, 4, 5],
      null,
      true,
    );
  }
}

export { EasyExplosion, BigExplosion };

