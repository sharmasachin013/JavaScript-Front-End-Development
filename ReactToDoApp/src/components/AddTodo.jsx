import React, { useState } from "react";

function AddTodo(props) {
  const todos = props.todos;
  const setTodos = props.setTodos;
  const [newTodo, setNewTodo] = useState("");

  // Add New todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      localStorage.setItem("todosonline", JSON.stringify(todos));
      setNewTodo("");
      console.log(todos);
    }
  };

  return (
    <>
      <h1>React To-Do App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo....."
      />
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
}

export default AddTodo;
