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
            console.log(indexListToUpdate)


            const listToUpdate = [...state.listOfTitles]

            listToUpdate[indexListToUpdate] = action.payload

            const updatedMainList = {
                ...state, listOfTitles: listToUpdate
            }

            return updatedMainList

        case 'update-done':
            const indexDone = state.listOfTitles.findIndex(element => element.id === action.payload.fkTitleId)
            const newUpdateMain = state.listOfTitles[indexDone].todo.filter(tasks =>tasks.id !== action.payload.id)
            const newListOfTasksWithMod = [...newUpdateMain, action.payload]

            const updatedGroupWithCheckedBoxes = {
                ...state.listOfTitles[indexDone], todo: newListOfTasksWithMod
            }

            const listToUpdateWithCheckedBoxes = [...state.listOfTitles]

            listToUpdateWithCheckedBoxes[indexDone] = updatedGroupWithCheckedBoxes

            const updatedMainWithCheckedBox = {
                ...state, listOfTitles: listToUpdateWithCheckedBoxes
            }

            return updatedMainWithCheckedBox

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
            return state
    }
}

export default reducer