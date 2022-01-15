import Box from "@mui/material/Box";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Let's play the GAME!</h1>
      {children}
    </Box>
  );
};

export default Layout;
