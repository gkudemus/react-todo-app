import { useState } from 'react'
import { TaskList } from './components/TaskList'
import { TodoForm } from './components/TodoForm'
import { EditToDo } from './components/EditTodo'
import localStorage from './hooks/LocalStorage'

export const Home = ({ setToken }) => {
  const [tasks, setTasks] = localStorage('tasks', [])
  const [editedTask, setEditedTask] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false)

  const logoutHandler = () => {
    setToken('')
    localStorage.clear()
  }

  const AddTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(task => task.id !== id))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, 
          task: task.task,
          comments: task.comments
         }
        : t
    )))
    closeEditModal();
  }

  const closeEditModal = () => {
    setIsUpdating(false)
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsUpdating(true)
  }
  return (
    <>
      <header>
        <h1>My To-do List</h1>
        <button className='button-logout' onClick={() => logoutHandler()}>Log out</button>
      </header>      
      {isUpdating ? 
        <EditToDo 
          updatedtask={editedTask}
          updateTask={updateTask}
        /> :
        <>
          <TodoForm AddTask={AddTask}/>
          {tasks && (
            <TaskList 
              tasks={tasks}
              deleteTask={deleteTask}
              enterEditMode={enterEditMode}
              updatedtask={editedTask}
              updateTask={updateTask}
            />
          )}
        </>
      }
    </>    
  )
}