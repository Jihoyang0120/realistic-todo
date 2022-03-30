import React, { useRef } from "react";
import styled from "styled-components";
import { AiOutlineCarryOut } from "react-icons/ai";

const Input = styled.form`
  display: flex;
  width: 90%;
  position: relative;
  align-items: center;
  @media screen and (max-width: 700px) {
    justify-content: center;
    width: 95%;
  } ;
`;
const InputBox = styled.input`
    width: 100%;
    border-radius: 50px;
    padding: 20px 30px;
    font-family: 'Gowun Batang', serif;
    font-size: 23px;
    font-weight: bold;
    border: none;
    transition: 0.4s
    box-shadow: inset 0 0 5px gray;
    &:focus {
        box-shadow: 0 0 10px 1000px #cebcb4;
        opacity: 80%;
        outline: none;
        transition: 0.4s
    }
`;
const InputSubmit = styled.button`
  position: absolute;
  width: 60px;
  height: 50px;
  margin: 10px;
  border-radius: 50px;
  right: 0px;
  border: none;
  font-size: 30px;
  font-weight: 900;
  background-color: #edc7b7;
  color: #114555;
  transition: 0.2 all;
  box-shadow: 0 0 4px black;
  cursor: pointer;

  &:hover {
    background-color: #eee2dc;
    transition: 0.5s;
    transform: scale(1.07);
    box-shadow: 0 0 15px black;
    color: #1e728b;
  }
  &:active {
    transform: scale(0.8);
    box-shadow: 0 0 5px black;
    transition: 0.5s;

    @media screen and (max-width: 700px) {
      font-size: 90px;
  } ;
  }
`;

// InputField Props interface
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleCreate: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleCreate }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    // Create task -> ease focus
    <Input
        onSubmit={(e) => {
        handleCreate(e);
        inputRef.current?.blur();
      }}
    >
      <InputBox
        type="input"
        placeholder="Enter a task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        ref={inputRef}
      />
      <InputSubmit type="submit">
        <AiOutlineCarryOut />
      </InputSubmit>
    </Input>
  );
};

export default InputField;
