import React, { useContext, useState, useEffect } from 'react'
import { Store } from './StoreProvider'

const ListOfToDo = () => {

  const { state, dispatch } = useContext(Store)

  const onAddTask = (event) => {
    event.preventDefault()
  }

  const[task, setTask] = useState('');
  console.log(task);

  const addingTask = (e) => {
        setTask(e.target.value)
  }

  return (
    <div>
      <ul>
        {state.listOfTitles.map(title => {
          return <li key={title.id}>

            {title.name}
            <button>Delete</button>
            <br />

            <form>
              <input onChange={addingTask} type="text" name={title.id} placeholder="Schedule new task" />
              <button onClick={onAddTask}>Schedule</button>
            </form>

            <h2>id  Task  Done</h2>
            {title.task.map(tasks => {
              return <div style={tasks.done ? { textDecoration: 'line-through' } : {}} key={tasks.id}>
                {tasks.id} {tasks.taskToDo}
                <input type="checkbox"></input>
                {/* <input type="checkbox" checked={tasks.done}></input> */}
                <button >Delete</button>
                <button>Edit</button>
                {/* <button disabled={tasks.done ? "true" : ""}>Edit</button> */}
                <br />
              </div>
            })}
            <br />
          </li>

        })}
      </ul>
    </div>
  )
}

export default ListOfToDo

