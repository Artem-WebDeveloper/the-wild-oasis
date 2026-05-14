import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import useFilterCabinTables from './useFilterCabinTables';
import useSortTableCabins from './useSortTableCabins';
import Empty from '../../ui/Empty';

function CabinTable() {
  // 1) FILTER
  const { filteredCabins, isLoading } = useFilterCabinTables();
  // 2) SORT
  const sortedCabins = useSortTableCabins(filteredCabins);

  if (isLoading) return <Spinner />;
  if (filteredCabins && !filteredCabins.length) return <Empty resourceName="cabins" />;

  if (sortedCabins)
    return (
      <Menus>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedCabins}
            render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        </Table>
      </Menus>
    );
}

export default CabinTable;
