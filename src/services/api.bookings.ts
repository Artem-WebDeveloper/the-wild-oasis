import supabase from './supabase';
import type { BookingStatus, FilterParams, SortingParams } from '../features/bookings/types';
import {
  BookingActivitySchema,
  BookingsAfterDateSchema,
  BookingSchemaBox,
  BookingSchemaTable,
  BookingStaysAfterDateSchema,
} from '../schemas/booking.schema';
import { getToday } from '../utils/helpers';
import { PAGE_SIZE } from '../utils/constants';

type GetBookingParams = {
  filter: FilterParams | null;
  sortBy: SortingParams | null;
  page: number | null;
};

export async function getBookings({ filter, sortBy, page }: GetBookingParams) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
      { count: 'exact' },
    );

  // FILTER
  if (filter) {
    const { field, value, method } = filter;

    if (method === 'eq') query = query.eq(field, value);
    else if (method === 'lte') query = query.lte(field, value);
    else if (method === 'gte') query = query.gte(field, value);
  }

  // SORT
  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });
  }

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  const parseData = BookingSchemaTable.array().parse(data);

  return { parseData, count };
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return BookingSchemaBox.parse(data);
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISO string
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return BookingsAfterDateSchema.array().parse(data);
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return BookingStaysAfterDateSchema.array().parse(data);
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return BookingActivitySchema.array().parse(data);
}

export async function updateBooking(
  id: number,
  obj: {
    status?: BookingStatus;
    isPaid?: boolean;
    hasBreakfast?: boolean;
    extrasPrice?: number;
    totalPrice?: number;
  },
) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}

/* 

export async function getBookings({ filter, sortBy }) {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
    );

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return BookingSchemaTable.array().parse(data);
}
*/
