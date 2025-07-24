import React from "react";

function UpdateTodo(props) {
  const setTodos = props.setTodos;
  const todos = props.todos;
  const editText = props.value;
  const setEditText = props.setEditText;
  const editId = props.editId;
  const setEditId = props.setEditId;

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todos, text: editText } : todo
      )
    ); 
    setEditId(null);
    setEditText("");
  };

  return (
    <>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
      <button onClick={updateTodo} className="save-btn">
        Save
      </button>
    </>
  );
}

export default UpdateTodo;
