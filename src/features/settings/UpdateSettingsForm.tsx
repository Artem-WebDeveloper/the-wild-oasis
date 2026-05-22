import type { Settings } from '../../schemas/settings.schema';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

type SettingField = keyof Omit<Settings, 'id' | 'created_at'>;

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {},
    // settings,
  } = useSettings();

  /*  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } =
    settings || {}; */

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e: React.FocusEvent<HTMLInputElement, Element>, field: SettingField) {
    const value = Number(e.target.value);

    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={e => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
