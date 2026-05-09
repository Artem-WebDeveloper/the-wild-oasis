import { CabinSchema, type Cabin } from '../schemas/cabin.schema';
import type { CreateCabinFormValues, EditCabinFormValues } from '../types/cabin.types';
import supabase, { supabaseUrl } from './supabase';

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

export async function createCabin(newCabin: CreateCabinFormValues) {
  // Пример ссылки на img из хранилища файлов supabase
  // https://kaakjseyjzwmbsdptdop.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

  const imageFile = newCabin.image;
  const imageName = `${Math.random()}-${imageFile.name}`.replaceAll('/', '');
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

  // 2. Загрузка изображения
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, imageFile);
  // 3. Удалить Cabin ЕСЛИ ПРОИЗОШЛА ошибка загрузки изображения
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);
    console.error(error);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }
}

export async function editCabin(newCabin: EditCabinFormValues, id: number) {
  const { image, ...cabinData } = newCabin;

  // Проверка ФАЙЛ или строка
  let imageName = '';
  if (image instanceof File) {
    imageName = `${Math.random()}-${image.name}`.replaceAll('/', '');
  }
  const hasImagePath = typeof image === 'string' && image.startsWith(supabaseUrl);

  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { error } = await supabase
    .from('cabins')
    .update({ ...cabinData, image: imagePath })
    .eq('id', id)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be updated');
  }

  if (!(newCabin.image instanceof File)) return;

  // Загрузка изображения
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error(storageError);

    throw new Error('Cabin image could not be uploaded');
  }
}

// .............................................................................

/* export async function createEditCabin(newCabin: EditCabinFormValues, id?: number) {
  const hasImagePath = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl);
  // Пример ссылки на img из хранилища файлов supabase
  // https://kaakjseyjzwmbsdptdop.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg
  const imageName =
    newCabin.image instanceof File
      ? `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')
      : '';

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Создание и редактирование Cabin
  const query = supabase.from('cabins');
  let queryBuilder;

  // A) СОЗДАНИЕ
  if (!id) {
    queryBuilder = query.insert([{ ...newCabin, image: imagePath }]).select();
  } else {
    // B) РЕДАКТИРОВАНИЕ
    queryBuilder = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();
  }
  const { data, error } = await queryBuilder;

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2.Загрузка Изображения
  if (!hasImagePath && newCabin.image instanceof File) {
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
} */
