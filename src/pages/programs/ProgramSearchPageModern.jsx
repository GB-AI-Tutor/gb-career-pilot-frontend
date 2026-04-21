import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { universitiesAPI } from "../../api/universities";
import Loader from "../../components/common/Loader";
import ProgramCard from "../../components/programs/ProgramCard";

import { Search, Filter, Target, BookOpen } from "lucide-react";
import "../../styles/design-system.css";

const ProgramsPageModern = () => {
  const [searchParams] = useSearchParams();
  const universityId = searchParams.get("university");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [selectedField, setSelectedField] = useState("all");

  const [filters, setFilters] = useState({
    field: "",
    city: "",
    min_fee: "",
    max_fee: "",
    sector: "Private",
  });
  const [page, setPage] = useState(0);
  const limit = 12;

  // Fetch programs from backend
  const { data, isLoading, error } = useQuery({
    queryKey: ["programs", filters, page, universityId],
    queryFn: () =>
      universitiesAPI.searchPrograms({
        ...filters,
        field: filters.field || null,
        city: filters.city || null,
        min_fee: filters.min_fee ? parseInt(filters.min_fee) : null,
        max_fee: filters.max_fee ? parseInt(filters.max_fee) : null,
        sector: filters.sector || null,
        university_id: universityId ? parseInt(universityId) : null,
        limit,
        offset: page * limit,
      }),
  });

  const totalPages = data?.metadata?.total_pages || 0;
  const programs = data?.data || [];
  const totalProgramsCount = data?.metadata?.total_count ?? programs.length;

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const visiblePrograms = programs.filter((program) => {
    const searchSource = [
      program?.name,
      program?.field_of_study,
      program?.field,
      program?.subject,
      program?.university_name,
      program?.university?.name,
      program?.universities?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedSearchTerm.length === 0 ||
      searchSource.includes(normalizedSearchTerm);

    const degreeSource = [
      program?.degree_type,
      program?.degree,
      program?.program_type,
      program?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesDegree =
      selectedDegree === "all" ||
      degreeSource.includes(selectedDegree.toLowerCase());

    const fieldSource = [
      program?.field_of_study,
      program?.field,
      program?.subject,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesField =
      selectedField === "all" ||
      fieldSource.includes(selectedField.toLowerCase());

    return matchesSearch && matchesDegree && matchesField;
  });

  const degreeFilters = [
    { id: "all", label: "All Degrees" },
    { id: "BS", label: "Bachelor (BS)" },
    { id: "MS", label: "Master (MS)" },
    { id: "PhD", label: "PhD" },
  ];

  const fieldFilters = [
    { id: "all", label: "All Fields" },
    { id: "Computer Science", label: "Computer Science" },
    { id: "Engineering", label: "Engineering" },
    { id: "Business", label: "Business" },
    { id: "Medical", label: "Medical" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-red-600" />
          </div>
          <p className="text-heading-md text-red-600 mb-4">
            Unable to Load Programs
          </p>
          <p className="text-body-md text-neutral-600 mb-6">
            {error.message ||
              "There was a problem connecting to the server. Please check your connection and try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft mb-6">
              <BookOpen className="w-4 h-4 text-primary-600" />
              <span className="text-body-sm font-semibold text-primary-700">
                {totalProgramsCount.toLocaleString()} Programs Available
              </span>
            </div>
            <h1 className="text-display-lg text-primary-900 mb-4">
              Find Your Perfect Program
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Search programs with personalized eligibility matching based on
              your FSC marks
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="card-float p-2 bg-white">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search programs by name, field, or university..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-primary-500 focus:outline-none text-body-md"
                  />
                </div>
                <button className="btn-secondary px-6 py-3 flex-shrink-0">
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                  Degree Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {degreeFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedDegree(filter.id)}
                      className={`px-4 py-2 rounded-full text-body-sm font-semibold transition-all ${
                        selectedDegree === filter.id
                          ? "bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lifted"
                          : "bg-white text-neutral-700 border-2 border-neutral-200 hover:border-primary-300"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                  Field of Study
                </label>
                <div className="flex flex-wrap gap-2">
                  {fieldFilters.slice(0, 4).map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setSelectedField(filter.id);
                        setFilters((prev) => ({
                          ...prev,
                          field: filter.id === "all" ? "" : filter.id,
                        }));
                        setPage(0);
                      }}
                      className={`px-4 py-2 rounded-full text-body-sm font-semibold transition-all ${
                        selectedField === filter.id
                          ? "bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lifted"
                          : "bg-white text-neutral-700 border-2 border-neutral-200 hover:border-primary-300"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-heading-lg text-primary-900 mb-2">
                {visiblePrograms.length} Programs Found
              </h2>
              <p className="text-body-md text-neutral-600">
                Sorted by best match for your profile
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-body-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-success-500"></div>
                  <span>Safety</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  <span>Target</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-accent-500"></div>
                  <span>Reach</span>
                </div>
              </div>
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {visiblePrograms.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-heading-md text-neutral-600 mb-2">
                  No programs found
                </p>
                <p className="text-body-md text-neutral-500">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              visiblePrograms.map((program) => (
                <ProgramCard
                  key={program.program_id || program.id}
                  program={program}
                />
              ))
            )}
          </div>

          {/* Load More */}
          {totalPages > page + 1 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setPage(page + 1)}
                className="btn-secondary"
              >
                Load More Programs
              </button>
              <p className="text-body-sm text-neutral-500 mt-2">
                Page {page + 1} of {totalPages}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-grid opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Target className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-display-md text-white mb-4">
            Not Sure Which Program to Choose?
          </h2>
          <p className="text-body-lg text-primary-100 mb-8">
            Get personalized program recommendations from our AI counselor
          </p>
          <Link to="/chat">
            <button className="btn-accent">
              <BookOpen className="w-5 h-5" />
              Get Program Recommendations
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPageModern;
