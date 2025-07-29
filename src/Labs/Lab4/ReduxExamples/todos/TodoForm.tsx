// src/Labs/Lab4/ReduxExamples/todos/TodoForm.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, FormControl } from "react-bootstrap";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  // Retrieve current todo from Redux store
  const todo = useSelector((state: any) => state.todosReducer.todo);

  // Setup dispatch to send actions
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="d-flex align-items-center gap-2">
      <FormControl
        type="text"
        placeholder="Enter todo title"
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="flex-grow-1"
      />
      <Button
        variant="success"
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
      >
        Add
      </Button>
      <Button
        variant="warning"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
        disabled={todo.id === undefined || todo.id === ""}
      >
        Update
      </Button>
    </ListGroup.Item>
  );
}
