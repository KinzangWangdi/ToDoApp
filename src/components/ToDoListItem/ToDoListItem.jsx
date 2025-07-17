
import { useState } from "react";
import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities"
import styles from "./ToDoListItem.module.css";
import { ToDoFormFields } from "../ToDoFormFields/ToDoFormFields";

export function ToDoListItem({ todo, onUpdate, onDelete }) {

    const [isEditing, setIsEditing] = useState(false);

    function handleCompleted(event) {
        onUpdate(todo.id, { ...todo, completed: event.target.checked });

    }

    function handleEdit(event) {
        event.preventDefault();

        const { elements } = event.target;
        if (elements.name.value === "") return;

        onUpdate(todo.id, {
            name: elements.name.value,
            description: elements.description.value,
            deadline: elements.deadline.value,
            priority: elements.priority.value,
            
        });

        setIsEditing(false);

    }

    const viewingTemplate = (
        <div className={styles.Content}>
            <input
                type="checkbox"
                name="completed"
                defaultChecked={todo.completed}
                onChange={handleCompleted}
                className={styles.Status}
            />

            <div className={styles.Info}>
                {todo.name}

                {todo.description && (
                    <span className={styles.Description}>{todo.description}</span>
                )}

                <div className={styles.AdditionalInfo}>
                    {todo.deadline} {todo.priority !== PRIORITY_DEFAULT && (
                        <span style={{ color: PRIORITIES[todo.priority].color }}>
                            {PRIORITIES[todo.priority].label}
                        </span>
                    )}

                </div>
            </div>

            <div className={styles.EditButton}>
                <button
                    onClick={() => setIsEditing(true)}
                >
                    📝
                </button>
                <button 
                    onClick={() => onDelete(todo.id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    );

    const editingTemplate = (
        <form className={styles.Content} onReset={() => setIsEditing(false)} onSubmit={handleEdit}>
            <ToDoFormFields todo={todo} />

            <div className={styles.EditButton}>
                <input type="submit" value="💾" />
                <input type="reset" value="❌" />
            </div>
        </form>
    )
    return (
        <li className={styles.TodoListItem}
            data-completed={todo.completed}>
            {isEditing ? editingTemplate : viewingTemplate}
        </li>
    );

}