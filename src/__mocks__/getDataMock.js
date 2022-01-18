export const getDataFirstPageMock = {
  count: 82,
  results: Array(10).fill(0),
};

export const getDataLastPageMock = {
  count: 82,
  results: [0, { url: "https://swapi.dev/api/people/83/" }],
};
