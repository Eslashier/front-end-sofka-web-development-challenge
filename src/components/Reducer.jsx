function reducer(state, action) {
    switch (action.type) {
        case 'get-lists':
            const stateWithAllTheTitles = {
                ...state, listOfTitles: action.payload
            }
            return stateWithAllTheTitles

        case 'add-group':
            const newGroup = {
                    id: action.payload.id,
                    name: action.payload.name,
                    todo:[]
            }
            const newListOfGroupsAdded = [...state.listOfTitles, newGroup]
            const newStateAddGroup = {
                ...state, listOfTitles: newListOfGroupsAdded
            }
            console.log(newStateAddGroup)
            return newStateAddGroup;

        case 'add-task':

            const indexListToUpdate = state.listOfTitles.findIndex(element => element.id === action.payload.id)

            const listToUpdate = [...state.listOfTitles]

            listToUpdate[indexListToUpdate] = action.payload

            const updatedMainList = {
                ...state, listOfTitles: listToUpdate
            }

            return updatedMainList

        case 'update-done':

            const indexSwitchedList = state.listOfTitles.findIndex(element => element.id === action.payload.id)

            const listToSwitch = [...state.listOfTitles]

            listToSwitch[indexSwitchedList] = action.payload

            const updatedSwitchedList = {
                ...state, listOfTitles: listToSwitch
            }

            return updatedSwitchedList

        case 'delete-list':
            const filteredTitles = state.listOfTitles.filter(title => title.id !== action.payload.id)
            const titlesUpdatedWithoutDeleted = {
                ...state, listOfTitles: filteredTitles
            }
            return titlesUpdatedWithoutDeleted

        case 'remove-task':
            const indexTaskToDelete = state.listOfTitles.findIndex(element => element.id === action.payload.fkTitleId)
            const tasksWithoutTheDeleted = state.listOfTitles[indexTaskToDelete].todo.filter(tasks =>tasks.id !== action.payload.id)
            const updatedGroupWithDeletedTask = {
                ...state.listOfTitles[indexTaskToDelete], todo: tasksWithoutTheDeleted
            }

            const listToUpdateWithoutDeletedTask = [...state.listOfTitles]

            listToUpdateWithoutDeletedTask[indexTaskToDelete] = updatedGroupWithDeletedTask

            const updatedMainWithoutDeletedTask = {
                ...state, listOfTitles: listToUpdateWithoutDeletedTask
            }

            return updatedMainWithoutDeletedTask

        case 'update-task':
            const indexEditList = state.listOfTitles.findIndex(element => element.id === action.payload.id)

            const listToUpdateTask = [...state.listOfTitles]

            listToUpdateTask[indexEditList] = action.payload

            const editedList = {
                ...state, listOfTitles: listToUpdateTask
            }

            return editedList
    }
}

export default reducer