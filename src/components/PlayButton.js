import Button from "@mui/material/Button";
const PlayButton = ({ onClick, text }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      {text}
    </Button>
  );
};

export default PlayButton;
