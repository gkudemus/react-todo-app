import { useEffect, useState } from "react"

const localStorage = (key, initVal) => {
  const [value, setValue] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(key)
      return localValue 
        ? JSON.parse(localValue) 
        : initVal
    } catch (error) {
      console.log(error)
      return initVal
    }    
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },[key, value])
 
  return [value, setValue]
}

export default localStorage