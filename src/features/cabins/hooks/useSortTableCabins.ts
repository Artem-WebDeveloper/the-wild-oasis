import { useSearchParams } from 'react-router-dom';
import type { Cabin } from '../../../schemas/cabin.schema';

function sortByField<T>(arr: T[], field: keyof T, direction: 'asc' | 'desc') {
  const modifier = direction === 'asc' ? 1 : -1;
  return arr.slice().sort((a, b) => {
    if (a[field] < b[field]) return -1 * modifier;
    if (a[field] > b[field]) return 1 * modifier;
    return 0;
  });
}

function useSortTableCabins(filteredCabins: Cabin[] | undefined) {
  const [searchParams] = useSearchParams();

  if (!filteredCabins) return;

  const sortBy = searchParams.get('sortBy');

  const [field, direction] = (sortBy?.split('-') ?? []) as [keyof Cabin, 'asc' | 'desc'];
  const sortedCabins =
    filteredCabins && field ? sortByField(filteredCabins, field, direction) : filteredCabins;

  return sortedCabins;
}

export default useSortTableCabins;
