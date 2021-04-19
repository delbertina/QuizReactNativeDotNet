import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';

interface Props {
    onStartOver: Function,
    isDisplayed: boolean
}
interface State { }

export class Restart extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    public render() {
        return this.props.isDisplayed ? (
            <Button
                title="Start Over"
                onPress={() => { this.props.onStartOver() }}>
            </Button>
        ) : null;
    }
}

const styles = StyleSheet.create({
    startOverButton: {
        backgroundColor: '#dddddd',
    }
});

export default Restart;