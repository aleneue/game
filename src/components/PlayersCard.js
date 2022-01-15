import { Card, CardHeader, CardContent, Box, Typography } from "@mui/material";

const PlayersCard = ({ title, subtitle, content, footer }) => {
  return (
    <Card sx={{ width: 250, height: 300 }}>
      <CardHeader
        title={title}
        subheader={subtitle}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{
          align: "center",
        }}
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
          <Typography component="h2" variant="h3" color="text.primary">
            {content}
          </Typography>
          <Typography variant="h6" color="text.secondary" mt={4}>
            {footer}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlayersCard;
