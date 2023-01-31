import { useState } from 'react'
import './App.css'
import { TextField } from './components/TextField'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TextField label="Label" id="label-input" />
    </div>
  )
}

export default App
