import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "./containers/FormContainer";
import Logo from "../assets/logo.svg";
import Swal from "sweetalert2";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "Hasła muszą być identyczne!",
      });
      return false;
    } else if (username.length < 3) {
      Toast.fire({
        icon: "error",
        title: "Nazwa użytkownika powinna zawierać więcej niż 3 znaki!",
      });
      return false;
    } else if (password.length < 8) {
      Toast.fire({
        icon: "error",
        title: "Hasło powinno zawierać więcej niż 8 znaków!",
      });
      return false;
    } else if (email === "") {
      Toast.fire({
        icon: "error",
        title: "Email jest wymagany",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Hasło"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Potwierdź hasło"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Utwórz użytkownika</button>
          <span>
            Posiadasz już konto? <Link to="/login">Zaloguj</Link>{" "}
          </span>
        </form>
      </FormContainer>
    </>
  );
};

export default Register;
