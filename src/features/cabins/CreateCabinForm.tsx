import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import type { Cabin } from '../../schemas/cabin.schema';
import type { CabinFormValues } from './types';
import { useCreateCabin } from './hooks/useCreateCabin';
import { useUpdateCabin } from './hooks/useUpdateCabin';

type CreateCabinFormProps = {
  cabinToEdit?: Cabin | null;
  onCloseModal?: () => void;
};

function CreateCabinForm({ cabinToEdit = null, onCloseModal }: CreateCabinFormProps) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isEditing;

  const isEditSession = cabinToEdit !== null;
  const editId = cabinToEdit?.id;
  const editValues = isEditSession ? { ...cabinToEdit } : {};

  const { register, handleSubmit, reset, getValues, formState } = useForm<CabinFormValues>({
    defaultValues: editValues,
  });
  const { errors } = formState;

  function onSubmit(data: CabinFormValues) {
    const image = data.image instanceof FileList ? data.image[0] : data.image;

    if (isEditSession) {
      updateCabin(
        { data: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        },
      );
    } else {
      if (!(image instanceof File)) return;
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  /* function onError(errors: FieldErrors<CreateCabinValues>) {
    console.log(errors);
  } */

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Cabin name" htmlFor="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow htmlFor="maxCapacity" label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow htmlFor="regularPrice" label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow htmlFor="discount" label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            valueAsNumber: true,
            validate: value =>
              getValues().regularPrice >= value || 'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        htmlFor="description"
        label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" htmlFor="image">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" onClick={() => onCloseModal?.()} type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Add new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
