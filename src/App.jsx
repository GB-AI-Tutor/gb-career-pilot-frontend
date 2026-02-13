import { useState } from 'react'
import './App.css'
// 1. Import your custom component
import { TestButton } from './components/TestButton'

function App() {
  const [message, setMessage] = useState("Click the button below!")

  const handleButtonClick = () => {
    setMessage("Success! The button component is working.")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">{message}</h1>
      
      {/* 2. Use your component here */}
      <TestButton 
        label="Test My Component" 
        onClick={handleButtonClick} 
      />
    </div>
  )
}

export default App
