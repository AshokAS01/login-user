import React from 'react';
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            counter : 'NA'
        }
    }


    fetchCounterData() {
        AsyncStorage.getItem('readerID').then((storedReaderID) => {
            if (storedReaderID != null) {

                fetch('http://10.1.18.57:8180/getRecordsCounter', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: "readerID="+storedReaderID,

                })
                    .then((response) => response.json())
                    .then((responseData) => {

                        //we have the data
                        this.setState({
                            counter: responseData[0].counter
                        });

                    })
                    .done();
            }
        });

    }

    componentDidMount(){
       setInterval(() => {this.fetchCounterData()}, 1000);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.counter}>
                    {this.state.counter}
                </Text>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => {
                        AsyncStorage.clear();
                        this.props.navigation.navigate('Home');
                    }}
                >
                    <Text style={styles.menuText}>Menu</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /*alignItems: 'center',*/
        justifyContent: "center",
        backgroundColor: '#00bfff',
        paddingLeft: 0,
        paddingRight: 0,
        width: '100%'
    },
    menuButton: {
        alignSelf: 'stretch',
        position: 'absolute',
        backgroundColor: '#33bb0a',
        padding: 20,
        left: 20,
        bottom: 10,
        alignItems: 'center',
        borderRadius: 9,
        width: '90%'
    },
    menuText: {
        color: '#ffffff'
    },
    counter: {
        alignSelf: 'center',
        fontSize: 200,
    }
});