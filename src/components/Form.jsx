import React, { useState, useContext, useRef } from 'react'
import { Store } from './StoreProvider'

export const Form = () => {

    const formRefTask = useRef(null)

    const onAddGroup = (event) => {
        event.preventDefault();
        if (group) {
            dispatch({
                type: 'add-group',
                payload: {
                    group,
                }
            })
            formRefTask.current.reset();
        }
    }

    const {state, dispatch } = useContext(Store)

    const [group, setGroup] = useState('');

    const addingGroup = (e) => {
        setGroup(e.target.value)
    }

    return (
        <form ref={formRefTask}>
            <input onChange={addingGroup} type="text" placeholder="New group of task" name="group"></input>
            <button onClick={onAddGroup}>Add Group of tasks</button>
        </form>
    )
}

export default Form
