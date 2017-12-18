
class Bullet {
  constructor(pos, angle) {
    this.pos = pos;
    this.angle = angle;
    this.sprite = new Sprite('../img/bullet.png', [0, 0], [24, 24]);
  }
}

export default Bullet;
