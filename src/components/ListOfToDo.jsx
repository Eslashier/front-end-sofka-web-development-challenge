import React, { useContext, useState, useEffect, useRef } from 'react'
import { Store } from './StoreProvider'

const ListOfToDo = () => {

  const [visible, setVisible] = React.useState(false);

  const { state, dispatch } = useContext(Store)

  const onAddTask = (fk, event) => {
    event.preventDefault()
    if (task) {
      dispatch({
        type: 'add-task',
        payload: {
          task,
          fk,
        }
      })
    }
  }

  const [task, setTask] = useState('');

  const addingTask = (e) => {
    setTask(e.target.value)
  }

  const onCheckBox = (event, tasks) => {
    const checked = event.currentTarget.checked
    dispatch({
      type: 'update-done',
      payload: {
        ...tasks,
        done: checked
      }
    })
  }

  const onDeleteTask = (tasks) => {
    dispatch({
      type: 'remove-task',
      payload: tasks
    })
  }

  const onDeleteTitle = (title) => {
    dispatch({
      type: 'delete-list',
      payload: title
    })
  }




  return (
    <div>
      <ul>
        {state.listOfTitles.map(title => {
          return <li key={title.id}>

            {title.name}
            <button onClick={() => onDeleteTitle(title)}>Delete</button>
            <br />

            <form>

              <div style={{ display: visible ? 'none' : 'block' }}>
                <input onChange={addingTask} type="text" name={title.id} placeholder="Schedule new task" />
                <button onClick={e => { onAddTask(title.id, e) }} name={title.id}>Schedule</button>
              </div>

              <div style={{ display: visible ? 'block' : 'none' }}>
                <input onChange={addingTask}></input>
                <button onClick={() => setVisible(!visible)}>OK</button>
              </div>

            </form>

            <h2>id  Task  Done</h2>
            {title.todo.map(tasks => {
              return <div style={tasks.done ? { textDecoration: 'line-through' } : {}} key={tasks.id}>
                {tasks.id} {tasks.taskToDo}
                <input onChange={(event) => onCheckBox(event, tasks)} type="checkbox" checked={tasks.done} />
                <button onClick={() => onDeleteTask(tasks)}>Delete</button>
                <button onClick={() => { setVisible(!visible) }} disabled={tasks.done ? 1 : 0}>Edit</button>
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

