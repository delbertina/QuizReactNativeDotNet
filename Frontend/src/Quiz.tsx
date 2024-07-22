import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Alerts from './Alerts';
import QuestionCard from './QuestionCard';
import NavHeader from './NavHeader';
import Restart from './Restart';

interface Props { }
interface State {
    totalCorrect: number,
    isDone: boolean
}

export class Quiz extends Component<Props, State> {
    private childCard: React.RefObject<QuestionCard>;
    private childAlerts: React.RefObject<Alerts>;

    constructor(props: Props) {
        super(props);
        this.state = { totalCorrect: 0, isDone: false };
        this.childCard = React.createRef();
        this.childAlerts = React.createRef();
    }

    handleAlertChange(alert: string, totalCorrect: number) {
        this.setState({ totalCorrect: totalCorrect, isDone: alert === 'done' });
        this.childAlerts.current?.handleAlertChange(alert);
    }

    handleStartOver() {
        this.childCard.current?.restartQuiz();
    }

    render() {
        return (
            <View style={styles.quiz_view}>
                <Alerts
                    totalCorrect={this.state.totalCorrect}
                    ref={this.childAlerts}
                />
                <QuestionCard
                    onAlertChange={this.handleAlertChange.bind(this)}
                    isDone={this.state.isDone}
                    ref={this.childCard}
                />
                <Restart
                    onStartOver={this.handleStartOver.bind(this)}
                    isDisplayed={this.state.isDone}
                />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    quiz_view: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    }
});

export default Quiz;