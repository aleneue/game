import { useEffect, useState } from "react";
import PlayButton from "./components/Button";
import Cards from "./components/Cards";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [maxNumOfPlayers, setMaxNumOfPlayers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    rerollIfIncompleteData(player1, setPlayer1);
  }, [player1]);

  useEffect(() => {
    rerollIfIncompleteData(player2, setPlayer2);
  }, [player2]);

  useEffect(() => {
    verifyIfDataIsCorrect(player1) &&
      verifyIfDataIsCorrect(player2) &&
      setIsLoading(false);
  }, [player1, player2]);

  const getData = () => {
    fetch(`https://swapi.dev/api/people/`)
      .then((res) => res.json())
      .then((data) => {
        setMaxNumOfPlayers(data.count);
      })
      .catch((err) => console.log("err", err));
  };

  const getPlayerData = (setPlayer, id) => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/people/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { name, mass, detail } = data;
        return setPlayer({
          id,
          name,
          mass: mass?.replace(",", ""),
          detail,
        });
      })
      .catch((error) => console.log("ERROR", error));
  };

  const getRandomIntInclusive = () => {
    const min = Math.ceil(1);
    const max = Math.floor(maxNumOfPlayers + 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const rerollIfIncompleteData = (player, setPlayer) => {
    // IF DATA ARE NOT CORRECT
    // PICK NEW NUMBER AND GET NEW PLAYER
    if (!verifyIfDataIsCorrect(player)) {
      let newID = getRandomIntInclusive();

      while (player?.id === newID) {
        newID = getRandomIntInclusive();
      }
      getPlayerData(setPlayer, newID);
    }
  };

  const verifyIfDataIsCorrect = (player) =>
    player?.mass !== "unknown" && player?.detail !== "Not found";

  const onRerollClick = () => {
    const id1 = getRandomIntInclusive();
    const id2 = getRandomIntInclusive();

    if (id1 === id2) {
      onRerollClick();
    } else {
      getPlayerData(setPlayer1, id1);
      getPlayerData(setPlayer2, id2);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Let's play the GAME!</h1>
      {isLoading && <ClipLoader color="red" loading={isLoading} size={100} />}
      {!isLoading && player1 && player2 && (
        <Cards
          namePlayer1={player1.name}
          valuePlayer1={Number(player1.mass)}
          namePlayer2={player2.name}
          valuePlayer2={Number(player2.mass)}
        />
      )}
      <PlayButton
        text={`Roll players ${player1 && player2 ? "again" : ""}!`}
        onClick={onRerollClick}
      />
    </div>
  );
};

export default App;
