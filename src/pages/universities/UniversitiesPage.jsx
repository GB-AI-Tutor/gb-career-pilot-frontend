import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { universitiesAPI } from '../../api/universities';
import UniversityCard from '../../components/universities/UniversityCard';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="secondary" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Universities
              </h1>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field border-1 border-white bg-white"
              >
                <option value="ranking_national">National Ranking</option>
                <option value="has_hostel">has_hostel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Order
              </label>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="input-field border-1 border-white bg-white"

              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {data?.metadata && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Showing {universities.length} of {data.metadata.total_count} universities
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
              Failed to load universities
            </p>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400">
              No universities found
            </p>
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
                <Button
                  variant="secondary"
                  onClick={() => setPage(p => Math.max(0, p - 1))}
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
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
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

export default UniversitiesPage;
