import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      fetchAllNotes
    </div>
  )
}

useEffect(()=>{
  let listOfNote = fetchAllNotes().then(
      notes=>{
        console.log(data)
          // let action = {
          //     type:'get-notes',
          //     payload: notes
          // }

          // dispatch(action)
      }
  )

},[])

const fetchAllNotes = async()=>{
  let response = await fetch(`http://localhost:8081/api/get/notes`);
  let data = await response.json();
  console.log(data)
  return data
}

export default App
