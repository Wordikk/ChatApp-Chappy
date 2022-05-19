import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "./containers/FormContainer";
import Logo from "../assets/logo.svg";
import Swal from "sweetalert2";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      Toast.fire({
        icon: "error",
        title: "Nazwa użytkownika i hasło są wymagane!",
      });
      return false;
    } else if (username.length === "") {
      Toast.fire({
        icon: "error",
        title: "Nazwa użytkownika i hasło są wymagane!",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        Toast.fire({ icon: "error", title: data.msg });
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>chappy</h1>
          </div>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Hasło"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Zaloguj</button>
          <span>
            Nie posiadasz konta? <Link to="/register">Zarejestruj się</Link>{" "}
          </span>
        </form>
      </FormContainer>
    </>
  );
};

export default Login;
