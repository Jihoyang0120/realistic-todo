import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Todo } from "../model";
import { MdDone, MdOutlineTaskAlt } from "react-icons/md";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 20px;
  margin-top: 15px;
  background-color: #eee2dc;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 5px black;
    transform: scale(1.01);
  }
  @media screen and (max-width: 700px) {
    width: 92%;
  }
`;

const SingleTodoText = styled.span`
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

const SingleInputText = styled.input`
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  font-family: "Gowun Batang", serif;
  &:focus {
    outline: none;
  }
`;

const DoneTodoText = styled.span`
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  text-decoration: line-through;
  &:focus {
    outline: none;
  }
`;

const Icon = styled.span`
  margin-left: 10px;
  font-size: 25px;
  cursor: pointer;
`;

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem = ({ index, todo, todos, setTodos }: Props) => {
  const saveTodos = (list:Todo[]) =>  localStorage.setItem("todoList", JSON.stringify(list)) 

  const handleDone = (id: number) => {
    let tempTodos = todos
    tempTodos = tempTodos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
    saveTodos(tempTodos) // 로컬 스토리지에 tempTodos 저장
    setTodos(tempTodos);
  };

  const handleDelete = (id: number) => {
    // 원본 리스트(todos)를 tempTodos로 복사한 뒤 복사한 리스트를 적용.
    let tempTodos = todos.filter((todo) => todo.id !== id)
    saveTodos(tempTodos) // 로컬 스토리지에 tempTodos 저장
    setTodos(tempTodos);
    
  };

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    let tempTodos = todos
    tempTodos = tempTodos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    saveTodos(tempTodos) // 로컬 스토리지에 tempTodos 저장
    setTodos(tempTodos);
    setEdit(false);
  };

  // Edit 아이콘을 클릭하면 -> Edit input란에 자동으로 포커스
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        /*
        1. edit이 true면 <SingleInputText>를 보여준다. 
        2. todo가 isDone이면 <SingleTodoText>에 text-decoration: line-through이 적용되어있는 DoneTodoText로 보여준다.
        */
        <SingleTodo
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <SingleInputText
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <DoneTodoText>{todo.todo}</DoneTodoText>
          ) : (
            <SingleTodoText>{todo.todo}</SingleTodoText>
          )}
          <>
            <Icon>
              {/* 
              1. isDone이 true이거나 edit이 true인 경우에는 클릭을 통해 수정한 내용을 저장할 수 있는 <MdOutlineTaskAlt>을 보여준다. 
              2. 그 외의 경우에는 클릭하여 todo를 수정할 수 있는 <AiTwotoneEdit>를 보여준다.
              */}
              {!edit && !todo.isDone ? (
                <AiTwotoneEdit onClick={() => setEdit(!edit)} />
              ) : (
                <MdOutlineTaskAlt onClick={(e) => handleEdit(e, todo.id)} />
              )}
            </Icon>
            <Icon>
              <MdDone onClick={() => handleDone(todo.id)} />
            </Icon>
            <Icon>
              <AiFillDelete onClick={() => handleDelete(todo.id)} />
            </Icon>
          </>
        </SingleTodo>
      )}
    </Draggable>
  );
};

export default TodoItem;
