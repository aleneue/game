import { Stack, Button } from "@mui/material";
const Buttons = ({
  onClickPlayBtn,
  onClickClearBtn,
  score,
  textPlayBtn,
  disabledPlayBtn,
}) => {
  return (
    <Stack
      spacing={2}
      direction="column"
      sx={{ height: "150px" }}
      data-testid="gameButtons"
    >
      <Button
        variant="contained"
        onClick={onClickPlayBtn}
        disabled={disabledPlayBtn}
        data-testid="playButton"
      >
        {textPlayBtn}
      </Button>
      {Boolean(score.player1 || score.player2) && (
        <Button
          variant="outlined"
          onClick={onClickClearBtn}
          data-testid="clearButton"
        >
          Clear score
        </Button>
      )}
    </Stack>
  );
};

export default Buttons;
