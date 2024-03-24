import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { DbHistory } from '../constants';
import { UseDatabase } from '../hooks/UseDatabase';
import { checkIsHistory } from '../services/guards';

interface Sort {
  order: 0 | 1 | 2 //0 for no sort 1 for ascending 2 for descending
  type: "id"
  | "cigar_id"
  | "library_id"
  | "date_used"
  | "rate"
  | "comment"
  | "self_used"
  | "total"
  | "cigar"
  | "brand"
  | "humidor"
}


export default function HistoryTable() {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState<Array<number>>([10, 20, 50]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState<number>(numberOfItemsPerPageList[0]);
  const [items, setItems] = React.useState<Array<DbHistory>>([]);
  const [sortedItems, setSortedItems] = React.useState<Array<DbHistory>>([]);
  const [sortBy, setSortBy] = React.useState<Sort>({ order: 0, type: "id" })


  const sort_by = (sorting: Sort) => {

    var temp: DbHistory[] = sortedItems
    switch (sorting.type) {
      case 'date_used':
        if (sorting.order == 1) {
          temp = temp.sort((a, b) => { return parseInt(a.date_used) - parseInt(b.date_used) })
          setSortedItems(temp)
        } else if (sorting.order == 2) {
          temp = temp.sort((a, b) => { return parseInt(b.date_used) - parseInt(a.date_used) })
          setSortedItems(temp)
        }
        else {
          setSortedItems(items)
        }
      case 'rate':
        if (sorting.order == 1) {
          temp = temp.sort((a, b) => { return parseInt(a.rate) - parseInt(b.rate) })
          setSortedItems(temp)
        } else if (sorting.order == 2) {
          temp = temp.sort((a, b) => { return parseInt(b.rate) - parseInt(a.rate) })
          setSortedItems(temp)
        }
        else {
          setSortedItems(items)
        }
      case 'cigar':
        if (sorting.order == 1) {
          temp = temp.slice().sort((a, b) => a.cigar.localeCompare(b.cigar));

          // temp=temp.sort((a,b)=>{return parseInt(a.rate)-parseInt(b.rate)})
          setSortedItems(temp)
        } else if (sorting.order == 2) {
          temp = temp.slice().sort((a, b) => b.cigar.localeCompare(a.cigar));
          setSortedItems(temp)
        }
        else {
          setSortedItems(items)
        }
      case 'brand':
        if (sorting.order == 1) {
          temp = temp.slice().sort((a, b) => a.brand.localeCompare(b.brand));

          // temp=temp.sort((a,b)=>{return parseInt(a.rate)-parseInt(b.rate)})
          setSortedItems(temp)
        } else if (sorting.order == 2) {
          temp = temp.slice().sort((a, b) => b.brand.localeCompare(a.brand));
          setSortedItems(temp)
        }
        else {
          setSortedItems(items)
        }
    }
    setSortBy(sorting)
    console.log(sorting)
  }

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);


  const databae = UseDatabase()

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);



  React.useEffect(() => {
    databae.select_from_table("History").then((e) => {
      if (checkIsHistory(e)) {
        setItems(e)
        setSortedItems(e)
        // const sort=e.sort((a,b)=>Number(a.date_used)-Number(b.date_used))
        // setSortedItems(sort)
      }
    })
  }, [])

  return (
    <View>
      <DataTable.Header>
        
        <DataTable.Title
          onPressIn={
            () => {
              sortBy.type == "cigar" ? sort_by({ order: sortBy.order == 0 ? 1 : sortBy.order == 1 ? 2 : 0, type: "cigar" }) : sort_by({ order: 1, type: "cigar" })
            }}
          sortDirection={sortBy.type == "cigar" ? sortBy.order == 1 ? "ascending" : sortBy.order == 2 ? "descending" : undefined : undefined} onPress={() => { }} >Cigar</DataTable.Title>
        <DataTable.Title
          onPressIn={
            () => {
              sortBy.type == "brand" ? sort_by({ order: sortBy.order == 0 ? 1 : sortBy.order == 1 ? 2 : 0, type: "brand" }) : sort_by({ order: 1, type: "brand" })
            }}
          sortDirection={sortBy.type == "brand" ? sortBy.order == 1 ? "ascending" : sortBy.order == 2 ? "descending" : undefined : undefined}>Brand</DataTable.Title>
        <DataTable.Title
          onPressIn={
            () => {
              sortBy.type == "date_used" ? sort_by({ order: sortBy.order == 0 ? 1 : sortBy.order == 1 ? 2 : 0, type: "date_used" }) : sort_by({ order: 1, type: "date_used" })
            }}
          sortDirection={sortBy.type == "date_used" ? sortBy.order == 1 ? "ascending" : sortBy.order == 2 ? "descending" : undefined : undefined}>Date</DataTable.Title>
        <DataTable.Title
          onPressIn={
            () => {
              sortBy.type == "rate" ? sort_by({ order: sortBy.order == 0 ? 1 : sortBy.order == 1 ? 2 : 0, type: "rate" }) : sort_by({ order: 1, type: "rate" })
            }}
          sortDirection={sortBy.type == "rate" ? sortBy.order == 1 ? "ascending" : sortBy.order == 2 ? "descending" : undefined : undefined}>Rating</DataTable.Title>
      </DataTable.Header>
      <ScrollView>
        <View>

          <DataTable>


            {sortedItems.slice(from, to).map((item, key) => (
              <DataTable.Row key={key}>
                <DataTable.Cell>{item.cigar}</DataTable.Cell>
                <DataTable.Cell >{item.date_used}</DataTable.Cell>
                <DataTable.Cell >{item.total}</DataTable.Cell>
                <DataTable.Cell >{item.rate}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />
          </DataTable>
        </View>
      </ScrollView>
    </View>
  );

}