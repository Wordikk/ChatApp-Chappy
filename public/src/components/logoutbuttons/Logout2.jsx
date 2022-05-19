import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout2 = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      Wyloguj
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight:bold;
  width:100%;
  margin-top:0.4rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
  &:hover{
    background-color: #997af0;
  }
`;

export default Logout2;
