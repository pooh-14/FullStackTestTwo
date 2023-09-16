import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../ApiConfig";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const { state, dispatch } = useContext(AuthContext);
  const router = useNavigate();

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.email && userData.password) {
      const response = await api.post("/login", { userData });
      if (response.data.success) {
        dispatch({
          type: "LOGIN",
          payload: response.data.user,
        });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setUserData({ email: "", password: "" });
        router("/");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("All fields are mandtory.");
    }
  };

  useEffect(() => {
    if (state?.user?.name) {
      router("/");
    }
  }, [state]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Email :</label>
        <br />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={userData.email}
        />
        <br />
        <label>Enter Password :</label>
        <br />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={userData.password}
        />
        <br />
        <button type="submit">Login</button>
        <p onClick={() => router("/register")}>New User? Register</p>
      </form>
    </div>
  );
};

export default Login;
