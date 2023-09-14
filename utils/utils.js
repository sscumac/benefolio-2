export default {
  randomFlexPosition() {
    let pos;
    const index = this.getRandomNumberNotEqualToPrevious(0, 3);
    switch (index) {
      case 0:
        pos = "justify-start";
        break;
      case 1:
        pos = "justify-center";
        break;
      case 2:
        pos = "justify-end";
        break;
    }
    return pos;
  },
  getRandomNumberNotEqualToPrevious(min, max) {
    let random;
    do {
      random = Math.floor(Math.random() * (max - min)) + min;
    } while (random === this.last);
    this.last = random;
    return random;
  },
  rotateImg() {
    const max = 9;
    const min = 0;
    let index = Math.round(Math.floor(Math.random() * (max - min)) + min);
    index = index < 5 ? index * -3 : index * 3;
    return `transform: rotate(${index}deg)`;
  },
};
