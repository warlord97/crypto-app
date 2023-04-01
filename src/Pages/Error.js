import React from "react";

function Error({ message }) {
  return <div style={{
    width: "70%",
    backgroundColor: "#f28482",
    color: "white",
    fontSize: "1.2rem",
    padding: "10px 20px",
    marginBlock: "10px",
    textAlign: "center",
    position: "fixed",
    bottom: "0",
    left: "15%",
    borderRadius: "5px"
  }}>
    <p>{message}</p>
  </div>;
}

export default Error;
