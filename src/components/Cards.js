import PlayersCard from "./PlayersCard";
import Box from "@mui/material/Box";

const Cards = ({ player1, player2, unit, result }) => {
  const convertValue = (valuePlayer) => {
    if (unit === "mess") {
      return valuePlayer;
    } else if (unit === "crew" && Array.isArray(valuePlayer)) {
      return valuePlayer.length > 1 ? valuePlayer.join("-") : valuePlayer[0];
    }
  };

  const groupName = unit === "people" ? "People" : "Starships";
  const nameOfTheWinner = result.replace(" WINS!", "");
  return (
    <Box
      sx={{
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <Box
        sx={{
          backgroundColor: result.includes("TIE!") ? "yellow" : "lightgreen",
          padding: "20px",
          marginBottom: "30px",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        {result}
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
          title={player1.name}
          subtitle={groupName}
          content={convertValue(player1.value)}
          footer={unit.toUpperCase()}
          nameOfTheWinner={nameOfTheWinner}
        />
        <strong>VS</strong>
        <PlayersCard
          title={player2.name}
          subtitle={groupName}
          content={convertValue(player2.value)}
          footer={unit.toUpperCase()}
          nameOfTheWinner={nameOfTheWinner}
        />
      </Box>
    </Box>
  );
};

export default Cards;
