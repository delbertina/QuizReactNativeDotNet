import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, withNavigation } from 'react-navigation';

interface Props {
    changeDisplay: Function
}
interface State { }


export class NavHeader extends Component<Props, State> {

    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.header_text}>
                    Web Quiz
                </Text>
                <View style={styles.nav_button_list}>
                    <TouchableOpacity
                        style={styles.nav_button}
                        onPress={() => this.props.changeDisplay('quiz')}>
                        <Text>
                            Quiz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.nav_button}
                        onPress={() => this.props.changeDisplay('list')}>
                        <Text>
                            Questions
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.nav_button}
                        onPress={() => this.props.changeDisplay('form')}>
                        <Text>
                            Highscores
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        textAlign: 'left',
        marginBottom: 10,
        backgroundColor: '#eeeeee'
    },
    header_text: {
        padding: 10,
        margin: 0,
        marginRight: 'auto'
    },
    nav_button_list: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    nav_button: {
        color: 'white',
        backgroundColor: '#aaaaaa',
        padding: 10,
        margin: 0
    },
    hover_button: {
        borderStyle: 'solid',
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: 'black',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: 'black',
        backgroundColor: '#888888',
    }
});

export default NavHeader;