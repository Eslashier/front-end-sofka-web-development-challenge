function reducer(state, action){
    switch(action.type){
        case 'get-lists':
            return state
        case 'add-group':
            const newGroup = {
                id: Math.floor(Math.random()*100),
                name: action.payload.group,
                task:[]
            }
            const newListOfGroupsAdded = [...state.listOfTitles, newGroup]
            const newStateAddGroup={
                ...state, listOfTitles: newListOfGroupsAdded
            }
            return newStateAddGroup;
        case 'add-task':
            console.log("adding task")
            return state
        case 'remove-list':
            return state
        case 'remove-task':
            return state
        case 'update-task':
            return state
    }
}

export default reducer