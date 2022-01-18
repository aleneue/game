import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import {
  getDataFirstPageMock,
  getDataLastPageMock,
} from "../__mocks__/getDataMock";
import {
  peopleWinnerPlayer1,
  peopleLoserPlayer2,
  peopleTiePlayer1,
  peopleTiePlayer2,
  starshipsLoserPlayer1,
  starshipsWinnerPlayer2,
  starshipsTiePlayer1,
  starshipsTiePlayer2,
  starshipsLoserValuePlayer1,
  starshipsWinnerRangePlayer2,
  starshipsLoserRangePlayer1,
  starshipsWinnerValuePlayer2,
  starshipsTieRangePlayer1,
  starshipsTieRangePlayer2,
} from "../__mocks__/getPlayersMock";

afterEach(() => {
  jest.restoreAllMocks();
});

it("renders App component", () => {
  render(<App />);
  const header = screen.getByTestId("gameHeader");
  expect(header).toBeInTheDocument();
});

it("rolls players and displays result of the game (people + winner)", async () => {
  render(<App />);
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest
      .fn()
      .mockResolvedValueOnce(getDataFirstPageMock)
      .mockResolvedValueOnce(getDataLastPageMock)
      .mockResolvedValueOnce(peopleWinnerPlayer1)
      .mockResolvedValueOnce(peopleLoserPlayer2),
  });

  const playButton = screen.getByTestId("playButton");
  expect(playButton).toHaveAttribute("disabled");

  // click on Select Group
  fireEvent.mouseDown(screen.getAllByRole("button")[0]);
  // options on the screen
  expect(screen.getByText("People")).toBeInTheDocument();
  expect(screen.getByText("Starships")).toBeInTheDocument();
  // pick option
  fireEvent.click(screen.getByText("People"));
  expect(await waitFor(() => playButton)).not.toHaveAttribute("disabled");

  fireEvent.click(playButton);

  expect(await screen.findByTestId("gameCards")).toBeInTheDocument();
  expect(screen.getByText("Biggs Darklighter WINS!")).toBeInTheDocument();
});

it("rolls players and displays result of the game (people + tie)", async () => {
  render(<App />);

  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest
      .fn()
      .mockResolvedValueOnce(getDataFirstPageMock)
      .mockResolvedValueOnce(getDataLastPageMock)
      .mockResolvedValueOnce(peopleTiePlayer1)
      .mockResolvedValueOnce(peopleTiePlayer2),
  });

  const playButton = screen.getByTestId("playButton");
  // click on Select Group
  fireEvent.mouseDown(screen.getAllByRole("button")[0]);
  // pick option
  fireEvent.click(screen.getByText("People"));
  expect(await waitFor(() => playButton)).not.toHaveAttribute("disabled");
  fireEvent.click(playButton);
  expect(await screen.findByTestId("gameCards")).toBeInTheDocument();
  expect(screen.getByText("IT'S A TIE!")).toBeInTheDocument();
});

it("rolls players and displays result of the game (starships + winner)", async () => {
  render(<App />);

  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest
      .fn()
      .mockResolvedValueOnce(getDataFirstPageMock)
      .mockResolvedValueOnce(getDataLastPageMock)
      .mockResolvedValueOnce(starshipsLoserPlayer1)
      .mockResolvedValueOnce(starshipsWinnerPlayer2),
  });

  const playButton = screen.getByTestId("playButton");
  // click on Select Group
  fireEvent.mouseDown(screen.getAllByRole("button")[0]);
  // pick option
  fireEvent.click(screen.getByText("Starships"));
  expect(await waitFor(() => playButton)).not.toHaveAttribute("disabled");
  fireEvent.click(playButton);
  expect(await screen.findByTestId("gameCards")).toBeInTheDocument();
  expect(screen.getByText("Death Star WINS!")).toBeInTheDocument();
  //displays number correctly
  expect(screen.getByText("47060")).toBeInTheDocument();
});

it("rolls players and displays result of the game (starships + tie)", async () => {
  render(<App />);

  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest
      .fn()
      .mockResolvedValueOnce(getDataFirstPageMock)
      .mockResolvedValueOnce(getDataLastPageMock)
      .mockResolvedValueOnce(starshipsTiePlayer1)
      .mockResolvedValueOnce(starshipsTiePlayer2),
  });

  const playButton = screen.getByTestId("playButton");
  // click on Select Group
  fireEvent.mouseDown(screen.getAllByRole("button")[0]);
  // pick option
  fireEvent.click(screen.getByText("Starships"));
  expect(await waitFor(() => playButton)).not.toHaveAttribute("disabled");
  fireEvent.click(playButton);
  expect(await screen.findByTestId("gameCards")).toBeInTheDocument();
  expect(screen.getByText("IT'S A TIE!")).toBeInTheDocument();
});

it("rolls players and displays result of the game (starships + winner + range)", async () => {
  render(<App />);

  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest
      .fn()
      .mockResolvedValueOnce(getDataFirstPageMock)
      .mockResolvedValueOnce(getDataLastPageMock)
      .mockResolvedValueOnce(starshipsLoserValuePlayer1)
      .mockResolvedValueOnce(starshipsWinnerRangePlayer2),
  });

  const playButton = screen.getByTestId("playButton");
  // click on Select Group
  fireEvent.mouseDown(screen.getAllByRole("button")[0]);
  // pick option
  fireEvent.click(screen.getByText("Starships"));
  expect(await waitFor(() => playButton)).not.toHaveAttribute("disabled");
  fireEvent.click(playButton);
  expect(await screen.findByTestId("gameCards")).toBeInTheDocument();
  expect(screen.getByText("CR90 corvette WINS!")).toBeInTheDocument();
  //displays range correctly
  expect(screen.getByText("30-165")).toBeInTheDocument();
});

it("rolls players and displays result of the game (starships + loser + range)", async () => {
  render(<App />);

  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest
      .fn()
      .mockResolvedValueOnce(getDataFirstPageMock)
      .mockResolvedValueOnce(getDataLastPageMock)
      .mockResolvedValueOnce(starshipsLoserRangePlayer1)
      .mockResolvedValueOnce(starshipsWinnerValuePlayer2),
  });

  const playButton = screen.getByTestId("playButton");
  // click on Select Group
  fireEvent.mouseDown(screen.getAllByRole("button")[0]);
  // pick option
  fireEvent.click(screen.getByText("Starships"));
  expect(await waitFor(() => playButton)).not.toHaveAttribute("disabled");
  fireEvent.click(playButton);
  expect(await screen.findByTestId("gameCards")).toBeInTheDocument();
  expect(screen.getByText("Death Star WINS!")).toBeInTheDocument();
});

it("rolls players and displays result of the game (starships + tie + range)", async () => {
  render(<App />);

  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest
      .fn()
      .mockResolvedValueOnce(getDataFirstPageMock)
      .mockResolvedValueOnce(getDataLastPageMock)
      .mockResolvedValueOnce(starshipsTieRangePlayer1)
      .mockResolvedValueOnce(starshipsTieRangePlayer2),
  });

  const playButton = screen.getByTestId("playButton");
  // click on Select Group
  fireEvent.mouseDown(screen.getAllByRole("button")[0]);
  // pick option
  fireEvent.click(screen.getByText("Starships"));
  expect(await waitFor(() => playButton)).not.toHaveAttribute("disabled");
  fireEvent.click(playButton);
  expect(await screen.findByTestId("gameCards")).toBeInTheDocument();
  expect(screen.getByText("IT'S A TIE!")).toBeInTheDocument();
});
