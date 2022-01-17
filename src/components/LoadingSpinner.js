import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = ({ isLoading }) => {
  return (
    <div
      style={{
        height: "400px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ClipLoader color="red" loading={isLoading} size={100} />
    </div>
  );
};

export default LoadingSpinner;
