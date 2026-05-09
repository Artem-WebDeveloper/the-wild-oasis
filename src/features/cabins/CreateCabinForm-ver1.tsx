import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin, type CabinFormValues } from '../../services/api.cabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm<CabinFormValues>();
  const { errors } = formState;

  console.log(errors);

  const queryClient = useQueryClient();
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: error => toast.error(error.message),
  });

  function onSubmit(data: CabinFormValues) {
    mutate({ ...data, image: data.image[0] });
  }

  /* function onError(errors: FieldErrors<CreateCabinValues>) {
    console.log(errors);
  } */

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" htmlFor="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow htmlFor="maxCapacity" label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" htmlFor="image">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
