import React from 'react';
import {StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity} from 'react-native';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            counterID : '',
            pin : ''
        }
    }

    login(){
        console.log(this.state.counterID);
        console.log("\n");
        console.log(this.state.pin);
    }
    render(){
        return(
            <KeyboardAvoidingView style={styles.wrapper} behaviour='padding'>
                <Text style={styles.header}>LOGIN</Text>

                <TextInput style={styles.textInput}
                           placeholder='Counter ID'
                           onChangeText={(counterID) => this.setState({counterID})}
                           underlineColorAndroid='transparent'
                />

                <TextInput style={styles.textInput}
                           placeholder='PIN'
                           onChangeText = {(pin) => this.setState({pin})}
                           underlineColorAndroid='transparent'
                           secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.login}
                >
                    <Text>LOGIN</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00bfff',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
        textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
        button: {
        alignSelf: 'stretch',
        backgroundColor: '#28BB08',
        padding: 20,
        alignItems: 'center',
    },
});