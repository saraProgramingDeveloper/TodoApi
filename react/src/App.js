import React, { useEffect, useState } from 'react';
import service from './service.js';
import TaskAdder from './add.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo("");//clear input
    await getTodos();//refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete, todo.name);
    await getTodos();//refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    getTodos();
  }, []);

return (
  <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
     <video
      autoPlay
      loop
      muted
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.2, // שקיפות של הוידיאו
        zIndex: 0 // וודא שהוידיאו מאחורי התוכן
      }}
    >
      <source src="/vid.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <img src="/pic.jpg" alt="Background" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: -1 // וודא שהתמונה מאחורי התוכן
    }} />
    <section className="todoapp" style={{  maxWidth: '550px', width: '100%', marginLeft: '1000px' }}>
     
      <header className="header text-center">
        <h1>Todos</h1>
        <form onSubmit={createTodo}>
          <input
            className="new-todo"
            placeholder="my tasks for this week"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    defaultChecked={todo.isComplete}
                    onChange={(e) => updateCompleted(todo, e.target.checked)}
                  />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <TaskAdder />
    </section>
  </div>
);
}
export default App;