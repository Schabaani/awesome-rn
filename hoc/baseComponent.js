import React, {Component} from 'react';
import {Text} from "react-native";


type BaseComponentProps = {};

export default class BaseComponent extends Component<BaseComponentProps> {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Text style={{flex:1}}>{this.props.data}</Text>);
    }
}

