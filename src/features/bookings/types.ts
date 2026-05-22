export const statusToTagName = {
  unconfirmed: 'blue',
  'checked-in': 'green',
  'checked-out': 'silver',
} as const;

export const BOOKING_STATUSES = ['checked-out', 'checked-in', 'unconfirmed'] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export type FilterMethod = 'eq' | 'lte' | 'gte';

export type FilterParams = {
  field: 'status';
  value: BookingStatus;
  method: FilterMethod;
} | null;

export const BOOKING_SORT_FIELDS = ['startDate', 'totalPrice'] as const;
export const BOOKING_SORT_DIRECTIONS = ['asc', 'desc'] as const;

export type SortingParams = {
  field: (typeof BOOKING_SORT_FIELDS)[number];
  direction: (typeof BOOKING_SORT_DIRECTIONS)[number];
};
