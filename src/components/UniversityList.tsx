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
      const response = await api.getUniversities();
      const universitiesWithField = response.map((uni) => ({
        id: uni.id,
        name: uni.name,
        city: uni.city,
        country: uni.country,
        top_field: uni.top_field ?? '',
        tuition_fee: uni.tuition_fee,
      }));
      setUniversities(universitiesWithField);
      setError(null);
    } catch (err) {
      setError("Failed to load universities");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        Universities ({universities.length})
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {universities.map((uni) => (
          <div
            key={uni.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              {uni.name}
            </h3>
            <p className="text-gray-600 text-sm mb-1">📍 {uni.city}</p>
            <p className="text-gray-600 text-sm mb-1">🎓 {uni.top_field}</p>
            <p className="text-gray-800 font-medium">
              💰 {uni.tuition_fee.toLocaleString()} PKR/year
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
