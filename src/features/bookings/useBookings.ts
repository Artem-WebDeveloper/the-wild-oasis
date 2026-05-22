import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/api.bookings';
import { useSearchParams } from 'react-router-dom';
import { BookingSortingSchema, BookingStatusSchema } from '../../schemas/booking.schema';
import type { FilterParams } from './types';
import { PAGE_SIZE } from '../../utils/constants';

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1. Filter
  const filterValue = searchParams.get('status');
  const validFilterValue = BookingStatusSchema.safeParse(filterValue);
  const filter: FilterParams = validFilterValue.success
    ? { field: 'status', value: validFilterValue.data, method: 'eq' }
    : null;

  // 2. Sort
  const sortByRaw = searchParams.get('sortBy');
  const sortBy = parseSortBy(sortByRaw);

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = data?.parseData;
  const count = data?.count ?? null;

  // PRE-FETCHING
  const pageCount = Math.ceil(Number(count) / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  return { bookings, isLoading, error, count };
}

export default useBookings;

function parseSortBy(sortRaw: string | null) {
  if (!sortRaw) return null;

  const [field, direction] = sortRaw.split('-');

  const result = BookingSortingSchema.safeParse({
    field,
    direction,
  });

  return result.success ? result.data : null;
}
