/*
* For more details read: https://facebook.github.io/react-native/docs/listviewdatasource.html
* To update the data in the datasource, use cloneWithRows (or cloneWithRowsAndSections
* if you care about sections).
* The data in the data source is immutable, so you can't modify it directly.
* */

import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    Image
} from "react-native";

export default class OwnListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            isLoading: true,
            isLoadingMore: false,
            _data: [],
            _dataAfter: ""
        };
    }

    componentDidMount() {
        //Start getting the first batch of data from reddit
        this.fetchData(responseJson => {
            let ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            const data = responseJson.data.children;
            this.setState({
                dataSource: ds.cloneWithRows(data),
                isLoading: false,
            });
        });
    }

    fetchData = (callback) => {
        const params = this.state._dataAfter !== ""
            ? `?after=${this.state._dataAfter}`
            : "";
        fetch(`https://www.reddit.com/subreddits/popular/.json${params}`)
            .then(response => response.json())
            .then(callback)
            .catch(error => {
                console.error(error);
            });
    };


    fetchMore = () => {
        this.fetchData(responseJson => {
            console.log('fetchMore', responseJson);
            const data = this.state._data.concat(responseJson.data.children);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data),
                isLoadingMore: false,
                _data: data,
                _dataAfter: responseJson.data.after
            });
        });
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        } else {
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    onEndReached={() =>
                        this.setState({isLoadingMore: true}, () => this.fetchMore())}
                    renderFooter={() => {
                        return (
                            this.state.isLoadingMore &&
                            <View style={{flex: 1}}>
                                <ActivityIndicator size="small"/>
                            </View>
                        );
                    }}
                    renderRow={rowData => {
                        return (
                            <View style={styles.listItem}>
                                <View style={styles.imageWrapper}>
                                    <Image
                                        style={{width: 70, height: 70}}
                                        source={{
                                            uri: rowData.data.icon_img === ""
                                                ? "https://via.placeholder.com/70x70.jpg"
                                                : rowData.data.icon_img
                                        }}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={styles.title}>
                                        {rowData.data.display_name}
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        {rowData.data.public_description}
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    listItem: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#d6d7da",
        padding: 6
    },
    imageWrapper: {
        padding: 5
    },
    title: {
        fontSize: 20,
        textAlign: "left",
        margin: 6
    },
    subtitle: {
        fontSize: 10,
        textAlign: "left",
        margin: 6
    }
});