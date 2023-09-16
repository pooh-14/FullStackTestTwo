import React, { useEffect, useState } from "react";
import api from "../ApiConfig";

const YourQuestions = () => {
  const [allQuestions, setAllQuestions] = useState();

  useEffect(() => {
    async function getQuestions() {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await api.post("get-your-questions", { token });
      if (response.data.success) {
        setAllQuestions(response.data.questions);
      }
    }
    getQuestions();
  },[]);
  return (
    <div>
      <div>Your Questions</div>
      {allQuestions?.length ? (
        <div
          style={{
            width: "90%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {allQuestions.map((quiz) => (
            <div
              style={{
                border: "2px solid grey",
                width: "230px",
                height: "400px",
                marginBottom: "25px",
              }}
              key={quiz._id}
            >
              <h3>{quiz.question}</h3>
              <h3> {quiz.optionA}</h3>
              <h3>{quiz.optionB}</h3>
              <h3>{quiz.optionC}</h3>
              <h3>{quiz.optionD}</h3>
              <h3 style={{color:"green"}}>{quiz.answer}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>No Questions found!</div>
      )}
    </div>
  );
};

export default YourQuestions;
