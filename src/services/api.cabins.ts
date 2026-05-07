import { CabinSchema, type Cabin } from '../schemas/cabin.schema';
import supabase, { supabaseUrl } from './supabase';

export type CabinFormValues = {
  description: string;
  discount: number;
  maxCapacity: number;
  name: string;
  regularPrice: number;
  image: FileList;
};

export type CreateCabinValues = Omit<CabinFormValues, 'image'> & {
  image: File;
};

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return CabinSchema.array().parse(data);
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}

export async function createCabin(newCabin: CreateCabinValues) {
  // Пример ссылки на img из хранилища файлов supabase
  // https://kaakjseyjzwmbsdptdop.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Создание Cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2.Загрузка Изображения
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Удалить Cabin ЕСЛИ ПРОИЗОШЛА ошибка загрузки изображения
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);
    console.error(error);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }
}
