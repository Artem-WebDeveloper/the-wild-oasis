import z from 'zod';

export const SettingsSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  breakfastPrice: z.number().catch(0),
  maxBookingLength: z.number().catch(0),
  maxGuestsPerBooking: z.number().catch(0),
  minBookingLength: z.number().catch(0),
});

export type Settings = z.infer<typeof SettingsSchema>;
