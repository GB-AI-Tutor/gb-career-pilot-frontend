// src/App.tsx
// import { useEffect, useState } from "react";
// import { api } from "./services/api";

// FOr testing
// function App() {
//   const [status, setStatus] = useState<"loading" | "connected" | "error">(
//     "loading",
//   );
//   // const [backendVersion, setBackendVersion] = useState<string>("");

//   useEffect(() => {
//     // Test backend connection on load
//     api
//       .health()
//       .then((response) => {
//         setStatus("connected");
//         console.log("✅ Backend connected:", response);
//       })
//       .catch((error) => {
//         setStatus("error");
//         console.error("❌ Backend connection failed:", error);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
//         <h1 className="text-3xl font-bold mb-4 text-blue-600">GB AI Tutor</h1>

//         <div className="mb-4">
//           <h2 className="text-xl font-semibold mb-2">Backend Status:</h2>
//           {status === "loading" && (
//             <p className="text-yellow-600">⏳ Connecting...</p>
//           )}
//           {status === "connected" && (
//             <p className="text-green-600">✅ Connected!</p>
//           )}
//           {status === "error" && (
//             <p className="text-red-600">❌ Connection Failed</p>
//           )}
//         </div>

//         <div className="text-sm text-gray-600">
//           <p>Frontend: Vercel</p>
//           <p>Backend: Railway</p>
//           <p>Database: Supabase</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { UniversityList } from "./components/UniversityList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          GB AI Tutor
        </h1>
        <UniversityList />
      </div>
    </div>
  );
}

export default App;
