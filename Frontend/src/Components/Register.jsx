import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import api from "../ApiConfig";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });
  const { state } = useContext(AuthContext);
  const router = useNavigate();

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const selectRole = (event) => {
    setUserData({ ...userData, role: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      userData.name &&
      userData.email &&
      userData.password &&
      userData.confirmPassword &&
      userData.role
    ) {
      if (userData.password === userData.confirmPassword) {
        try {
          const response = await api.post("/register", { userData });
          if (response.data.success) {
            setUserData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              role: "User",
            });
            router("/login");
            toast.success(response.data.message);
          }
        } catch (error) {
          console.log(error, "error");
        }
        // } else {
        //   toast.error(response.data.message);
      } else {
        toast.error("Password and Confirm Password not Matched.");
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
        <label>Select Role :</label>
        <br />
        <select onChange={selectRole}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <br />
        <label>Enter Name :</label>
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={userData.name}
        />
        <br />
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
        <label>Confirm Password :</label>
        <br />
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
        />
        <br />
        <button type="submit">Register</button>
        <p onClick={() => router("/login")}>Already have an account? Login</p>
      </form>
    </div>
  );
};

export default Register;
