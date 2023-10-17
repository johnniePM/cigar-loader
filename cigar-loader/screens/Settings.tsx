import { List, RadioButton, Switch, Text, TouchableRipple, useTheme } from "react-native-paper"
import ScreenWrapper from "../components/ScreenWrapper"
import { useSettings } from "../hooks/UseSettings"
import { StyleSheet, TextComponent, View } from "react-native"
export default function Settings() {
    const theme = useTheme()
    const settings = useSettings()
    return (
        <ScreenWrapper>
            <Text variant="headlineSmall" style={{ paddingHorizontal: 16 }}>Home</Text>
            <List.Section title="Select the action of the add button">
                <RadioButton.Group
                    value={settings.QuickAdd}
                    onValueChange={(value: string) => settings.handleQuickAdd(value as "Smoked Cigar" | "Add Cigar" | "Add Humidor")}
                >
                    <View style={styles.row}>
                        <Text >Press to add a smoked cigar</Text >
                        <RadioButton value="Smoked Cigar" />
                    </View>
                    <View style={styles.row}>
                        <Text >Press to add a new cigar</Text >
                        <RadioButton.Android value="Add Cigar" />
                    </View>
                    <View style={styles.row}>
                        <Text >Press to add a new humidor</Text >
                        <RadioButton.Android value="Add Humidor" />
                    </View>
                </RadioButton.Group>
            </List.Section>
            <List.Section title="System coloring">
                <RadioButton.Group
                    value={settings.Mode}
                    onValueChange={(value: string) => settings.handleMode(value as "Light" | "Dark" | "System")}
                >
                    <View style={styles.row}>
                        <Text >Let the system decide</Text >
                        <RadioButton.Android value="System" />
                    </View>
                    <View style={styles.row}>
                        <Text >Use light mode</Text >
                        <RadioButton value="Light" />
                    </View>
                    <View style={styles.row}>
                        <Text >Use dark mode</Text >
                        <RadioButton.Android value="Dark" />
                    </View>
                </RadioButton.Group>
            </List.Section>
            <List.Section title="Show/hide statistics">
                <List.Accordion
                    title="Statistics Settings"
                    description="Customize shown statistics in the home screen"
                >
                    <TouchableRipple onPress={() => settings.handleShowQuickStats(!settings.ShowQuickStats)}>
                        <View style={styles.row}>
                            <Text>Show quick statistics on home screen</Text>
                            <View pointerEvents="none">
                                <Switch value={settings.ShowQuickStats} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple disabled={!settings.ShowQuickStats} onPress={() => settings.handleLastAdded(!settings.LastAdded)}>
                        <View style={styles.row}>
                            <Text>Show last added cigar shortcut</Text>
                            <View pointerEvents="none">
                                <Switch disabled={!settings.ShowQuickStats} value={settings.LastAdded} />
                            </View>
                        </View>
                    </TouchableRipple>

                    <TouchableRipple disabled={!settings.ShowQuickStats} onPress={() => settings.handleLastSmoked(!settings.LastSmoked)}>
                        <View style={styles.row}>
                            <Text>Show last smoked cigar shortcut</Text>
                            <View pointerEvents="none">
                                <Switch disabled={!settings.ShowQuickStats} value={settings.LastSmoked} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple disabled={!settings.ShowQuickStats} onPress={() => settings.handleMostCigarBrand(!settings.MostCigarBrand)}>
                        <View style={styles.row}>
                            <Text>Show most owned cigar brand shortcut</Text>
                            <View pointerEvents="none">
                                <Switch disabled={!settings.ShowQuickStats} value={settings.MostCigarBrand} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple disabled={!settings.ShowQuickStats} onPress={() => settings.handleMostCigarName(!settings.MostCigarName)}>
                        <View style={styles.row}>
                            <Text>Show most owned cigar name shortcut</Text>
                            <View pointerEvents="none">
                                <Switch disabled={!settings.ShowQuickStats} value={settings.MostCigarName} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple disabled={!settings.ShowQuickStats} onPress={() => settings.handleSmokedY(!settings.SmokedY)}>
                        <View style={styles.row}>
                            <Text>Show cigars smoked in a year shortcut</Text>
                            <View pointerEvents="none">
                                <Switch disabled={!settings.ShowQuickStats} value={settings.SmokedY} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple disabled={!settings.ShowQuickStats} onPress={() => settings.handleSmokedM(!settings.SmokedM)}>
                        <View style={styles.row}>
                            <Text>Show cigars smoked in a month shortcut</Text>
                            <View pointerEvents="none">
                                <Switch disabled={!settings.ShowQuickStats} value={settings.SmokedM} />
                            </View>
                        </View>
                    </TouchableRipple>

                    <TouchableRipple disabled={!settings.ShowQuickStats} onPress={() => settings.handleSmokedW(!settings.SmokedW)}>
                        <View style={styles.row}>
                            <Text>Show cigars smoked in a week shortcut</Text>
                            <View pointerEvents="none">
                                <Switch disabled={!settings.ShowQuickStats} value={settings.SmokedW} />
                            </View>
                        </View>
                    </TouchableRipple>
                </List.Accordion>
            </List.Section>

        </ScreenWrapper>
    )

}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
});

