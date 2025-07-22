
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";
import styles from "./ToDoList.module.css";

export function ToDoList({ todos, onUpdate, onDelete }) {
    return (
        <section>
            <h3>To-Do's</h3>
            {todos.length === 0 && <p>No To-Do's yet</p>}

            <ul className={styles.TodoList}>
                {Array.isArray(todos) && todos.map((todo) => (
                    <ToDoListItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
                ))}
            </ul>
        </section>
    );
}