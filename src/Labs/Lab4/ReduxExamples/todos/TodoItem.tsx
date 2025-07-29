// src/Labs/Lab4/ReduxExamples/todos/TodoItem.tsx
import { useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item
      key={todo.id}
      className="d-flex align-items-center justify-content-between"
    >
      <div>{todo.title}</div>
      <div>
        <Button
          variant="danger"
          size="sm"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
          className="me-2"
        >
          Delete
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
        >
          Edit
        </Button>
      </div>
    </ListGroup.Item>
  );
}
