import React, { useState } from 'react'
import {ToDoForm} from './components/ToDoForm/ToDoForm.jsx'
import styles from './App.module.css'

function App() {

const [todos, setTodos] = useState([]);

function handleCreate(newTodo) {
    setTodos((prevTodos) => [
      ...prevTodos, 
      { id: `${prevTodos.length + 1}`, ...newTodo },
  ]);
}

 return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src='/to-do.png'/>
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}>
        <ToDoForm onCreate={handleCreate}/>
        {JSON.stringify(todos)}
      </div>
    </div>
  )
}

export default App
