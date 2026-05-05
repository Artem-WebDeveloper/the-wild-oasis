import z from 'zod';

export const GuestSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  fullName: z
    .string()
    .nullable()
    .transform(val => val ?? 'Unknown Name'),
  email: z
    .string()
    .nullable()
    .transform(val => val ?? 'Unknown Email'),
  nationalID: z
    .string()
    .nullable()
    .transform(val => val ?? 'Unknown nationalID'),
  nationality: z
    .string()
    .nullable()
    .transform(val => val ?? 'Unknown nationality'),
  countryFlag: z.string().nullable(),
});

export type Guest = z.infer<typeof GuestSchema>;
