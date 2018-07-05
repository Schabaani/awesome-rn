import React, {Component} from 'react';
import {View,} from 'react-native';
import BaseComponent from "./baseComponent";
import {Enhanced} from "./enhancedBaseComponent";


type ListProps = {};

export default class Usage extends Component<ListProps> {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Enhanced data='amir'/>
                <BaseComponent data='amir'/>
            </View>
        );
    }
}

