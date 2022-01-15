import PlayersCard from "./PlayersCard";
import WhoWon from "./WhoWon";
import Box from "@mui/material/Box";

const Cards = ({
  namePlayer1,
  valuePlayer1,
  namePlayer2,
  valuePlayer2,
  unit,
}) => {
  const convertValue = (valuePlayer) => {
    if (unit === "mess") {
      return valuePlayer;
    } else if (unit === "crew" && Array.isArray(valuePlayer)) {
      return valuePlayer.length > 1 ? valuePlayer.join("-") : valuePlayer[0];
    }
  };

  const groupName = unit === "people" ? "People" : "Starships";

  return (
    <>
      <WhoWon
        namePlayer1={namePlayer1}
        valuePlayer1={valuePlayer1}
        namePlayer2={namePlayer2}
        valuePlayer2={valuePlayer2}
        unit={unit}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "700px",
        }}
      >
        <PlayersCard
          title={namePlayer1}
          subtitle={groupName}
          content={convertValue(valuePlayer1)}
          footer={unit.toUpperCase()}
        />
        <strong>VS</strong>
        <PlayersCard
          title={namePlayer2}
          subtitle={groupName}
          content={convertValue(valuePlayer2)}
          footer={unit.toUpperCase()}
        />
      </Box>
    </>
  );
};

export default Cards;
