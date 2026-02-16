// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./features/ProtectedRoute";
import { Welcome } from "./pages/Welcome";
import { Registration } from "./pages/Registeration";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";


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
