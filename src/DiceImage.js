// import one from "./assets/1.png";
// import two from "./assets/2.png";
// import three from "./assets/3.png";
// import four from "./assets/4.png";
// import five from "./assets/5.png";
// import six from "./assets/6.png";

// export const DiceImage = ({ roll }) => {
//   switch (roll) {
//     case 1:
//       return <img className="dice-image" src={one} alt="1" />;
//     case 2:
//       return <img className="dice-image" src={two} alt="2" />;
//     case 3:
//       return <img className="dice-image" src={three} alt="3" />;
//     case 4:
//       return <img className="dice-image" src={four} alt="4" />;
//     case 5:
//       return <img className="dice-image" src={five} alt="5" />;
//     default:
//       return <img className="dice-image" src={six} alt="6" />;
//   }
// };

export const DiceImage = ({ roll }) => {
  return <img className="dice-image" src={`./assets/${roll}.png`} alt={roll} />;
};
