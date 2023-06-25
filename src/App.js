import "./styles.css";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        task: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          placeholder="Enter a task"
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.task}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
