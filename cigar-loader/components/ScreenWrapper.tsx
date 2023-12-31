import * as React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = ScrollViewProps & {
  children: React.ReactNode;
  withScrollView?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function ScreenWrapper({
  children,
  withScrollView = true,
  style,
  contentContainerStyle,
  ...rest
}: Props) {
  const theme = useTheme();

  const insets = useSafeAreaInsets();
  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left+10,
      paddingRight: insets.right+10,
      paddingTop: 10,
    },
  ];

  return (
    <>
      {withScrollView ? (
        <ScrollView
          {...rest}
          contentContainerStyle={contentContainerStyle}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={[containerStyle, style,{backgroundColor:theme.colors.elevation.level1}]}
        >
          {children}
        </ScrollView>
      ) : (
        <Surface elevation={5} style={[containerStyle, style]}>{children}</Surface>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
