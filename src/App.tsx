import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #b1a296;
  font-family: "Gowun Batang", serif;
`;

const Title = styled.span`
  text-transform: uppercase;
  font-size: 40px;
  margin: 30px 0;
  color: white;
  z-index: 1;
  text-align: center;
  @media (max-width: 800px) {
    margin: 15px 0;
    font-size: 35px;
  }
`;

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [delayedTodos, setDelayedTodos] = useState<Todo[]>([]);
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      // id: random, todo: todo text, isDone: set false
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add;
    let active = todos;
    let complete = delayedTodos;

    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setDelayedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AppContainer>
        <Title>오늘의 할 일</Title>
        <InputField todo={todo} setTodo={setTodo} handleCreate={handleCreate} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          delayedTodos={delayedTodos}
          setDelayedTodos={setDelayedTodos}
        />
      </AppContainer>
    </DragDropContext>
  );
};

export default App;