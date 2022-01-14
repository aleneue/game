const Card = ({ title, subtitle }) => {
  return (
    <div
      style={{
        backgroundColor: "lightskyblue",
        width: "250px",
        height: "300px",
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
};

export default Card;
