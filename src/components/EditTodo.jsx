import { CheckIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const EditToDo = ({updatedtask, updateTask}) => {
  const [taskName, setTaskName] = useState(updatedtask.task)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    updateTask({
      ...updatedtask,
      task: taskName,
    })
  }

  return (
    <form 
      className="todo"
      onSubmit={handleFormSubmit}
      >
        <div className="wrapper">
          <label 
            htmlFor="editTask"
          >Enter Task</label>
          <input 
            type="text"
            id="editTask"
            className="input"
            value={taskName}
            onInput={(e) => setTaskName(e.target.value)}
            required
            autoFocus
            maxLength={100}
            placeholder="Update Task"
          />
        </div>
        <button 
          className="editbtn"
          aria-label="Edit Task"
          type="submit"
        >
          <CheckIcon />
        </button>
    </form>
  )
}
