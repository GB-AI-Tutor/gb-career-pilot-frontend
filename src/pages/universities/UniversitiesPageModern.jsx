import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { universitiesAPI } from "../../api/universities";
import Loader from "../../components/common/Loader";
import {
  School,
  MapPin,
  Award,
  Search,
  Filter,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  Star,
  Building2,
} from "lucide-react";
import "../../styles/design-system.css";

const UniversitiesPageModern = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("ranking_national");
  const [order, setOrder] = useState("asc");
  const limit = 12;

  // Fetch universities from backend
  const { data, isLoading, error } = useQuery({
    queryKey: ["universities", page, sortBy, order],
    queryFn: () =>
      universitiesAPI.getUniversities({
        limit,
        offset: page * limit,
        sort_by: sortBy,
        order,
      }),
  });

  const totalPages = data?.metadata?.total_pages || 0;
  const universities = data?.data || [];

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const cityOptions = [
    "all",
    ...new Set(universities.map((u) => u.city).filter(Boolean)),
  ];

  const universitiesBySearchAndCity = universities.filter((u) => {
    const matchesCity = selectedCity === "all" || u.city === selectedCity;
    const searchableContent = [u.name, u.city, u.sector]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      searchableContent.includes(normalizedSearch);

    return matchesCity && matchesSearch;
  });

  const filteredUniversities = universitiesBySearchAndCity.filter((u) => {
    if (selectedType === "all") {
      return true;
    }

    return u.sector?.toLowerCase() === selectedType;
  });

  const filterTypes = [
    {
      id: "all",
      label: "All Universities",
      count: universitiesBySearchAndCity.length,
    },
    {
      id: "public",
      label: "Public",
      count: universitiesBySearchAndCity.filter((u) => u.sector === "Public")
        .length,
    },
    {
      id: "private",
      label: "Private",
      count: universitiesBySearchAndCity.filter((u) => u.sector === "Private")
        .length,
    },
  ];

  const sortOptions = [
    { value: "ranking_national:asc", label: "Sort by: Best Match" },
    { value: "ranking_qs:asc", label: "Sort by: Rating" },
    { value: "estimated_total_fee:asc", label: "Sort by: Fees (Low to High)" },
    { value: "estimated_total_fee:desc", label: "Sort by: Fees (High to Low)" },
  ];

  const normalizeWebsiteUrl = (website) => {
    if (!website) {
      return "";
    }

    if (/^https?:\/\//i.test(website)) {
      return website;
    }

    return `https://${website}`;
  };

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
            <School className="w-10 h-10 text-red-600" />
          </div>
          <p className="text-heading-md text-red-600 mb-4">
            Unable to Load Universities
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
              <School className="w-4 h-4 text-primary-600" />
              <span className="text-body-sm font-semibold text-primary-700">
                10+ Top Universities
              </span>
            </div>
            <h1 className="text-display-lg text-primary-900 mb-4">
              Explore Universities
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Discover and compare Pakistan's leading universities. Find your
              perfect match.
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
                    placeholder="Search universities by name, city, or program..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-primary-500 focus:outline-none text-body-md"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary px-6 py-3 flex-shrink-0"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-3 mt-6">
              {filterTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-full text-body-sm font-semibold transition-all ${
                    selectedType === type.id
                      ? "bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lifted"
                      : "bg-white text-neutral-700 border-2 border-neutral-200 hover:border-primary-300"
                  }`}
                >
                  {type.label}
                  <span className="ml-2 text-xs opacity-75">
                    ({type.count})
                  </span>
                </button>
              ))}
            </div>

            {showFilters && (
              <div className="mt-6 card-float bg-white">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <label className="text-body-sm font-semibold text-neutral-700">
                      City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="px-4 py-2 rounded-lg border-2 border-neutral-200 focus:border-primary-500 focus:outline-none text-body-sm"
                    >
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>
                          {city === "all" ? "All Cities" : city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedType("all");
                      setSelectedCity("all");
                    }}
                    className="btn-secondary"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-heading-lg text-primary-900 mb-2">
                {filteredUniversities.length} Universities Found
              </h2>
              <p className="text-body-md text-neutral-600">
                Based on your preferences and FSC marks
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={`${sortBy}:${order}`}
                onChange={(e) => {
                  const [nextSortBy, nextOrder] = e.target.value.split(":");
                  setSortBy(nextSortBy);
                  setOrder(nextOrder);
                  setPage(0);
                }}
                className="px-4 py-2 rounded-lg border-2 border-neutral-200 focus:border-primary-500 focus:outline-none text-body-sm"
              >
                {sortOptions.map((option) => (
                  <option
                    key={`${option.value}-${option.label}`}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Universities Grid */}
          <div className="bg-blue-100 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUniversities.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <School className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-heading-md text-neutral-600 mb-2">
                  No universities found
                </p>
                <p className="text-body-md text-neutral-500">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              filteredUniversities.map((uni, index) => (
                <div
                  key={uni.university_id || uni.id}
                  className="card-feature group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Featured Badge */}
                  {uni.ranking_national <= 5 && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold shadow-soft z-10">
                      <Star className="w-3 h-3 inline mr-1" />
                      Featured
                    </div>
                  )}

                  {/* University Logo */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-soft overflow-hidden mx-auto border-2 border-neutral-100 flex items-center justify-center">
                      {uni.logo_url ? (
                        <img
                          src={uni.logo_url}
                          alt={uni.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <School className="w-10 h-10 text-primary-400" />
                      )}
                    </div>
                    {/* Ranking Badge */}
                    {uni.ranking_national && (
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 text-white text-xs font-bold shadow-lifted">
                        #{uni.ranking_national} National
                      </div>
                    )}
                  </div>

                  {/* University Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-heading-sm text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {uni.name}
                    </h3>
                    <div className="flex items-center justify-center gap-4 text-body-sm text-neutral-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {uni.sector}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {uni.city}
                      </div>
                    </div>
                    {uni.ranking_qs && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
                        <Award className="w-3 h-3" />
                        QS #{uni.ranking_qs}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-primary-50 rounded-xl">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Award className="w-4 h-4 text-primary-600" />
                        <span className="text-body-md font-bold text-primary-900">
                          {uni.ranking_national || "N/A"}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">National Rank</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Building2 className="w-4 h-4 text-primary-600" />
                        <span className="text-body-md font-bold text-primary-900">
                          {uni.sector}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">Type</p>
                    </div>
                  </div>

                  {/* Website */}
                  {uni.website && (
                    <div className="flex items-center justify-center gap-2 mb-6 text-body-sm text-neutral-600">
                      <a
                        href={normalizeWebsiteUrl(uni.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 hover:underline cursor-pointer pointer-events-auto"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      to={`/programs?university=${uni.university_id || uni.id}`}
                      className="flex-1"
                    >
                      <button className="btn-primary w-full group">
                        View Programs
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                    <button className="w-12 h-12 rounded-xl border-2 border-primary-200 hover:border-primary-500 hover:bg-primary-50 flex items-center justify-center transition-all">
                      <CheckCircle2 className="w-5 h-5 text-primary-600" />
                    </button>
                  </div>
                </div>
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
                Load More Universities
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
          <GraduationCap className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-display-md text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-body-lg text-primary-100 mb-8">
            Chat with our AI counselor for personalized university
            recommendations
          </p>
          <Link to="/chat">
            <button className="btn-accent">
              <School className="w-5 h-5" />
              Get AI Recommendations
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UniversitiesPageModern;
