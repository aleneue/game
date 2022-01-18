import { render, screen } from "@testing-library/react";
import PlayersCard from "../components/PlayersCard";

it("renders PlayersCard component", () => {
  render(<PlayersCard winner={{ bgColor: "lightgreen", text: " WINS!" }} />);
  const card = screen.getByTestId("gamePlayersCard");
  expect(card).toBeInTheDocument();
});

it("renders data inside of PlayersCard component correctly", () => {
  render(
    <PlayersCard
      name="xyz"
      group="Starships"
      value="10"
      unit="CREW"
      winner={{ bgColor: "lightgreen", text: " WINS!" }}
    />
  );
  const playersNameAndGroup = screen.getByTestId("playersNameAndGroup");
  expect(playersNameAndGroup).toHaveTextContent("xyz");
  expect(playersNameAndGroup).toHaveTextContent("Starships");

  const playersValue = screen.getByTestId("playersValue");
  expect(playersValue).toHaveTextContent("10");

  const playersUnit = screen.getByTestId("playersUnit");
  expect(playersUnit).toHaveTextContent("CREW");
});
