import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HistoryCigar from '../screens/HistoryCigar';
import HistoryTable from '../screens/HistoryTable';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';


export type CustomBaseRoute = {
  key: string;
  title?: string;
  focusedIcon?: IconSource;
  unfocusedIcon?: IconSource;
  badge?: string | number | boolean;
  color?: string;
  accessibilityLabel?: string;
  testID?: string;
  lazy?: boolean;
};


const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Array<CustomBaseRoute>>([
    { key: 'HistoryByList', title: 'History Table', focusedIcon: 'view-list', unfocusedIcon: 'view-list-outline'},
    { key: 'HistoryByCigar', title: 'History Cigars', focusedIcon: 'cigar' },

  ]);

  const renderScene = BottomNavigation.SceneMap({
    HistoryByList: HistoryTable,
    HistoryByCigar: HistoryCigar,

  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;