class Tower {
  constructor(pos) {
    this.pos = pos;
  }
}
class FiringTower extends Tower {
  constructor(pos) {
    super(pos);
    this.lastFire = Date.now();
    this.sprite = new Sprite('../img/tower.png', [31, 0], [48, 118]);
  }
}

class TrapTower extends Tower {
  constructor(pos) {
    super(pos);
    this.sprite = new Sprite(
      '../img/trap-tower.png',
      [0, 0],
      [65, 98],
      6,
      [0, 1, 2, 3, 2, 1],
    );
  }
}

export { FiringTower, TrapTower };
