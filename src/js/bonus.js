class Bonus {
  constructor(pos, pathToImage) {
    this.pos = pos;
    this.sprite = new Sprite(
      pathToImage,
      [0, 0],
      [32, 31],
      6,
      [0, 1, 2, 3, 4, 5, 6, 7],
    );
  }
}

export default Bonus;
