import UserModel from "../Models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body.userData;

    if (!name || !email || !password || !role)
      return res.json({ success: false, message: "All feilds are Mandatory!" });

    const isEmailExists = await UserModel.find({ email: email });

    if (isEmailExists.length)
      return res.json({ success: false, message: "Email already exists!" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashPassword,
      role,
    });

    await user.save();

    return res.json({ success: true, message: "Registration Successfull!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;

    if (!email || !password)
      return res.json({ success: false, message: "All feilds are Mandatory!" });

    const user = await UserModel.findOne({ email: email });

    if (!user) return res.json({ success: false, message: "User not found!" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const newObject = {
        name: user.name,
        email: user.email,
        userId: user._id,
      };

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return res.json({
        success: true,
        message: "Login Successfull!",
        user: newObject,
        token,
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decoededData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoededData) {
      return res.json({ success: false, message: "Not a Valid Token!" });
    }

    const userId = decoededData?.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return resjson({ success: false, message: "User not found.." });
    }

    const userObject = {
      name: user?.name,
      email: user?.email,
      _id: user?._id,
    };

    return res.json({ success: true, user: userObject });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
