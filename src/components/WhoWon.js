import { useEffect, useRef } from "react";

const WhoWon = ({
  player1,
  player2,
  unit,
  score,
  setScore,
  verifyIfDataIsCorrect,
  setResult,
  tie,
}) => {
  const previousPlayers = useRef({ player1, player2 });

  useEffect(() => {
    if (
      previousPlayers.current.player1 !== player1 &&
      previousPlayers.current.player2 !== player2 &&
      verifyIfDataIsCorrect(player1) &&
      verifyIfDataIsCorrect(player2)
    ) {
      setResult(countScore());
      previousPlayers.current = { player1, player2 };
    }
  }, [player1, player2]);

  const compareValueAndRange = (player1, player2) => {
    let rangeMin;
    let rangeMax;
    let val;

    if (player1.value.length > 1) {
      rangeMin = Number(player1.value[0]);
      rangeMax = Number(player1.value[1]);
      val = Number(player2.value[0]);

      if (val < rangeMin) {
        setScore((score) => ({ ...score, player1: score.player1++ }));
        return player1.name;
      } else if (val >= rangeMax) {
        setScore((score) => ({ ...score, player2: score.player2++ }));
        return player2.name;
      } else {
        return tie.text;
      }
    } else {
      rangeMin = Number(player2.value[0]);
      rangeMax = Number(player2.value[1]);
      val = Number(player1.value[0]);
      if (val < rangeMin) {
        setScore((score) => ({ ...score, player2: score.player2++ }));
        return player2.name;
      } else if (val >= rangeMax) {
        setScore((score) => ({ ...score, player1: score.player1++ }));
        return player1.name;
      } else {
        return tie.text;
      }
    }
  };

  const compareValues = (player1, player2) => {
    let val1;
    let val2;

    if (Array.isArray(player1.value) && Array.isArray(player2.value)) {
      val1 = Number(player1.value[0]);
      val2 = Number(player2.value[0]);
    } else {
      val1 = Number(player1.value);
      val2 = Number(player2.value);
    }

    if (val1 > val2) {
      setScore((score) => ({ ...score, player1: score.player1++ }));
      return player1.name;
    } else if (val1 < val2) {
      setScore((score) => ({ ...score, player2: score.player2++ }));
      return player2.name;
    } else {
      return tie.text;
    }
  };

  const countScore = () => {
    if (unit === "mass") {
      return compareValues(player1, player2);
    } else if (unit === "crew") {
      const isRangeCrew1 = player1.value.length > 1;
      const isRangeCrew2 = player2.value.length > 1;
      if (isRangeCrew1 && isRangeCrew2) {
        return tie.text;
      } else if (isRangeCrew1 || isRangeCrew2) {
        return compareValueAndRange(player1, player2);
      } else {
        return compareValues(player1, player2);
      }
    }
  };

  return (
    <div style={{ display: "flex", fontSize: "32px" }} data-testid="gameScore">
      {score.player1}
      <span>:</span>
      {score.player2}
    </div>
  );
};

export default WhoWon;
