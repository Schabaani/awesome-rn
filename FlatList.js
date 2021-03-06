/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View,} from 'react-native';

import {List, ListItem, SearchBar} from 'react-native-elements'


type ListProps = {};

export default class OwnFlatList extends Component<ListProps> {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            contentOffset: 0,
            hideSearch: false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const {page, seed} = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({loading: true});
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };
    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round/>;
    };
    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    handleScroll = (event) => {
        const changer = {};
        if (event.nativeEvent.contentOffset.y > this.state.contentOffset) {
            changer.hideSearch = false;
        } else {
            changer.hideSearch = true;
        }
        changer.contentOffset = event.nativeEvent.contentOffset.y;
        this.setState({hideSearch: changer.hideSearch, contentOffset: changer.contentOffset,});
    };

    render() {
        return (
            <List
                containerStyle={{
                    borderTopWidth: 5, borderBottomWidth: 0,
                    borderTopColor: this.state.hideSearch ? 'red' : 'yellow'
                }}
            >
                <FlatList
                    onScroll={this.handleScroll}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.data}
                    keyExtractor={item => item.email}
                    renderItem={({item}) => (
                        <ListItem
                            roundAvatar
                            title={`${item.name.first} ${item.name.last}`}
                            subtitle={item.email}
                            avatar={{uri: item.picture.thumbnail}}
                            containerStyle={{borderBottomWidth: 0}}
                        />
                    )}
                />
            </List>
        );
    }
}

