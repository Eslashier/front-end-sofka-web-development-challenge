function reducer(state, action){
    switch(action.type){
        case 'get-lists':
            return state
        case 'add-group':
            const newGroup = {
                id: Math.floor(Math.random()*100),
                name: action.payload.group,
                todo:[]
            }
            const newListOfGroupsAdded = [...state.listOfTitles, newGroup]
            const newStateAddGroup={
                ...state, listOfTitles: newListOfGroupsAdded
            }
            console.log(newStateAddGroup)
            return newStateAddGroup;
        case 'add-task':
            const newTask = {
                id: Math.floor(Math.random()*100),
                taskToDo: action.payload.task,
                done: false,
                fkTitleId: action.payload.fk
            }
            
            const groupWithoutTask = state.listOfTitles.find(element => element.id === action.payload.fk)

            const index = groupWithoutTask.id

            const newListOfTasks = [...state.listOfTitles[index].todo, newTask]

            const updatedGroup={
                ...state.listOfTitles[index], todo: newListOfTasks
            }

            const listToUpdate=[...state.listOfTitles]

            listToUpdate[index] = updatedGroup

            const updatedMainList={
                ...state, listOfTitles : listToUpdate
            }

            console.log(updatedMainList)
            return(updatedMainList)

        case 'remove-list':
            return state
        case 'remove-task':
            return state
        case 'update-task':
            return state
    }
}

export default reducer