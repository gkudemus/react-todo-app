import { useEffect, useState } from 'react'
import styles from './CommentsForm.module.css'
import localStorage from '../hooks/LocalStorage'

const CommentsForm = ({task, updateTask}) => {
  const [comment, setComment] = useState('')
  const [commentsArr, setCommentsArr] = useState([])
  const [tasks, setTasks] = localStorage('tasks', [])
  const [isUpdating, setIsUpdating] = useState(false)
  const [targetComment, setTargetComment] = useState(null)
  const [targetId, setTargetId] = useState(null)

  useEffect(() => {
    if(commentsArr){
      updateTask({
        ...task,
        comments: commentsArr
      })    
    }    
  }, [commentsArr])

  useEffect(() => {
    if(targetId) setTargetId(targetId)
  }, [targetId])

  const handleFormSubmit = () => {
    const commentObj = {
      id: `comment-${Date.now()}`,
      content: comment
    }
    if(comment.content !== '') {
      setCommentsArr([...commentsArr, commentObj])
      setComment('')
    }    
  }

  const deleteComment = (id) => {
    const newCommentObj = commentsArr.filter(commentEl => commentEl.id !== id)
    setCommentsArr(newCommentObj)
    updateTask({
      ...task,
      comments: newCommentObj
    })  
  }

  const editCommentSubmit = () => {
    const getCommentIndex = commentsArr.findIndex(object => {
      return object.id === targetComment.id
    })

    if(getCommentIndex !== -1) commentsArr[getCommentIndex].content = comment
    
    if(comment.content !== '') {
      setCommentsArr(commentsArr)
      setComment('')
    }    
    closeEditCommentMode()
  }

  const enterEditCommentMode = (comment) => {
    setTargetComment(comment)
    setIsUpdating(true)
    setComment(comment.content)
  }

  const closeEditCommentMode = () => {
    setIsUpdating(false)
    setComment('')
  }

  return (
    <div>
      <div className='commentsForm'>
        <label htmlFor="comment">
          <h6 style={{paddingBottom: "20px", textAlign: 'justify'}}>{!isUpdating ? "Enter Comment" : "Edit Comment"}</h6>
        </label>
        <textarea 
          id="comment"
          className="input"
          value={comment}
          onInput={(e) => setComment(e.target.value)}
          autoFocus
          rows="10"
          cols="50"
          maxLength={1000}
          placeholder={!isUpdating ? "Enter Comment" : "Edit Comment"}
        />
        <div className={styles["task-group"]}>
          <button 
            className="addcommentbtn"
            aria-label="AddComment"
            onClick={!isUpdating ? handleFormSubmit : editCommentSubmit }
            type="submit"
          >
            <p style={{fontSize:"14px", fontWeight: 'bold'}}>{!isUpdating ? "Submit New Comment" : "Update Comment"}</p>
          </button>
          {isUpdating && (
            <button 
            className="addcommentbtn"
            aria-label="AddComment"
            onClick={closeEditCommentMode}
            type="submit"
          >
            <p style={{fontSize:"14px", fontWeight: 'bold'}}>Cancel</p>
          </button>
          )}
        </div>
      </div>
      <h5 style={{paddingTop:"30px", textAlign: 'justify'}}>Saved Comments</h5>
      <ul style={{paddingTop:"10px"}}>
        {task.comments.map((comment) => (
          <li key={comment.id} style={{listStyleType:"none", paddingTop:"20px"}}>
            <h6 style={{textAlign:"justify", paddingBottom: "10px"}}>
              {comment.content}
              {comment.id}
            </h6>
            <div className={styles["task-group"]}>
              <button 
                className="editcommentbtn"
                onClick={() => enterEditCommentMode(comment)}
                type="submit"
              >
                <p style={{fontSize:"14px", fontWeight: 'bold'}}>Edit Comment</p>
              </button>
              <button
                className={`btn ${styles.delete}`}
                onClick={() => deleteComment(comment.id)}            
              >
                <p style={{fontSize:"14px", fontWeight: 'bold'}}>Delete Comment</p>
              </button>  
            </div>  
          </li>
        ))}
      </ul>  
    </div>
  )
}

export default CommentsForm
