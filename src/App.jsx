import {ToDoForm} from './components/ToDoForm/ToDoForm.jsx'
import styles from './App.module.css'

function App() {
 return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src='/to-do.png'/>
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}>
        <ToDoForm />
      </div>
    </div>
  )
}

export default App
