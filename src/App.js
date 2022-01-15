import { useEffect, useState } from "react";
import PlayButton from "./components/PlayButton";
import Cards from "./components/Cards";
import ClipLoader from "react-spinners/ClipLoader";
import SelectPlayersType from "./components/SelectPlayersType";
import Layout from "./components/Layout";

const App = () => {
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [playersMaxId, setPlayersMaxId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playersType, setPlayersType] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    playersType && getData();
  }, [playersType]);

  useEffect(() => {
    player1 && rerollIfIncompleteData(player1, setPlayer1);
  }, [player1]);

  useEffect(() => {
    player2 && rerollIfIncompleteData(player2, setPlayer2);
  }, [player2]);

  useEffect(() => {
    player1 &&
      player2 &&
      verifyIfDataIsCorrect(player1) &&
      verifyIfDataIsCorrect(player2) &&
      setIsLoading(false);
  }, [player1, player2]);

  const getData = () => {
    fetch(`https://swapi.dev/api/${playersType}/`)
      .then((res) => res.json())
      .then((data) => {
        const numOfPlayers = data.count;
        const numOfResultsInPage = data.results.length;
        const numOfPages = Math.ceil(numOfPlayers / numOfResultsInPage);
        fetch(`https://swapi.dev/api/${playersType}/?page=${numOfPages}`)
          .then((res) => res.json())
          .then((data) => {
            const resultsLength = data.results.length;
            const lastResult = data.results[resultsLength - 1];
            let findMaxId = lastResult.url
              .replace(`https://swapi.dev/api/${playersType}/`, "")
              .replace("/", "");
            setPlayersMaxId(Number(findMaxId));
          })
          .catch((err) => console.log("err", err));
      });
  };

  const getPlayerData = (setPlayer, id) => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/${playersType}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { name, detail } = data;
        return setPlayer({
          id,
          name,
          value:
            playersType === "people"
              ? data.mass?.replace(",", "")
              : data.crew?.replace(",", "").split("-"),
          detail,
        });
      })
      .catch((error) => console.log("ERROR", error));
  };

  const getRandomIntInclusive = () => {
    const min = Math.ceil(1);
    const max = Math.floor(playersMaxId);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const rerollIfIncompleteData = (player, setPlayer) => {
    // IF DATA ARE NOT CORRECT
    // PICK NEW NUMBER AND GET NEW PLAYER
    if (!verifyIfDataIsCorrect(player)) {
      let newID = getRandomIntInclusive();

      while (player.id === newID) {
        newID = getRandomIntInclusive();
      }
      getPlayerData(setPlayer, newID);
    }
  };

  const verifyIfDataIsCorrect = (player) => {
    if (player.detail === "Not found") {
      return false;
    } else if (player.value === undefined) {
      return false;
    } else if (Array.isArray(player.value) && player.value[0] === "unknown") {
      return false;
    } else if (player.value === "unknown") {
      return false;
    } else {
      return true;
    }
  };

  const onRerollClick = () => {
    const id1 = getRandomIntInclusive();
    const id2 = getRandomIntInclusive();

    setUnit(playersType === "people" ? "mess" : "crew");
    getPlayerData(setPlayer1, id1);
    getPlayerData(setPlayer2, id2);
  };

  const handleSelectChange = (event) => {
    setPlayersType(event.target.value);
  };

  return (
    <Layout>
      <SelectPlayersType
        description="Pick the group"
        type={playersType}
        handleChange={handleSelectChange}
      />
      {isLoading && <ClipLoader color="red" loading={isLoading} size={100} />}
      {!isLoading && player1 && player2 && (
        <Cards
          namePlayer1={player1.name}
          valuePlayer1={player1.value}
          namePlayer2={player2.name}
          valuePlayer2={player2.value}
          unit={unit}
        />
      )}
      <PlayButton
        text={`Roll players ${player1 && player2 ? "again" : ""}!`}
        onClick={onRerollClick}
      />
    </Layout>
  );
};

export default App;
