import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useUser from './useUser';
import Spinner from '../../ui/Spinner';
import useUpdateUser from './useUpdateUser';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user, isLoading, error } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(user?.user_metadata?.fullName ?? '');
  const [avatar, setAvatar] = useState<null | File>(null);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error! ${error.message}</p>;
  if (!user) return null;

  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user;

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!fullName) return;
    updateUser({ fullName, avatar });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={e => setAvatar(e.target?.files?.[0] ?? null)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
