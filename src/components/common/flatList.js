/**
 * Created by bear on 2017/11/12.
 */

const React = require('react');
const ReactNative = require('react-native');
const {
    SectionList,
    StyleSheet,
    Text,
    View,
} = ReactNative;
const infoLog = require('infoLog');
const {
    HeaderComponent,
    FooterComponent,
    ItemComponent,
    PlainInput,
    SeparatorComponent,
    genItemData,
    pressItem,
    renderSmallSwitchOption,
    renderStackedItem,
} = require('./ListExampleShared');

const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
};

const renderSectionHeader = ({section}) => (
    <View>
        <Text style={styles.headerText}>SECTION HEADER: {section.key}</Text>
        <SeparatorComponent />
    </View>
);

const CustomSeparatorComponent = ({text}) => (
    <View>
        <SeparatorComponent />
        <Text style={styles.separatorText}>{text}</Text>
        <SeparatorComponent />
    </View>
);

export default class SectionListExample extends React.PureComponent {
    static title = '<SectionList>';
    static description = 'Performant, scrollable list of data.';

    state = {
        data: genItemData(1000),
        filterText: '',
        logViewable: false,
        virtualized: true,
    };
    render() {
        const filterRegex = new RegExp(String(this.state.filterText), 'i');
        const filter = (item) => (filterRegex.test(item.text) || filterRegex.test(item.title));
        const filteredData = this.state.data.filter(filter);
        console.log(filteredData)
        return (
            <View>
                <View style={styles.searchRow}>
                    <PlainInput
                        onChangeText={filterText => {
                            this.setState(() => ({filterText}));
                        }}
                        placeholder="Search..."
                        value={this.state.filterText}
                    />
                    <View style={styles.optionSection}>
                        {renderSmallSwitchOption(this, 'virtualized')}
                        {renderSmallSwitchOption(this, 'logViewable')}
                    </View>
                </View>
                <SeparatorComponent />
                <SectionList
                    ListHeaderComponent={HeaderComponent}
                    ListFooterComponent={FooterComponent}
                    SectionSeparatorComponent={() => <CustomSeparatorComponent text="SECTION SEPARATOR" />}
                    ItemSeparatorComponent={() => <CustomSeparatorComponent text="ITEM SEPARATOR" />}
                    enableVirtualization={this.state.virtualized}
                    onRefresh={() => alert('onRefresh: nothing to refresh :P')}
                    // onViewableItemsChanged={this._onViewableItemsChanged}
                    refreshing={false}
                    renderItem={this._renderItemComponent}
                    renderSectionHeader={renderSectionHeader}
                    sections={[
                        {renderItem: renderStackedItem, key: 's1', data: [
                            {title: 'Item In Header Section', text: 'Section s1', key: '0'},
                        ]},
                        {key: 's2', data: [
                            {noImage: true, title: 'First item', text: 'Section s2', key: '0'},
                            {noImage: true, title: 'Second item', text: 'Section s2', key: '1'},
                        ]},
                        {key: 'Filtered Items', data: filteredData},
                    ]}
                    viewabilityConfig={VIEWABILITY_CONFIG}
                />
            </View>
        );
    }
    _renderItemComponent = ({item}) => <ItemComponent item={item} onPress={this._pressItem} />;
    // This is called when items change viewability by scrolling into our out of the viewable area.
    // _onViewableItemsChanged = (info: {
    //     changed: {
    //         key, isViewable, item: {columns: }, index ?, section?
    //     }},
    // ) => {
    //     // Impressions can be logged here
    //     if (this.state.logViewable) {
    //         infoLog('onViewableItemsChanged: ', info.changed.map((v) => (
    //             {...v, item: '...', section: v.section.key}
    //         )));
    //     }
    // };
    _pressItem = (index) => {
        pressItem(this, index);
    };
}

const styles = StyleSheet.create({
    headerText: {
        padding: 4,
    },
    optionSection: {
        flexDirection: 'row',
    },
    searchRow: {
        paddingHorizontal: 10,
    },
    separatorText: {
        color: 'gray',
        alignSelf: 'center',
        padding: 4,
        fontSize: 9,
    },
});