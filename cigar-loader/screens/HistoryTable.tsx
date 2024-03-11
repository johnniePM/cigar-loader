import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';

export default function  HistoryTable(){
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([5, 10, 20]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[0]
    );
  
    const [items] = React.useState([
        {
            name: 'Cupcake',
            calories: 356,
            fat: 16,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16,
          },
          {
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
          },
          {
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
          },     {
            name: 'Cupcake',
            calories: 356,
            fat: 16,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16,
          },
          {
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
          },
          {
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
          },     {
            name: 'Cupcake',
            calories: 356,
            fat: 16,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16,
          },
          {
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
          },
          {
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
          },     {
            name: 'Cupcake',
            calories: 356,
            fat: 16,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16,
          },
          {
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
          },
          {
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
          },     {
            name: 'Cupcake',
            calories: 356,
            fat: 16,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16,
          },
          {
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
          },
          {
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
          },     {
            name: 'Cupcake',
            calories: 356,
            fat: 16,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16,
          },
          {
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
          },
          {
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
          },     {
            name: 'Cupcake',
            calories: 356,
            fat: 16,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16,
          },
          {
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
          },
          {
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
          },
    ]);
  
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);
  
    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);
  
    return (
        <View>
            <DataTable.Header>
          <DataTable.Title  >Cigar</DataTable.Title>
          <DataTable.Title >Brand</DataTable.Title>
          <DataTable.Title >Date</DataTable.Title>
          <DataTable.Title >Rating</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
            <View>
  
      <DataTable>
        

        {items.slice(from, to).map((item, key) => (
          <DataTable.Row key={key}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell >{item.calories}</DataTable.Cell>
            <DataTable.Cell >{item.fat}</DataTable.Cell>
            <DataTable.Cell >{item.fat}</DataTable.Cell>
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