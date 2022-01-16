import { render, screen } from "@testing-library/react";
import Buttons from "./Buttons";

it("renders only PlayButton from Buttons component with initial score", () => {
  render(<Buttons score={{ player1: 0, player2: 0 }} />);
  const buttons = screen.getByTestId("gameButtons");
  const playButton = screen.getByTestId("playButton");
  const clearButton = screen.queryByTestId("clearButton");
  expect(buttons).toBeInTheDocument();
  expect(playButton).toBeInTheDocument();
  expect(clearButton).not.toBeInTheDocument();
});

it("renders all Buttons when score is not 0:0", () => {
  render(<Buttons score={{ player1: 0, player2: 1 }} />);
  const buttons = screen.getByTestId("gameButtons");
  const playButton = screen.getByTestId("playButton");
  const clearButton = screen.getByTestId("clearButton");
  expect(buttons).toBeInTheDocument();
  expect(playButton).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
});
