import { ToDoForm } from "./components/ToDoForm/ToDoForm";
import {ToDoList} from "./components/ToDoList/ToDoList";
import { TodoFilters } from "./components/ToDoFilters/TodoFilters";
import { Alert } from "./components/Alerts/Alert";
import { useTodos } from "./hooks/todo";
import { Loader } from "./components/Loader/Loader";
import styles from "./App.module.css";

function App() {
  const todos = useTodos();

  return (
    <div className={styles.App}>
    
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png" />
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}>
        {todos.loading && <Loader />}
        {!!todos.error.message && (
          <Alert onClear={todos.error.clear}>{todos.error.message}</Alert>
        )}
        <ToDoForm onCreate={todos.create} />
        <TodoFilters onFilter={todos.filter} />
        <ToDoList
          todos={todos.data}
          onUpdate={todos.update}
          onDelete={todos.delete}
        />
      </div>
    </div>
  );
}

export default App;