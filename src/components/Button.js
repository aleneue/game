const PlayButton = ({ onClick, text }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        backgroundColor: "lightgreen",
        padding: "5px 25px",
        borderRadius: "25px",
      }}
    >
      <h3>{text}</h3>
    </div>
  );
};

export default PlayButton;
