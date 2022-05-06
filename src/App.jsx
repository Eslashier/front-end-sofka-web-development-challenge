import './App.css'
import ListOfToDo from './components/ListOfToDo'
import Form from './components/Form'
import StoreProvider from './components/StoreProvider'


function App() {

  return (
    <StoreProvider>
      <h1>Dashboard</h1>
      <Form/>
      <ListOfToDo/>
    </StoreProvider>
  )
}


export default App
