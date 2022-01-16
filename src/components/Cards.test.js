import { render, screen } from "@testing-library/react";
import Cards from "./Cards";

it("renders Cards component", () => {
  render(
    <Cards
      player1={{ id: 2, name: "xyz", value: "10", detail: undefined }}
      player2={{ id: 10, name: "abc", value: "50", detail: undefined }}
      unit="mess"
      result="abc"
      tie={{ bgColor: "yellow", text: "IT'S A TIE" }}
      winner={{ bgColor: "lightgreen", text: " WINS!" }}
    />
  );
  const cards = screen.getByTestId("gameCards");
  expect(cards).toBeInTheDocument();
});

it("renders Cards component and display winner correctly", () => {
  const winner = { bgColor: "lightgreen", text: " WINS!" };
  render(
    <Cards
      player1={{ id: 2, name: "xyz", value: "10", detail: undefined }}
      player2={{ id: 10, name: "abc", value: "50", detail: undefined }}
      unit="mess"
      result="abc"
      tie={{ bgColor: "yellow", text: "IT'S A TIE!" }}
      winner={winner}
    />
  );
  const result = screen.getByTestId("result");
  expect(result).toHaveTextContent("abc WINS!");
  expect(result).toHaveStyle(`background: ${winner.bgColor}`);
});

it("renders Cards component and display tie correctly", () => {
  const tie = { bgColor: "yellow", text: "IT'S A TIE!" };
  render(
    <Cards
      player1={{ id: 2, name: "xyz", value: "50", detail: undefined }}
      player2={{ id: 10, name: "abc", value: "50", detail: undefined }}
      unit="mess"
      result="IT'S A TIE!"
      tie={tie}
      winner={{ bgColor: "lightgreen", text: " WINS!" }}
    />
  );
  const result = screen.getByTestId("result");
  expect(result).toHaveTextContent(tie.text);
  expect(result).toHaveStyle(`background: ${tie.bgColor}`);
});
