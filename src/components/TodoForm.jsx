import { PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export const TodoForm = ({AddTask}) => {
  const [task, setTask] = useState({
    task: '',
    id: Date.now(),
    comments: 
    [
      {
        content: '',
        id: ''
      },
    ],
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setTask({...task, id: Date.now()})
    AddTask(task)
  }

  return (
    <form 
      className="todo"
      onSubmit={handleFormSubmit}
      >
        <div className="wrapper">
          <input 
            type="text"
            id="task"
            className="input"
            value={task.task}
            onInput={(e) => setTask({...task, [e.target.id]: e.target.value})}
            required
            autoFocus
            maxLength={50}
            placeholder="Enter Task"
          />
          <label 
            htmlFor="task"
            className="label"
          >"Enter Task"</label>
        </div>
        <button 
          className="btn"
          aria-label="Add Task"
          type="submit"
        >
          <PlusIcon />
        </button>
    </form>
  )
}
