import React, {Component} from 'react';
import {
    Button, SafeAreaView, ScrollView, StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class GeneratorForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            showCode: false,
        };
    }

    onChangeText = (text) => {
        this.setState({
            value: text,
            showCode: false,
        });
    };

    storeData = async (value) => {
        const items = await AsyncStorage.getItem('@storage_Key');
        const itemToBeSaved = {
            code: value,
        };

        let newItem = JSON.parse(items);
        if (!newItem) {
            newItem = [];
        }

        newItem.push(itemToBeSaved);

        try {
            await AsyncStorage.setItem('@storage_Key', JSON.stringify(newItem));
            console.log('saved item');
        } catch (e) {
            // saving error
            console.log('error saving barcode');
        }
    };

    generateCode = () => {
        const {value} = this.state;
        const {navigate} = this.props.navigation;
        this.storeData(value);
        navigate('Home');
    };

    render() {
        return (
            <SafeAreaView style={[styles.container]}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.form}>
                        <View style={styles.spacing}>
                            <Text style={styles.formText}>Input your barcode</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => this.onChangeText(text)}
                                defaultValue="Enter a barcode"
                                value={this.state.value}
                            />
                        </View>
                        <View style={styles.spacing}>
                            <Text style={styles.small}>(NOTE - code128 only)</Text>
                        </View>
                        <Button
                            title="Generate new code"
                            onPress={() => this.generateCode()}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {},
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    spacing: {
        marginBottom: 20,
        marginTop: 20,
    },
    small: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 20,
    },
    formText: {
        marginBottom: 10,
    },
    textInput: {
        backgroundColor: '#fff',
        width: 300,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
    },
});
