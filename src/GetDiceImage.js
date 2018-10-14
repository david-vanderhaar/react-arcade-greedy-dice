import one from'./images/dice-six-faces-one.png';
import two from'./images/dice-six-faces-two.png';
import three from'./images/dice-six-faces-three.png';
import four from'./images/dice-six-faces-four.png';
import five from'./images/dice-six-faces-five.png';
import six from'./images/dice-six-faces-six.png';

export function getDiceImage(pips) {
  let paths = [
    one,
    two,
    three,
    four,
    five,
    six,
  ]
  return paths[pips - 1];
};
