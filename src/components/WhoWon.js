const WhoWon = ({
  namePlayer1,
  valuePlayer1,
  namePlayer2,
  valuePlayer2,
  unit,
}) => {
  const compareValueAndRange = (playerValue, playerRange) => {
    const rangeMin = Number(playerRange.range[0]);
    const rangeMax = Number(playerRange.range[1]);
    const val = Number(playerValue.value);

    return val < rangeMin
      ? playerRange.name + " WINS!"
      : val >= rangeMin && val <= rangeMax
      ? "IT'S A TIE!"
      : playerValue.name + " WINS!";
  };

  const compareValues = (player1, player2) => {
    const val1 = Number(player1);
    const val2 = Number(player2);

    return val1 === val2
      ? "IT'S A TIE!"
      : val1 > val2
      ? namePlayer1 + " WINS!"
      : namePlayer2 + " WINS!";
  };

  let result;

  if (unit === "mess") {
    result = compareValues(valuePlayer1, valuePlayer2);
  } else if (unit === "crew") {
    const isRangeCrew1 = valuePlayer1.length > 1;
    const isRangeCrew2 = valuePlayer2.length > 1;
    result =
      isRangeCrew1 && isRangeCrew2
        ? "IT'S A TIE!"
        : isRangeCrew1
        ? compareValueAndRange(
            { value: valuePlayer2, name: namePlayer2 },
            { range: valuePlayer1, name: namePlayer1 }
          )
        : isRangeCrew2
        ? compareValueAndRange(
            { value: valuePlayer1, name: namePlayer1 },
            { range: valuePlayer2, name: namePlayer2 }
          )
        : compareValues(valuePlayer1[0], valuePlayer2[0]);
  }

  return (
    <div
      style={{
        backgroundColor: result.includes("TIE!") ? "yellow" : "orange",
        padding: "20px",
        borderRadius: "20px",
        fontWeight: "bold",
      }}
    >
      {result}
    </div>
  );
};

export default WhoWon;
