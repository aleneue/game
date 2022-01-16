import { render, screen } from "@testing-library/react";
import SelectPlayersType from "./SelectPlayersType";

it("renders SelectPlayersType component", () => {
  render(<SelectPlayersType type="" />);
  const select = screen.getByTestId("gameSelect");
  expect(select).toBeInTheDocument();
});

it("renders SelectPlayersType component with a placeholder", () => {
  render(<SelectPlayersType description="Pick the group" type="" />);
  const select = screen.getByTestId("gameSelect");
  expect(select).toHaveTextContent("Pick the group");
});

it("renders SelectPlayersType component with a type prop", () => {
  render(<SelectPlayersType type="people" />);
  const select = screen.getByTestId("gameSelect");
  expect(select).toHaveTextContent("People");
});
