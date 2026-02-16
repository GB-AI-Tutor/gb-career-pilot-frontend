// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./features/ProtectedRoute";
import { Welcome } from "./pages/Welcome";
import { Registration } from "./pages/Registeration";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
// import { UniversityList } from "./components/UniversityList";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
//           GB AI Tutor
//         </h1>
//         <UniversityList />
//       </div>
//     </div>
//   );
// }

// export default App;


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Welcome />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
