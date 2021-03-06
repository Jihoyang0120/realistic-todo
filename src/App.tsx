import React, { useState, useEffect } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { SwalCheer, SwalBuzyTmr} from "./components/SwalTemplate";

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
  const saveTodos = (list:Todo[]) =>  localStorage.setItem("todoList", JSON.stringify(list)) 

  const savedelayedTodos = (list:Todo[]) =>  localStorage.setItem("delayedTodoList", JSON.stringify(list)) 

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [delayedTodos, setDelayedTodos] = useState<Todo[]>([]); 


  // 로컬 스토리지에 저장되어있는 todoList를 불러와서 적용 
  useEffect(() => {
    let arr = localStorage.getItem("todoList");
    let delayedArr = localStorage.getItem("delayedTodoList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTodos(obj);
    }
    if (delayedArr) {
      let obj = JSON.parse(delayedArr);

      setDelayedTodos(obj);
    }
  }, []);


  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      // 원본 리스트 todos를 tempList로 복사한 뒤 복사한 리스트를 적용
      let tempTodos = todos;
      // id: random, todo: todo text, isDone: set false

      tempTodos.push({ id: Date.now(), todo: todo, isDone: false})

      saveTodos(tempTodos) // 로컬 스토리지에 tempTodos 저장
      setTodos(tempTodos);
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
    let delayed = delayedTodos;
    let startFromToday = 0;

    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
      console.log("오늘 할 일 ->")
      startFromToday =+ 1
    } else {
      add = delayed[source.index];
      delayed.splice(source.index, 1);
      console.log("내일 할 일 ->")
    }

    if (destination.droppableId === "TodoList") {
      add.isDelayed = false
      active.splice(destination.index, 0, add);
      console.log(" -> 오늘 할 일")
    } else {
      delayed.splice(destination.index, 0, add);

      console.log("-> 내일 할 일")
      startFromToday =+ 1
    
    /* 
    1. startFromToday로 옮겨진 todo가 '오늘 할 일'에서 옮겨졌는지 확인.
    2. delayed된 todo가 1개 일시, SwalCheer Fire.
    3. delayed된 todo가 3개 이상이면, SwalBuzyTmr Fire.
    */
      if (startFromToday){
        if (delayed.length === 1) { SwalCheer() }
        if (3 < delayed.length){ 
          SwalBuzyTmr() }
      }
    }


    saveTodos(active) // 로컬스토리지에 Todos 저장
    savedelayedTodos(delayed) // 로컬스토리지에 delayedTodos 저장
    setDelayedTodos(delayed); 
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
