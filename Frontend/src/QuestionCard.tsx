import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

interface Props {
    onAlertChange: Function,
    isDone: boolean
}
interface State {
    totalCorrect: number,
    correctId: number,
    questionNum: number,
    questionText: string,
    possibleAnswers: string[],
    isLoading: boolean
}

export class QuestionCard extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            totalCorrect: 0,
            correctId: -1,
            questionNum: 0,
            questionText: '',
            possibleAnswers: ['', '', '', ''],
            isLoading: false,
        };
    }

    public componentDidMount() {
        this.nextQuestion();
    }

    private handleClick(index: number) {
        this.setState({ isLoading: true });
        if (index === this.state.correctId) {
            this.props.onAlertChange('correct');
            this.setState({
                totalCorrect: this.state.totalCorrect + 1,
            });
        } else {
            this.props.onAlertChange('incorrect');
        }
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    private nextQuestion() {
        this.setState({ isLoading: true });
        fetch('http://10.0.2.2:5000/api/QuizQuestion/')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    correctId: data.questioncorrectid,
                    questionNum: this.state.questionNum + 1,
                    questionText: data.questiontext,
                    possibleAnswers: data.questionanswers,
                    isLoading: false
                });
                if (this.state.questionNum > 15) {
                    this.endQuiz();
                }
            }).catch(console.log);
    }

    public endQuiz() {
        this.props.onAlertChange('done', this.state.totalCorrect);
        this.setState({
            totalCorrect: 0,
            questionNum: 0,
        });
    }

    public restartQuiz() {
        this.props.onAlertChange('', this.state.totalCorrect);
        this.nextQuestion();
    }

    public render() {
        return (
            <View style={[styles.card, this.props.isDone ? styles.card_done : null]} >
                <View style={styles.card_header}>
                    <Text>
                        Question #{this.state.questionNum}
                    </Text>
                    <Text>
                        {this.state.totalCorrect} / 15
                    </Text>
                </View>
                <View style={styles.card_content}>
                    <Text>
                        {this.state.questionText}
                    </Text>
                </View>
                <View style={styles.card_actions}>
                    <TouchableOpacity
                        onPress={() => { this.handleClick(0) }}
                        disabled={this.state.isLoading}
                        style={[styles.answer_button,
                        this.state.isLoading ?
                            (this.state.correctId === 0
                                ? styles.correct_button
                                : styles.incorrect_button) : null]}
                    >
                        <Text>
                            A) {this.state.possibleAnswers[0]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.handleClick(1) }}
                        disabled={this.state.isLoading}
                        style={[styles.answer_button,
                        this.state.isLoading ?
                            (this.state.correctId === 1
                                ? styles.correct_button
                                : styles.incorrect_button) : null]}
                    >
                        <Text>
                            B) {this.state.possibleAnswers[1]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.handleClick(2) }}
                        disabled={this.state.isLoading}
                        style={[styles.answer_button,
                        this.state.isLoading ?
                            (this.state.correctId === 2
                                ? styles.correct_button
                                : styles.incorrect_button) : null]}
                    >
                        <Text>
                            C) {this.state.possibleAnswers[2]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.handleClick(3) }}
                        disabled={this.state.isLoading}
                        style={[styles.answer_button,
                        this.state.isLoading ?
                            (this.state.correctId === 3
                                ? styles.correct_button
                                : styles.incorrect_button) : null]}
                    >
                        <Text>
                            D) {this.state.possibleAnswers[3]}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    correct_button: {
        backgroundColor: '#559955'
    },
    incorrect_button: {
        backgroundColor: '#995555'
    },
    answer_button: {
        backgroundColor: '#aaaaaa',
        margin: 10,
        padding: 5,
        borderRadius: 5
    },
    card_actions: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    card_content: {

    },
    card_header: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    },
    card_done: {
        display: 'none'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaaaaa',
        width: '80%'
    }
});

export default QuestionCard;