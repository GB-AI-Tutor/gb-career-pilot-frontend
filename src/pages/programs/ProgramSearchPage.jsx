import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { universitiesAPI } from "../../api/universities";
import ProgramCard from "../../components/programs/ProgramCard";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Search,
  BookOpen,
  Sparkles,
  Filter,
  X,
} from "lucide-react";

const ProgramSearchPage = () => {
  const [filters, setFilters] = useState({
    field: "",
    city: "",
    min_fee: "",
    max_fee: "",
    sector: "Private",
  });
  const [page, setPage] = useState(0);
  const limit = 12;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["programs", filters, page],
    queryFn: () =>
      universitiesAPI.searchPrograms({
        ...filters,
        field: filters.field || null,
        city: filters.city || null,
        min_fee: filters.min_fee ? parseInt(filters.min_fee) : null,
        max_fee: filters.max_fee ? parseInt(filters.max_fee) : null,
        limit,
        offset: page * limit,
      }),
  });

  const totalPages = data?.metadata?.total_pages || 0;
  const programs = data?.data || [];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0); // Reset to first page on filter change
  };

  const clearFilters = () => {
    setFilters({
      field: "",
      city: "",
      min_fee: "",
      max_fee: "",
      sector: "Private",
    });
    setPage(0);
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#FFF9F0" }}>
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div
          className="blob-float absolute top-40 -right-20 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,230,109,0.4) 0%, transparent 70%)",
            animation: "blob-float 28s ease-in-out infinite",
          }}
        />
        <div
          className="blob-float absolute -bottom-20 left-20 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)",
            animationDelay: "-14s",
            animation: "blob-float 28s ease-in-out infinite",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-[#4ECDC4] via-[#44A08D] to-[#96CEB4] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/dashboard">
              <button
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#4ECDC4] font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <div
                className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg"
                style={{ animation: "float 3s ease-in-out infinite" }}
              >
                <BookOpen
                  className="w-8 h-8 text-[#4ECDC4]"
                  strokeWidth={2.5}
                />
              </div>
              <h1
                className="text-4xl font-black text-white"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Program Search
              </h1>
              <Sparkles
                className="w-6 h-6 text-white"
                style={{ animation: "float 2s ease-in-out infinite 0.5s" }}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-[#4ECDC4]" />
                <h3
                  className="font-bold text-lg text-[#2C3E50]"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Search Filters
                </h3>
              </div>
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF6B6B]/10 text-[#FF6B6B] font-semibold rounded-2xl hover:bg-[#FF6B6B]/20 transition-all duration-300"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-sm font-semibold text-[#2C3E50]/80 mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Field of Study
                </label>
                <select
                  value={filters.field}
                  onChange={(e) => handleFilterChange("field", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border-2 border-[#4ECDC4]/20 rounded-2xl text-[#2C3E50] font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:border-[#4ECDC4] focus:ring-2 focus:ring-[#4ECDC4]/20"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <option value="">All Fields</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medical">Medical</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-[#2C3E50]/80 mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  City
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border-2 border-[#4ECDC4]/20 rounded-2xl text-[#2C3E50] font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:border-[#4ECDC4] focus:ring-2 focus:ring-[#4ECDC4]/20"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <option value="">All Cities</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Karachi">Karachi</option>
                </select>
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-[#2C3E50]/80 mb-2"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Sector
              </label>
              <div className="flex gap-3">
                {["Private", "Public", "Semi-Government"].map((sector) => (
                  <button
                    key={sector}
                    onClick={() => handleFilterChange("sector", sector)}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg ${
                      filters.sector === sector
                        ? "bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] text-white scale-105"
                        : "bg-white text-[#2C3E50]/60 hover:text-[#2C3E50]"
                    }`}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            {data?.metadata && (
              <p
                className="text-sm text-[#2C3E50]/60 mt-4 font-medium"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Found{" "}
                <span className="font-bold text-[#4ECDC4]">
                  {data.metadata.total_count}
                </span>{" "}
                programs
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#4ECDC4] border-t-transparent rounded-full animate-spin mb-4" />
            <p
              className="text-[#2C3E50]/60 font-medium"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Loading programs...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md mx-auto border border-red-200">
              <p
                className="text-red-600 mb-4 font-semibold text-lg"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Failed to load programs
              </p>
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md mx-auto border border-white/50">
              <Search className="w-16 h-16 text-[#2C3E50]/30 mx-auto mb-4" />
              <p
                className="text-[#2C3E50] font-bold text-lg mb-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                No programs found
              </p>
              <p
                className="text-[#2C3E50]/60 font-medium"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Try adjusting your search filters
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Info Banner */}
            <div className="bg-gradient-to-r from-[#FFE66D]/20 to-[#FFB88C]/20 backdrop-blur-xl border-2 border-[#FFE66D]/30 rounded-3xl p-6 mb-8 shadow-lg">
              <h3
                className="font-bold text-lg text-[#2C3E50] mb-3 flex items-center gap-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <Sparkles className="w-5 h-5 text-[#FFE66D]" />
                Understanding Eligibility Tiers
              </h3>
              <div
                className="text-sm text-[#2C3E50]/80 space-y-2"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                  <strong>Safety:</strong> Your FSC % is 10+ points above the
                  cutoff
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <strong>Target:</strong> Your FSC % is within ±10 points of
                  the cutoff
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-500 rounded-full" />
                  <strong>Reach:</strong> Your FSC % is below the cutoff but
                  above minimum
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <strong>Not Eligible:</strong> Below minimum FSC requirement
                </p>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-2 px-5 py-3 bg-white text-[#4ECDC4] font-bold rounded-2xl border-2 border-[#4ECDC4] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <span
                  className="px-6 py-3 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] text-white font-bold rounded-2xl shadow-lg"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Page {page + 1} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page >= totalPages - 1}
                  className="flex items-center gap-2 px-5 py-3 bg-white text-[#4ECDC4] font-bold rounded-2xl border-2 border-[#4ECDC4] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramSearchPage;
