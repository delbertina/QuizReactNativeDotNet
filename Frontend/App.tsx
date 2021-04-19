import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Quiz from './src/Quiz';
import NavHeader from './src/NavHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface Props { }
export interface State {
  isQuizDisplayed: boolean,
  isQuestionListDisplayed: boolean,
  isQuestionFormDisplayed: boolean
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isQuizDisplayed: true,
      isQuestionListDisplayed: false,
      isQuestionFormDisplayed: false
    };
  }

  changeDisplayedPage(displayName: string) {
    switch (displayName) {
      case "quiz":
        this.setState({
          isQuizDisplayed: true,
          isQuestionFormDisplayed: false,
          isQuestionListDisplayed: false
        });
        break;
      case "list":
        this.setState({
          isQuizDisplayed: false,
          isQuestionFormDisplayed: false,
          isQuestionListDisplayed: true
        });
        break;
      case "form":
        this.setState({
          isQuizDisplayed: false,
          isQuestionFormDisplayed: true,
          isQuestionListDisplayed: false
        });
        break;
    }
  }

  render() {
    return (
      <SafeAreaView>
        <NavHeader changeDisplay={this.changeDisplayedPage.bind(this)} />
        <View style={!this.state.isQuizDisplayed ? styles.display_none : null}>
          <Quiz />
        </View>
        <View style={!this.state.isQuestionListDisplayed ? styles.display_none : null}>
          <Text>
            Question List
          </Text>
        </View>
        <View style={!this.state.isQuestionFormDisplayed ? styles.display_none : null}>
          <Text>
            Question Form
          </Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  display_none: {
    display: 'none'
  }
});

export default App;
