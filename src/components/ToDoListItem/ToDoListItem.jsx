
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities"
import styles from "./ToDoListItem.module.css";
import { yupResolver } from '@hookform/resolvers/yup';
import { getTodoSchema } from '../../schemas/todo';
import { ToDoFormFields } from "../ToDoFormFields/ToDoFormFields";

export function ToDoListItem({ todo, onUpdate, onDelete }) {

    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset, formState:{errors} } = useForm({
        resolver:yupResolver(getTodoSchema()), defaultValues: todo});

    function handleCompleted(event) {
        onUpdate(todo.id, { ...todo, completed: event.target.checked });

    }

    // function handleEdit(event) {
    //     event.preventDefault();

    //     const { elements } = event.target;
    //     if (elements.name.value === "") return;

    //     onUpdate(todo.id, {
    //         name: elements.name.value,
    //         description: elements.description.value,
    //         deadline: elements.deadline.value,
    //         priority: elements.priority.value,
            
    //     });

    //     setIsEditing(false);

    // }

    function handleEdit(data) { 
        onUpdate(todo.id, data);
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
        <form className={styles.Content} onReset={() => setIsEditing(false)} onSubmit={handleSubmit(handleEdit)}>
            <ToDoFormFields todo={todo} register={register} errors={errors}/>

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