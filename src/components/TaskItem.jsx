import styles from './TaskItem.module.css'
import CommentsForm from './CommentsForm'
import { PencilSquareIcon  } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'

const TaskItem = ({ task, deleteTask, enterEditMode, updateTask }) => {
  return (
    <>
      <li className={styles.task}>
        <div className={styles["task-group"]}>
          <label
            htmlFor={task.id}
            className={styles.label}
          >
            {task.task}          
          </label>
        </div>
        <div className={styles["task-group"]}>
          <button
            className='btn'
            aria-label={`Update ${task.name} Task`}
            onClick={() => enterEditMode(task)} 
          >
            <PencilSquareIcon width={24} height={24} />
          </button>

          <button
            className={`btn ${styles.delete}`}
            aria-label={`Delete ${task.name} Task`}
            onClick={() => deleteTask(task.id)}            
          >
            <TrashIcon 
              width={24} 
              height={24} 
            />
          </button>
        </div>
      </li>
      <li className={styles.task}>
        <div>
          <h4 style={{textAlign: 'justify'}}>COMMENTS</h4>
          <CommentsForm  
            task={task}
            updateTask={updateTask}
          />          
        </div>
      </li>
    </>    
  )
}
export default TaskItem