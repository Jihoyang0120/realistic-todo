import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Todo } from "../model";
import TodoItem from "./TodoItem";

const Todos = styled.div`
  display: flex;
  width: 47.5%;
  flex-direction: column;
  padding: 15px;
  border-radius: 5px;
  background-color: #123c69;
  @media screen and (max-width: 700px) {
    width: 95%;
    margin-bottom: 10px;
  } ;
`;
const Container = styled.div`
  display: flex;
  width: 95%;
  margin-top: 10px;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: 700px) {
    justify-content: center;
    width: 95%;
    flex-direction: column;
  }
`;

const TodosHeading = styled.span`
  font-size: 30px;
  color: #eee2dc;
`;
const NonActiveTodos = styled.div`
  display: flex;
  width: 47.5%;
  flex-direction: column;
  padding: 15px;
  border-radius: 5px;
  background-color: #993355;
  @media screen and (max-width: 700px) {
    width: 95%;
    margin-bottom: 10px;
  } ;
`;

// TodoList Props interface
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  delayedTodos: Todo[];
  setDelayedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  setTodos,
  delayedTodos,
  setDelayedTodos,
}: Props) => {
  return (
    <Container>
      <Droppable droppableId="TodoList">
        {(provided) => (
          <Todos ref={provided.innerRef} {...provided.droppableProps}>
            <TodosHeading>오늘 할 일</TodosHeading>
            {todos.map((todo, index) => (
              <TodoItem
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                
              />
            ))}
            {provided.placeholder}
          </Todos>
        )}
      </Droppable>
      <Droppable droppableId="NonActiveTodoList">
        {(provided) => (
          <NonActiveTodos ref={provided.innerRef} {...provided.droppableProps}>
            <TodosHeading>내일 할 일</TodosHeading>
            {delayedTodos.map((todo, index) => (
              <TodoItem
                index={index}
                todo={todo}
                key={todo.id}
                todos={delayedTodos}
                setTodos={setDelayedTodos}
              />
            ))}
            {provided.placeholder}
          </NonActiveTodos>
        )}
      </Droppable>
    </Container>
  );
};

export default TodoList;
