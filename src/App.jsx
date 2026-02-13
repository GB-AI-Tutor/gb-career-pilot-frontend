import { useState } from "react";
import "./App.css";
import { TestButton } from "./components/TestButton";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleStartClick = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          🚀 AI Tutor Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          Welcome team! Let’s build something amazing together.
        </p>

        <TestButton
          label="Start Development"
          onClick={handleStartClick}
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm text-center space-y-4">
            <h2 className="text-2xl font-bold text-indigo-600">
              Welcome Team! 🎉
            </h2>
            <p className="text-gray-700">
              It’s time to start development and bring the AI Tutor to life.
            </p>

            <button
              onClick={closeModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Let’s Go 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
