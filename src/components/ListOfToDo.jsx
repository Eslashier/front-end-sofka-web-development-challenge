import React, { useContext, useEffect } from 'react'
import { Store } from './StoreProvider'

const ListOfToDo = () => {

  const { state, dispatch } = useContext(Store)

  console.log(state)

  return (
    <div>
      <ul>
        {state.listOfTitles.map(title => {
          return <li key={title.id}>

            {title.name}
            <button>Delete</button>
            <br />

            <form>
              <input type="text" name="task" />
              <button>Schedule</button>
            </form>

            <h2>id  Task  Done</h2>
            {title.task.map(tasks => {
              return <div style={tasks.done ? { textDecoration: 'line-through' } : {}} key={tasks.id}>
                {tasks.id} {tasks.taskToDo}
                <input type="checkbox" checked={tasks.done}></input>
                <button>Delete</button>
                <button>Edit</button>
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

