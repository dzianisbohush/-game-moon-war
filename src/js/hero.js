class Hero {
  constructor(position, lifesCount) {
    this.pos = position;
    this.lifesCount = lifesCount;
    this.sprite = new Sprite('../img/hero.png', [0, 0], [58, 58.4], 2, [0, 1, 2, 1]);
    this.down = new Sprite('../img/hero.png', [0, 0], [58, 58.4], 3, [0, 1, 2, 1]);
    this.up = new Sprite('../img/hero.png', [0, 173], [58, 58.4], 3, [0, 1, 2, 1]);
    this.left = new Sprite('../img/hero.png', [0, 58], [58, 58.4], 3, [0, 1, 2, 1]);
    this.right = new Sprite('../img/hero.png', [0, 116.6], [58, 58.4], 3, [0, 1, 2, 1]);
  }
}

export default Hero;
