import { useState } from "react";
import "./App.css";
import { TestButton } from "./components/TestButton";

function App() {
  const [message, setMessage] = useState<string>("Click the button below!");

  const handleButtonClick = () => {
    setMessage("Success! The button component is working.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">{message}</h1>

      <TestButton label="Test My Component" onClick={handleButtonClick} />
    </div>
  );
}

export default App;
