import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleProp, StyleSheet, View, ViewProps, ViewStyle, } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import * as React from 'react';
import { Appbar, FAB, Avatar, Button, Card, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;
const LeftContent = (props: React.JSX.IntrinsicAttributes & ViewProps & React.RefAttributes<View> & { icon: IconSource; size?: number | undefined; color?: string | undefined; style?: StyleProp<ViewStyle>; theme?: ThemeProp | undefined; }) => <Avatar.Icon {...props} icon="folder" />

export default function Item() {
    const { bottom } = useSafeAreaInsets();
    const theme = useTheme();

    return (
        <>
            <Card>
                {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
                <Card.Content>
                    <Text variant="titleLarge">Humidor 1</Text>
                    <Text variant="bodyMedium">Total Capacity: 100</Text>
                </Card.Content>
                <Card.Cover source={{ uri: 's' }} style={{backgroundColor:"#543543"}} tintColor={"#647847"} />
                <Card.Actions>
                    <Button onPress={()=>{}}>Cancel</Button>
                    <Button onPress={()=>{}}>Ok</Button>
                </Card.Actions>
            </Card>

        </>
    );
};

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: 'blue',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    fab: {
        position: 'absolute',
        right: 16,
    },
});