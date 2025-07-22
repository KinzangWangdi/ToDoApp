import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getTodoSchema } from '../../schemas/todo';
import { ToDoFormFields } from '../ToDoFormFields/ToDoFormFields.jsx';
import styles from './ToDoForm.module.css';
import { PRIORITY_DEFAULT } from '../../constants/priorities';

export function ToDoForm({ onCreate }) {

    const [showAllFields, setShowAllFields] = useState(false);
    const { register, handleSubmit, reset, formState:{errors}, } = useForm({
        resolver: yupResolver(getTodoSchema({ isNew: true })),
        defaultValues: {
            description: '',
            deadline: '',
            priority: PRIORITY_DEFAULT,
            completed: false,
        }
    });

    function handleCreate(data) {
        // event.preventDefault();

        // const { elements } = event.target;
        // if (elements.name.value === "") return;

        onCreate(data);
            // {
            // name: elements.name?.value ?? "",
            // description: elements.description?.value ?? "",
            // deadline: elements.deadline?.value ?? "",
            // priority: elements.priority?.value ?? PRIORITY_DEFAULT
            // }
        reset();

    }
    return (
        <section>
            <h3 className={styles.Title}>New To-Do
                <button onClick={() => setShowAllFields(!showAllFields)}>
                    {showAllFields ? "Hide" : "Show"} all fields
                </button>
            </h3>

            <form className={styles.Form} onSubmit={handleSubmit(handleCreate)}>
                <ToDoFormFields showAllFields={showAllFields} register={register} errors={errors}/>

                <input type="submit" value="Add" />
            </form>
        </section>
    );
}