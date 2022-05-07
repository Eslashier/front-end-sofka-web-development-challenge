import React, { useContext, useState, useEffect, useRef } from 'react'
import { Store } from './StoreProvider'

const ListOfToDo = () => {

  const [visible, setVisible] = React.useState(false);

  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    let mainList = fetchAllLists().then(
      listOfTitlesFromBack => {
        let action = {
          type: 'get-lists',
          payload: listOfTitlesFromBack
        }

        dispatch(action)
      }
    )
  }, [])

  const fetchAllLists = async () => {
    let response = await fetch(`http://localhost:8888/api/get/titles`)
    let data = await response.json();
    return data
  }

  const onAddTask = async (fk, event) => {
    event.preventDefault()
    if (task) {

      const fkTitleId = fk
      const taskToDo = task

      const taskFromFrom = {
        taskToDo,
        done: false,
        fkTitleId
      }

      let taskSavedPromise = await fetch(`http://localhost:8888/api/create/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskFromFrom)
        })

      let taskSaved = await taskSavedPromise.json();

      dispatch({
        type: 'add-task',
        payload: taskSaved
      })
    }
  }

  const [task, setTask] = useState('');

  const addingTask = (e) => {
    setTask(e.target.value)
  }

  const onCheckBox = async (event, tasks) => {
    const checked = event.currentTarget.checked
    const done = event.currentTarget.checked
    const fkTitleId = tasks.fkTitleId
    const taskToDo = tasks.taskToDo
    const id = tasks.id

    const taskSwitch = {
      done,
      fkTitleId,
      taskToDo,
      id
    }

    let taskSwitchedPromise = await fetch(`http://localhost:8888/api/update/task`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskSwitch)

      })

    let taskSwitched = await taskSwitchedPromise.json();
    
    dispatch({
      type: 'update-done',
      payload: taskSwitched
    })
  }

  const onDeleteTask = async (tasks) => {
    let response = await fetch(`http://localhost:8888/api/delete/task/${tasks.id}`,
    {
      method: 'DELETE'
    })

    if(response.status ===200){
      dispatch({
        type: 'remove-task',
        payload: tasks
      })
    }
  }

  const onDeleteTitle = async(title) => {
    let response = await fetch(`http://localhost:8888/api/delete/title/${title.id}`,
    {
      method: 'DELETE'
    })

    if(response.status ===200){
      dispatch({
        type: 'delete-list',
        payload: title
      })
    }
    
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

