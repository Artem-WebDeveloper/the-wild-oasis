import { useSearchParams } from 'react-router-dom';
import Select from './Select';
import type { Option } from './types';
import type { ChangeEvent } from 'react';

function SortBy({ options }: { options: Option[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return <Select options={options} value={sortBy} type="white" onChange={handleChange} />;
}

export default SortBy;
