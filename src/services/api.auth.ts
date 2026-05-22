import supabase, { supabaseUrl } from './supabase';

type SingupParams = {
  fullName: string;
  email: string;
  password: string;
};

export async function signup({ fullName, email, password }: SingupParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw Error(error.message);
}

type updataCurUserParams = {
  fullName?: string;
  password?: string;
  avatar?: File | null;
};

export async function updateCurrentUser({ password, fullName, avatar }: updataCurUserParams) {
  // 1. Обновляем ПАРОЛЬ ИЛИ FULLNAME
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  if (!updateData) return;
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Загружаем изображение аватара
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Обновить ссылку на аватар в user_metadata
  const { data: updatedUser, error: updatedError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (updatedError) {
    // Удаляем img если проблема, откат
    await supabase.storage.from('avatars').remove([fileName]);
    throw new Error(updatedError.message);
  }

  return updatedUser;
}
