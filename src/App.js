import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import SelectPlayersType from "./components/SelectPlayersType";
import Layout from "./components/Layout";
import WhoWon from "./components/WhoWon";
import Buttons from "./components/Buttons";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [playersMaxId, setPlayersMaxId] = useState(null);
  const [isPlayer1Loading, setIsPlayer1Loading] = useState(false);
  const [isPlayer2Loading, setIsPlayer2Loading] = useState(false);
  const [playersType, setPlayersType] = useState("");
  const [unit, setUnit] = useState("");
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [result, setResult] = useState("");

  const isLoading = isPlayer1Loading || isPlayer2Loading;

  useEffect(() => {
    playersType && getData();
  }, [playersType]);

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

  const getPlayerData = (setPlayer, id, setLoading) => {
    setLoading(true);
    fetch(`https://swapi.dev/api/${playersType}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { name, detail } = data;
        const player = {
          id,
          name,
          value:
            playersType === "people"
              ? data.mass?.replace(",", "")
              : data.crew?.replace(",", "").split("-"),
          detail,
        };
        if (!rerollIfIncompleteData(player, setPlayer, setLoading)) {
          setPlayer(player);
          setLoading(false);
        }
      })
      .catch((error) => console.log("ERROR", error));
  };

  const getRandomIntInclusive = () => {
    const min = Math.ceil(1);
    const max = Math.floor(playersMaxId);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const rerollIfIncompleteData = (player, setPlayer, setLoading) => {
    // IF DATA ARE NOT CORRECT
    // PICK NEW NUMBER AND GET NEW PLAYER
    if (!verifyIfDataIsCorrect(player)) {
      let newID = getRandomIntInclusive();

      while (player.id === newID) {
        newID = getRandomIntInclusive();
      }
      getPlayerData(setPlayer, newID, setLoading);
      return true;
    }
    return false;
  };

  const verifyIfDataIsCorrect = (player) =>
    !(
      player.detail === "Not found" ||
      player.value === undefined ||
      (Array.isArray(player.value) && player.value[0] === "unknown") ||
      player.value === "unknown"
    );

  const onRerollClick = () => {
    const id1 = getRandomIntInclusive();
    const id2 = getRandomIntInclusive();

    setUnit(playersType === "people" ? "mess" : "crew");
    getPlayerData(setPlayer1, id1, setIsPlayer1Loading);
    getPlayerData(setPlayer2, id2, setIsPlayer2Loading);
  };

  const handleSelectChange = (event) => {
    setPlayersType(event.target.value);
  };

  console.log("1", result);
  console.log("2", !isLoading);
  console.log("3", Boolean(result && !isLoading));
  return (
    <Layout>
      <SelectPlayersType
        description="Pick the group"
        type={playersType}
        handleChange={handleSelectChange}
      />
      <WhoWon
        player1={player1}
        player2={player2}
        unit={unit}
        score={score}
        setScore={setScore}
        verifyIfDataIsCorrect={verifyIfDataIsCorrect}
        result={result}
        setResult={setResult}
        isLoading={isLoading}
      />
      {isLoading && (
        <div
          style={{
            height: "400px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ClipLoader color="red" loading={isLoading} size={100} />
        </div>
      )}
      {!isLoading && player1 && player2 && (
        <Cards
          player1={player1}
          player2={player2}
          unit={unit}
          result={result}
        />
      )}
      <Buttons
        textPlayBtn={`Roll players ${player1 && player2 ? "again" : ""}!`}
        onClickPlayBtn={onRerollClick}
        disabledPlayBtn={!playersType}
        score={score}
        onClickClearBtn={() => setScore({ player1: 0, player2: 0 })}
      />
    </Layout>
  );
};

export default App;
