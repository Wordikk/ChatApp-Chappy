import React from "react";
import WelcomeContainer from "../pages/containers/WelcomeContainer";
import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
  return (
    <>
      <WelcomeContainer>
        <img src={Robot} alt="Robot" />
      <h1>Witaj, <span>{currentUser.username}</span></h1>
      <h3>Wybierz chat aby rozpocząć konwersację.</h3>
      </WelcomeContainer>
    </>
  );
}
