import { CabinSchema, type Cabin } from '../schemas/cabin.schema';
import supabase from './supabase';

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return CabinSchema.array().parse(data);
}
