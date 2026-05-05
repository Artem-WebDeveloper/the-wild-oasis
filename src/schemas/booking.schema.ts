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
  status: z
    .string()
    .nullable()
    .transform(val => val ?? ''),
  totalPrice: z.number().catch(0),
  endDate: z.string().nullable(),
  startDate: z.string().nullable(),
});

export type Booking = z.infer<typeof BookingSchema>;
