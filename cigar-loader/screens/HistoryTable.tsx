import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { DbHistory } from '../constants';
import { UseDatabase } from '../hooks/UseDatabase';
import { checkIsHistory } from '../services/guards';

interface Sort{
  order:0|1|2 //0 for no sort 1 for ascending 2 for descending
  type:"id"
  |"cigar_id"
  |"library_id"
  |"date_used"
  |"rate"
  |"comment"
  |"self_used"
  |"total"
  |"cigar"
  |"brand"
  |"humidor"
}


export default function  HistoryTable(){
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState<Array<number>>([10, 20, 50]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState<number>(numberOfItemsPerPageList[0]);
    const [items,setItems] = React.useState<Array<DbHistory>>([]);
    const [sortedItems,setSortedItems] = React.useState<Array<DbHistory>>([]);
    const [sortBy,setSortBy]=React.useState<Sort>({order:0, type:"id"})


    const sort_by=()=>{

    }
    
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    
    const databae=UseDatabase()

    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);



    React.useEffect(()=>{
      databae.select_from_table("History").then((e)=>{
        if (checkIsHistory(e)){
          setItems(e)
          setSortedItems(e)
          // const sort=e.sort((a,b)=>Number(a.date_used)-Number(b.date_used))
          // setSortedItems(sort)
        }
      })
    },[])
  
    return (
        <View>
            <DataTable.Header>
          <DataTable.Title onPress={()=>{}} >Cigar</DataTable.Title>
          <DataTable.Title >Brand</DataTable.Title>
          <DataTable.Title >Date</DataTable.Title>
          <DataTable.Title >Rating</DataTable.Title>
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
        style={{ borderWidth:2}}
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