import React, { createContext, useReducer } from 'react'
import reducer from './Reducer'

const initialState = {
    title: {
        id: '',
        name: '',
        todo: {
            id: '',
            taskToDo: '',
            done: false,
            fkTitleId: ''
        }
    },
    listOfTitles: [
        {
            id: 0,
            name: 'defaultname',
            todo: [
                {
                    id: 1,
                    taskToDo: "defaultask",
                    done: false,
                    fkTitleId: 0
                }, {
                    id: 2,
                    taskToDo: 'defaultask',
                    done: true,
                    fkTitleId: 0
                }
            ]
        },{
            id: 2,
            name: 'defaultname',
            todo: []
        }
    ]
}

const Store = createContext(initialState)

const StoreProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Store.Provider value={{ state, dispatch }}>
            {children}
        </Store.Provider>
    )
}

export default StoreProvider
export { Store, initialState }