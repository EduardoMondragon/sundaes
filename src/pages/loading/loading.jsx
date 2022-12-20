const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "white",
        color: "teal",
        display: "flex",
        flex: 1,
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <h2>LOADING ...</h2>
    </div>
  );
};

export default Loading;
