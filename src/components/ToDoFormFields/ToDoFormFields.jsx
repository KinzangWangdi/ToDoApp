import {PRIORITIES, PRIORITY_DEFAULT } from '../../constants/priorities';

import styles from './ToDoFormFields.module.css';

export function ToDoFormFields({todo = {}, showAllFields=true, register, errors={}}) {
    return (
        <div className={styles.FormFields}>
            <div className={styles.FormField}>
                <input
                    type="text"
                    aria-label="Name*"
                    aria-invalid={!!errors.name}
                    placeholder="Name*"
                    autoComplete="off"
                    defaultValue={todo.name}                  
                    {...register("name")}
                />
                {!!errors.name && <p className={styles.Error}>{errors.name.message}</p>}
            </div>

            {showAllFields &&
                <>
                    <div className={styles.FormField}>
                        <textarea
                            aria-label="Description"
                            aria-invalid={!!errors.description}
                            placeholder="Description"
                            rows="3"
                            defaultValue={todo.description}
                            {...register("description")}
                        />
                        {!!errors.description && <p className={styles.Error}>{errors.description.message}</p>}

                    </div>

                    <div className={styles.FormGroup}>
                        <div className={styles.FormField}>
                            <label htmlFor="deadline">Deadline</label>
                            <input 
                                type="date" 
                                id="deadline" 
                                aria-invalid={!!errors.deadline}
                                defaultValue={todo.deadline} 
                                {...register("deadline"
                                // , {
                                //     min: !todo.id && {
                                //         value: new Date().toISOString().split("T")[0],
                                //         message: "Deadline cannot be in the past"
                                //     },
                                
                                // }
                                )}/>
                                {!!errors.deadline && <p className={styles.Error}>{errors.deadline.message}</p>}
                        </div>

                        <div className={styles.FormField}>
                            <label htmlFor="priority">Priority</label>
                            <select 
                                defaultValue={todo.priority ?? PRIORITY_DEFAULT} 
                                id="priority"
                                aria-invalid={!!errors.priority}
                                {...register("priority" )}>
                                {Object.entries(PRIORITIES).map(([key, { label }]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>   
                                ))}
                            </select>
                            {!!errors.priority && <p className={styles.Error}>{errors.priority.message}</p>}
                        </div>
                    </div>
                </>
            }
        </div>

    )
}