import { z } from 'zod';

export const CabinSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  image: z.string().nullable(),
  description: z
    .string()
    .nullable()
    .transform(val => val ?? 'No description'),
  discount: z.number().catch(0),
  maxCapacity: z.number().catch(0),
  name: z
    .string()
    .nullable()
    .transform(val => val ?? 'No name'),
  regularPrice: z.number().catch(0),
});

export type Cabin = z.infer<typeof CabinSchema>;
