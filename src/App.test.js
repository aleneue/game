import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders App component", () => {
  render(<App />);
  const header = screen.getByTestId("gameHeader");
  expect(header).toBeInTheDocument();
});
