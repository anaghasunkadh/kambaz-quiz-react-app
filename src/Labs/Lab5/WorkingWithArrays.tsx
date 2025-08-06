import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API = `${REMOTE_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  return (
    <div>
      <h2>Working With Arrays</h2>

      {/* Retrieve all todos */}
      <h3>Retrieving Arrays</h3>
      <a className="btn btn-primary" href={API}>
        Get All Todos
      </a>
      <hr />

      {/* Filter todos by completed */}
      <h3>Filtering Array Items</h3>
      <a id="wd-retrieve-completed-todos" className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <hr />

      {/* Create new todo */}
      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      {/* Delete todo by id */}
      <h3>Deleting from an Array</h3>
      <a id="wd-delete-todo" className="btn btn-danger float-end" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      {/* Update title */}
      <h3>Updating an Item in an Array</h3>
      <a
        href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
        className="btn btn-success float-end"
      >
        Update Title
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        defaultValue={todo.title}
        className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />

      {/* Update description */}
      <h3>Update Description</h3>
      <FormControl
        value={todo.description}
        placeholder="Edit Description"
        className="w-50 mb-2"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <FormControl
        value={todo.id}
        placeholder="Todo ID"
        className="w-25 mb-2 me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a
        href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}
        className="btn btn-primary"
      >
        Update Description
      </a>
      <hr />

      {/* Update completed */}
      <h3>Update Completed</h3>
      <FormCheck
        type="checkbox"
        id="completed-checkbox"
        label="Completed"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        className="mb-2"
      />
      <FormControl
        value={todo.id}
        placeholder="Todo ID"
        className="w-25 mb-2 me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-primary">
        Update Completed
      </a>
    </div>
  );
}
