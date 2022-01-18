import { render, screen } from "@testing-library/react";
import WhoWon from "../components/WhoWon";

it("renders WhoWon component", () => {
  render(<WhoWon score={{ player1: 0, player2: 0 }} />);
  const score = screen.getByTestId("gameScore");
  expect(score).toBeInTheDocument();
});

it("renders WhoWon component with initial score", () => {
  render(<WhoWon score={{ player1: 0, player2: 0 }} />);
  const score = screen.getByTestId("gameScore");
  expect(score).toBeInTheDocument();
  expect(score).toHaveTextContent("0:0");
});

it("renders WhoWon component with correct score", () => {
  render(<WhoWon score={{ player1: 1, player2: 3 }} />);
  const score = screen.getByTestId("gameScore");
  expect(score).toHaveTextContent("1:3");
});
