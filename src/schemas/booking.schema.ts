import z from 'zod';
import {
  BOOKING_SORT_DIRECTIONS,
  BOOKING_SORT_FIELDS,
  BOOKING_STATUSES,
} from '../features/bookings/types';
import { GuestSchema } from './guest.schema';
import { CabinSchema } from './cabin.schema';

export const BookingSchema = z.object({
  id: z.number(),
  cabinId: z.number().nullable(),
  guestId: z.number().nullable(),
  created_at: z.string(),
  cabinPrice: z.number().catch(0),
  extrasPrice: z.number().catch(0),
  hasBreakfast: z
    .boolean()
    .nullable()
    .transform(val => val ?? false),
  isPaid: z
    .boolean()
    .nullable()
    .transform(val => val ?? false),
  numGuests: z.number().catch(0),
  numNights: z.number().catch(0),
  observations: z
    .string()
    .nullable()
    .transform(val => val ?? ''),
  status: z.enum(BOOKING_STATUSES).catch('unconfirmed'),
  totalPrice: z.number().catch(0),
  startDate: z.string(),
  endDate: z.string(),
});

export const BookingSchemaTable = BookingSchema.pick({
  id: true,
  created_at: true,
  startDate: true,
  endDate: true,
  numNights: true,
  numGuests: true,
  status: true,
  totalPrice: true,
}).extend({
  cabins: CabinSchema.pick({ name: true }),
  guests: GuestSchema.pick({ email: true, fullName: true }),
});

export const BookingSchemaBox = BookingSchema.extend({
  cabins: CabinSchema,
  guests: GuestSchema,
});

export type Booking = z.infer<typeof BookingSchema>;
export type BookingTable = z.infer<typeof BookingSchemaTable>;
export type BookingBox = z.infer<typeof BookingSchemaBox>;

export const BookingStatusSchema = z.enum(BOOKING_STATUSES);

export const BookingSortingSchema = z.object({
  field: z.enum(BOOKING_SORT_FIELDS),
  direction: z.enum(BOOKING_SORT_DIRECTIONS),
});

export const BookingsAfterDateSchema = BookingSchema.pick({
  created_at: true,
  extrasPrice: true,
  totalPrice: true,
});

export type BookingsAfterDateType = z.infer<typeof BookingsAfterDateSchema>;

export const BookingStaysAfterDateSchema = BookingSchema.extend({
  guests: GuestSchema.pick({ fullName: true }),
});

export type BookingStaysAfterDateType = z.infer<typeof BookingStaysAfterDateSchema>;

export const BookingActivitySchema = BookingSchema.extend({
  guests: GuestSchema.pick({ fullName: true, nationality: true, countryFlag: true }),
});

export type BookingActivityType = z.infer<typeof BookingActivitySchema>;
