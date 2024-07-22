import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface Props {
    totalCorrect: number,
    isDisplayCorrect?: boolean,
    isDisplayIncorrect?: boolean,
    isDisplayDone?: boolean
}
interface State {
    isDisplayCorrect: boolean,
    isDisplayIncorrect: boolean,
    isDisplayDone: boolean
}

function CorrectAlert() {
    return (
        <View style={[styles.correct_alert, styles.alert]}>
            <Text>Correct!</Text>
        </View>
    );
}
function IncorrectAlert() {
    return (
        <View style={[styles.incorrect_alert, styles.alert]}>
            <Text>Incorrect!</Text>
        </View>
    );
}

class DoneAlert extends Component<Props, State> {
    public render() {
        return (
            <View style={[styles.done_alert, styles.alert]}>
                <Text>Results: {((this.props.totalCorrect / 15) * 100).toFixed(1)}% {this.props.totalCorrect}/15</Text>
            </View>
        );
    }
}

class DisplayAlert extends Component<Props, State> {

    public render() {
        return (
            <View>
                {this.props.isDisplayCorrect ? (<CorrectAlert />) : null}
                {this.props.isDisplayIncorrect ? (<IncorrectAlert />) : null}
                {this.props.isDisplayDone ? (<DoneAlert totalCorrect={this.props.totalCorrect} />) : null}
            </View>
        )
    }
}

export class Alerts extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isDisplayCorrect: false,
            isDisplayIncorrect: false,
            isDisplayDone: false
        }
    }

    public handleAlertChange(newAlert: string) {
        switch (newAlert) {
            case 'correct': {
                this.setState({ isDisplayCorrect: true });
                setTimeout(() => {
                    this.setState({ isDisplayCorrect: false });
                }, 1500);
                break;
            }
            case 'incorrect': {
                this.setState({ isDisplayIncorrect: true });
                setTimeout(() => {
                    this.setState({ isDisplayIncorrect: false });
                }, 1500);
                break;
            }
            case 'done': {
                this.setState({ isDisplayDone: true });
                break;
            }
            default: {
                this.setState({ isDisplayCorrect: false, isDisplayDone: false, isDisplayIncorrect: false });
                break;
            }
        }
    }

    public render() {
        return (
            <View style={styles.alert_list}>
                <DisplayAlert
                    isDisplayCorrect={this.state.isDisplayCorrect}
                    isDisplayIncorrect={this.state.isDisplayIncorrect}
                    isDisplayDone={this.state.isDisplayDone}
                    totalCorrect={this.props.totalCorrect}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    alert_list: {
        width: '40%',
        height: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    alert: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 50,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 5,
    },
    correct_alert: {
        color: 'green',
        backgroundColor: '#D1FACD',
        borderColor: 'green',
    },
    incorrect_alert: {
        color: 'red',
        backgroundColor: '#ffdddd',
        borderColor: 'red',
    },
    done_alert: {
        color: 'orange',
        backgroundColor: '#ffffdd',
        borderColor: 'orange'
    }
});

export default Alerts;