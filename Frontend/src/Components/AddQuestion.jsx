import React, { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import api from "../ApiConfig";

const AddQuestion = () => {
  const [quesData, setQuesData] = useState({
    question:"",
      optionA:"",
      optionB:"",
      optionC:"",
      optionD:"",
      answer:"",
  });
  const { state } = useContext(AuthContext);
  const router = useNavigate();

  const handleChange = (event) => {
    setQuesData({ ...quesData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
        quesData.question &&
        quesData.optionA &&
        quesData.optionB &&
        quesData.optionC &&
        quesData.optionD &&
        quesData.answer
    ) {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await api.post("/add-question", 
        {quesData, token});
        if (response.data.success) {
          setQuesData({
            question:"",
            optionA:"",
            optionB:"",
            optionC:"",
            optionD:"",
            answer:"",
          });
          router("/allquestions");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
    } else {
      toast.error("All fields are mandtory.");
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Question :</label>
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="question"
          value={quesData.question}
        />
        <br />
        <label>Enter Option A :</label>
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="optionA"
          value={quesData.optionA}
        />
        <br />
        <label>Enter Option B :</label>
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="optionB"
          value={quesData.optionB}
        />
        <br />
        <label>Enter Option C :</label>
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="optionC"
          value={quesData.optionC}
        />
        <br />
        <label>Enter Option D :</label>
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="optionD"
          value={quesData.optionD}
        />
        <br />
        <label>Enter Answer :</label>
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="answer"
          value={quesData.answer}
        />
        <br />
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestion;