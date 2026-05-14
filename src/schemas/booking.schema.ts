import z from 'zod';

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
  status: z.enum(['unconfirmed', 'checked-in', 'checked-out']).catch('unconfirmed'),
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
  cabins: z.object({ name: z.string() }),
  guests: z.object({ email: z.string(), fullName: z.string() }),
});

export const BookingSchemaBox = BookingSchema.extend({
  cabins: z.object({ name: z.string() }),
  guests: z.object({
    email: z.string(),
    fullName: z.string(),
    country: z.string(),
    countryFlag: z.string(),
    nationalID: z.string(),
  }),
});

export type Booking = z.infer<typeof BookingSchema>;
export type BookingTable = z.infer<typeof BookingSchemaTable>;
export type BookingBox = z.infer<typeof BookingSchemaBox>;
