import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { state } = useContext(AuthContext);
  const router = useNavigate();

  return (
    <div>
      <h1>Welcome {state?.user?.name}</h1>
      {state?.user?.role == "User" ? (
        <button
          style={{
            width: "200px",
            height: "60px",
            background: "green",
            border: "2px solid green",
            color:"white",
            fontSize:"20px",
            borderRadius:"50px",
            marginTop:"100px",
          }}
        >
          Start Quiz
        </button>
      ) : (
        <button style={{
          width: "200px",
          height: "60px",
          background: "green",
          border: "2px solid green",
          color:"white",
          fontSize:"20px",
          borderRadius:"50px",
          marginTop:"100px",
        }} onClick={() => router('/addquestion')}>Add Questions</button>
      )}
    </div>
  );
};

export default Home;
