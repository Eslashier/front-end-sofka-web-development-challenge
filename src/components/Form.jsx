import React, { useState, useContext, useRef } from 'react'
import { Store } from './StoreProvider'

export const Form = () => {

    const formRefTask = useRef(null)

      const onAddName = async (event) => {
        event.preventDefault();
        if (name) {
            const titleFromForm={
                name
            }

            let titleSavedPromise = await fetch(`http://localhost:8888/api/create/titles`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(titleFromForm)
            })

            let titleSaved = await titleSavedPromise.json();

            dispatch({
                type: 'add-group',
                payload: titleSaved
            })

            formRefTask.current.reset();
        }
    }

    const { state, dispatch } = useContext(Store)

    const [name, setName] = useState('');

    const addingName = (e) => {
        setName(e.target.value)
    }

    return (
        <form ref={formRefTask}>
            <input onChange={addingName} type="text" placeholder="New group of task" name="group"></input>
            <button onClick={onAddName}>Add Group of tasks</button>
        </form>
    )
}

export default Form
