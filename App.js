/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,} from 'react-native';


type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={[styles.border]}>
                <Text style={[{zIndex: 5,}]}>نوع خودرو</Text>
                <Text style={[{zIndex: 5,}]}>نوع خودddddرو</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    border: {
        // marginTop: "13%",
        height: "50%",
        width: "100%",
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderRightWidth: 1,
        borderBottomWidth: 2,
        paddingRight: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',

    }
});

