import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { universitiesAPI } from "../../api/universities";
import ProgramCard from "../../components/programs/ProgramCard";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { ArrowLeft, ChevronLeft, ChevronRight, Search } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/dashboard">
              <Button variant="secondary" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Program Search
            </h1>
          </div>

          {/* Filters */}
          <div className="text-gray grid md:grid-cols-1 lg:grid-cols-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Field of Study
              </label>
              <select
                value={filters.field}
                onChange={(e) => handleFilterChange("field", e.target.value)}
                className="bg-white input-field w-half border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="bg-white input-field w-half border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              >
                <option value="">All Cities</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Rawailpindi">Rawailpindi</option>
                <option value="Karachi">Karachi</option>
              </select>
            </div>

            {/* 
            <Input
              label="Min Fee (PKR)"
              type="number"
              className="bg-white w-half border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

              value={filters.min_fee}
              onChange={(e) => handleFilterChange('min_fee', e.target.value)}
              placeholder="e.g., 50000"
            />

            <Input
              label="Max Fee (PKR)"
              type="number"
              className="bg-white input-field w-half border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

              value={filters.max_fee}
              onChange={(e) => handleFilterChange('max_fee', e.target.value)}
              placeholder="e.g., 500000"
            /> */}
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sector
              </label>
              <div className="flex gap-2">
                {["Private", "Public", "Semi-Government"].map((sector) => (
                  <button
                    key={sector}
                    onClick={() => handleFilterChange("sector", sector)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.sector === sector
                        ? "bg-primary-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-auto pt-6">
              <Button variant="secondary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          {data?.metadata && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Found {data.metadata.total_count} programs
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400 mb-4">
              Failed to load programs
            </p>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
              No programs found
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <>
            {/* Info Banner */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Understanding Eligibility Tiers
              </h3>
              <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <p>
                  🟢 <strong>Safety:</strong> Your FSC % is 10+ points above the
                  cutoff
                </p>
                <p>
                  🟡 <strong>Target:</strong> Your FSC % is within ±10 points of
                  the cutoff
                </p>
                <p>
                  🟠 <strong>Reach:</strong> Your FSC % is below the cutoff but
                  above minimum
                </p>
                <p>
                  🔴 <strong>Not Eligible:</strong> Below minimum FSC
                  requirement
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
                <Button
                  variant="secondary"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <span className="text-gray-700 dark:text-gray-300">
                  Page {page + 1} of {totalPages}
                </span>

                <Button
                  variant="secondary"
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page >= totalPages - 1}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramSearchPage;
