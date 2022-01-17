import PlayersCard from "./PlayersCard";
import Box from "@mui/material/Box";

const Cards = ({ player1, player2, unit, result, tie, winner }) => {
  const convertValue = (valuePlayer) => {
    if (unit === "mess") {
      return valuePlayer;
    } else if (unit === "crew" && Array.isArray(valuePlayer)) {
      return valuePlayer.length > 1 ? valuePlayer.join("-") : valuePlayer[0];
    }
  };

  const groupName = unit === "mess" ? "People" : "Starships";
  return (
    <Box
      sx={{
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
      data-testid="gameCards"
    >
      <Box
        sx={{
          backgroundColor: result === tie.text ? tie.bgColor : winner.bgColor,
          padding: "20px",
          marginBottom: "30px",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
        data-testid="result"
      >
        {result === tie.text ? result : result + winner.text}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "700px",
        }}
      >
        <PlayersCard
          name={player1.name}
          group={groupName}
          value={convertValue(player1.value)}
          unit={unit.toUpperCase()}
          result={result}
          winner={winner}
        />
        <strong>VS</strong>
        <PlayersCard
          name={player2.name}
          group={groupName}
          value={convertValue(player2.value)}
          unit={unit.toUpperCase()}
          result={result}
          winner={winner}
        />
      </Box>
    </Box>
  );
};

export default Cards;
