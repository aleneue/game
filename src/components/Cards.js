import Card from "./Card";
import WhoWon from "./WhoWon";

const Cards = ({ namePlayer1, valuePlayer1, namePlayer2, valuePlayer2 }) => {
  return (
    <>
      <WhoWon
        namePlayer1={namePlayer1}
        valuePlayer1={valuePlayer1}
        namePlayer2={namePlayer2}
        valuePlayer2={valuePlayer2}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "700px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Card title={namePlayer1} subtitle={`MASS: ${valuePlayer1}`} />
          <strong>VS</strong>
          <Card title={namePlayer2} subtitle={`MASS: ${valuePlayer2}`} />
        </div>
      </div>
    </>
  );
};

export default Cards;
