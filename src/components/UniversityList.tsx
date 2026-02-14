// src/components/UniversityList.tsx
import { useEffect, useState } from "react";
import { api, University } from "../services/api";

export function UniversityList() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("📥 Loading universities...");

      // ✅ FIX: api.getUniversities() now returns University[] directly
      const data = await api.getUniversities();

      console.log("✅ Loaded universities:", data);

      setUniversities(data); // ✅ Now it's an array!
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load universities";
      setError(errorMessage);
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Loading universities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
        <button
          onClick={loadUniversities}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        <p>No universities found. Add data to Supabase database.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Universities ({universities.length})
        </h2>
        <button
          onClick={loadUniversities}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {universities.map((uni) => (
          <div
            key={uni.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              {uni.name}
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              📍 {uni.city}, {uni.country}
            </p>
            {uni.top_field && (
              <p className="text-gray-600 text-sm mb-1">🎓 {uni.top_field}</p>
            )}
            <p className="text-gray-800 font-medium">
              💰 {uni.tuition_fee?.toLocaleString() || "N/A"} PKR/year
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
