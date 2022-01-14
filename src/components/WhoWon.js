const WhoWon = ({ namePlayer1, valuePlayer1, namePlayer2, valuePlayer2 }) => {
  return (
    <div
      style={{
        backgroundColor: valuePlayer1 === valuePlayer2 ? "yellow" : "orange",
        padding: "20px",
        borderRadius: "20px",
        fontWeight: "bold",
      }}
    >
      {valuePlayer1 === valuePlayer2
        ? "IT'S A TIE!"
        : valuePlayer1 > valuePlayer2
        ? namePlayer1 + " WINS!"
        : namePlayer2 + " WINS!"}
    </div>
  );
};

export default WhoWon;
