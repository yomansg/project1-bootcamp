import one from "./assets/one.png";
import two from "./assets/two.png";
import three from "./assets/three.png";
import four from "./assets/four.png";
import five from "./assets/five.png";
import six from "./assets/six.png";

export const DiceImage = ({ roll }) => {
  switch (roll) {
    case 1:
      return <img className="dice-image" src={one} alt="1" />;
    case 2:
      return <img className="dice-image" src={two} alt="2" />;
    case 3:
      return <img className="dice-image" src={three} alt="3" />;
    case 4:
      return <img className="dice-image" src={four} alt="4" />;
    case 5:
      return <img className="dice-image" src={five} alt="5" />;
    default:
      return <img className="dice-image" src={six} alt="6" />;
  }
};
