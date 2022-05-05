import React, {createContext, useReducer} from 'react'
import reducer from './Reducer'

const initialState = {
    title:{
        id:'',
        name:'',
        task:{
            id:'',
            taskToDo: '',
            done: true,
            fkTitleId: ''
        }
    },
    listOfTitles:[
    ]
}