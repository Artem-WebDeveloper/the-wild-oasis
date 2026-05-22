import { useSearchParams } from 'react-router-dom';
import { useCabins } from './useCabins';

function useFilterCabinTables() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all';

  const filters: Record<string, typeof cabins> = {
    all: cabins,
    'no-discount': cabins?.filter(cabin => cabin.discount === 0),
    'with-discount': cabins?.filter(cabin => cabin.discount > 0),
  };

  const filteredCabins = filters[filterValue] ?? cabins;

  /* let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;

  if (filterValue === 'no-discount') {
    filteredCabins = cabins?.filter(cabin => cabin.discount === 0);
  }
  if (filterValue === 'with-discount') {
    filteredCabins = cabins?.filter(cabin => cabin.discount > 0);
  } */

  return { filteredCabins, isLoading };
}

export default useFilterCabinTables;
