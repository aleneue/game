import { Stack, Button } from "@mui/material";
const Buttons = ({
  onClickPlayBtn,
  onClickClearBtn,
  score,
  textPlayBtn,
  disabledPlayBtn,
}) => {
  return (
    <Stack spacing={2} direction="column" sx={{ height: "150px" }}>
      <Button
        variant="contained"
        onClick={onClickPlayBtn}
        disabled={disabledPlayBtn}
      >
        {textPlayBtn}
      </Button>
      {Boolean(score.player1 || score.player2) && (
        <Button variant="outlined" onClick={onClickClearBtn}>
          Clear score
        </Button>
      )}
    </Stack>
  );
};

export default Buttons;
