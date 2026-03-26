import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { universitiesAPI } from '../../api/universities';
import UniversityCard from '../../components/universities/UniversityCard';
import Loader from '../../components/common/Loader';
import { ArrowLeft, ChevronLeft, ChevronRight, GraduationCap, Sparkles, Filter } from 'lucide-react';

const UniversitiesPage = () => {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('ranking_national');
  const [order, setOrder] = useState('asc');
  const limit = 12;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['universities', page, sortBy, order],
    queryFn: () => universitiesAPI.getUniversities({
      limit,
      offset: page * limit,
      sort_by: sortBy,
      order,
    }),
  });

  const totalPages = data?.metadata?.total_pages || 0;
  const universities = data?.data || [];

  return (
    <div className="min-h-screen relative" style={{ background: '#FFF9F0' }}>
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="blob-float absolute -top-40 right-20 w-96 h-96 rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)', animation: 'blob-float 30s ease-in-out infinite' }} />
        <div className="blob-float absolute top-1/2 -left-20 w-80 h-80 rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(78,205,196,0.3) 0%, transparent 70%)', animationDelay: '-15s', animation: 'blob-float 30s ease-in-out infinite' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-[#FF6B6B] via-[#FFB88C] to-[#FFE66D] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#FF6B6B] font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                        style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <GraduationCap className="w-8 h-8 text-[#FF6B6B]" strokeWidth={2.5} />
                </div>
                <h1 className="text-4xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                  Universities
                </h1>
                <Sparkles className="w-6 h-6 text-white" style={{ animation: 'float 2s ease-in-out infinite 0.5s' }} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-[#FF6B6B]" />
              <h3 className="font-bold text-lg text-[#2C3E50]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Filters
              </h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2C3E50]/80 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-white border-2 border-[#FF6B6B]/20 rounded-2xl text-[#2C3E50] font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  <option value="ranking_national">National Ranking</option>
                  <option value="has_hostel">Has Hostel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2C3E50]/80 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Order
                </label>
                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="px-4 py-2.5 bg-white border-2 border-[#FF6B6B]/20 rounded-2xl text-[#2C3E50] font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            {data?.metadata && (
              <p className="text-sm text-[#2C3E50]/60 mt-4 font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Showing <span className="font-bold text-[#FF6B6B]">{universities.length}</span> of <span className="font-bold text-[#FF6B6B]">{data.metadata.total_count}</span> universities
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[#2C3E50]/60 font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>Loading universities...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md mx-auto border border-red-200">
              <p className="text-red-600 mb-4 font-semibold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Failed to load universities
              </p>
              <button onClick={() => refetch()} 
                      className="px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FFB88C] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      style={{ fontFamily: 'Outfit, sans-serif' }}>
                Try Again
              </button>
            </div>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md mx-auto border border-white/50">
              <GraduationCap className="w-16 h-16 text-[#2C3E50]/30 mx-auto mb-4" />
              <p className="text-[#2C3E50]/60 font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
                No universities found
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Universities Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {universities.map((university) => (
                <UniversityCard
                  key={university.id}
                  university={university}
                  onFavoriteToggle={() => refetch()}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-2 px-5 py-3 bg-white text-[#FF6B6B] font-bold rounded-2xl border-2 border-[#FF6B6B] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <span className="px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FFB88C] text-white font-bold rounded-2xl shadow-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Page {page + 1} of {totalPages}
                </span>

                <button
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  className="flex items-center gap-2 px-5 py-3 bg-white text-[#FF6B6B] font-bold rounded-2xl border-2 border-[#FF6B6B] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
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

export default UniversitiesPage;
