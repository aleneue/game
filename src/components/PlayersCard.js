import { Card, CardHeader, CardContent, Box, Typography } from "@mui/material";

const PlayersCard = ({ name, group, value, unit, result, winner }) => {
  return (
    <Card
      sx={{
        width: 250,
        height: 300,
        backgroundColor: name === result ? winner.bgColor : "white",
      }}
      data-testid="gamePlayersCard"
    >
      <CardHeader
        title={name}
        subheader={group}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{
          align: "center",
        }}
        data-testid="playersNameAndGroup"
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography
            component="h2"
            variant="h3"
            color="text.primary"
            data-testid="playersValue"
          >
            {value}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            mt={4}
            data-testid="playersUnit"
          >
            {unit}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlayersCard;
