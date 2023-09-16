import QuestionModel from "../Models/Question.Model.js";
import jwt from "jsonwebtoken";

export const addQuestion = async (req, res) => {
  try {
    const { question, optionA, optionB, optionC, optionD, answer } =
      req.body.quesData;
      const {token}= req.body

    if (
      !question ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !answer ||
      !token
    ) {
      return res.json({ success:false, message: "Please fill all the fields" });
    }

    const decoededData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoededData) {
      return res.json({ success: false, message: "Not a Valid Token!" });
    }

    const userId = decoededData?.userId;

    const quiz = new QuestionModel({
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      userId: userId,
    });

    await quiz.save();

    return res.json({ success: true, message: "Question added Successfully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const allQuestions = async (req, res) => {
  try {
    const ques = await QuestionModel.find({});

    if (ques.length) {
      return res.json({ success: true, ques: ques });
    }
    return res.json({ success: false, message: "No Questions found!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getYourQuestions = async (req, res) => {
  try {
      const { token } = req.body;

      const decodedData = jwt.verify(token, process.env.JWT_SECRET)

      if (!decodedData) {
          return response.json({ success: false, message: "Token not valid." })
      }

      const userId = decodedData.userId;

      const yourQuestions = await QuestionModel.find({ userId: userId })

      if (yourQuestions?.length) {
          return res.json({ success: true, questions: yourQuestions })
      }

      return res.json({ success: false, message: "No Questions found." })

  } catch (error) {
      return res.json({ success: false, error: error.message })
  }
}
