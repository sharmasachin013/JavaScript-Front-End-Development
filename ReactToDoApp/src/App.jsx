import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";

function App() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todosonline")) || [];
  });

  useEffect(() => {
    localStorage.setItem("todosonline", JSON.stringify(todos));
  }, [todos]);

  console.log("App");
  console.log(todos);

  return (
    <div>
      <ToDoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
