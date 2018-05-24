import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            readers: [
                {
                    id: 0,
                    readerName: 'Offline',
                }
            ]

        }
    }

    //handle on click on list item
    onReaderPress = (reader) => {
        //alert(reader.readerName);
        AsyncStorage.setItem("readerID", reader.readerName);
        this.props.navigation.navigate('Counter');
    };

    componentDidMount() {
        //check if the app has already a reader set up,
        //if yes then navigateto counter for that reader
        // else present the options to choose readers

        AsyncStorage.getItem("readerName")
            .then((readerName) => {
                if(readerName != null){
                    this.props.navigation.navigate('Counter');
                }else{
                    fetch('http://10.1.18.57:8180/getPOSMachines', {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            console.log(responseData);
                            this.setState({
                                readers:responseData
                            });
                        })
                        .catch((error) => {

                            console.log("Error in componentDidMount() of menu page, fetch block\n");
                            console.log(error);
                            this.setState({
                                readers: [
                                    {
                                        id: 0,
                                        readerName: 'Offline',
                                    }
                                ]
                            });

                    })
                        .done();
                }
            });


    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>READERS</Text>
                <ScrollView>
                    {
                        this.state.readers.map((reader, index) => (
                            <TouchableOpacity
                                key={reader.id}
                                style={styles.item}
                                onPress = {() => this.onReaderPress(reader)}
                            >
                                <Text>{reader.readerName}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
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
    header: {
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        width: '100%'
    }
});