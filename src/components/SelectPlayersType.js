import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectPlayersType = ({ description, type, handleChange }) => {
  return (
    <Box
      sx={{ minWidth: 150 }}
      style={{ color: "black" }}
      data-testid="gameSelect"
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{description}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label={description}
          onChange={handleChange}
        >
          <MenuItem value="people">People</MenuItem>
          <MenuItem value="starships">Starships</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectPlayersType;
