import React, {Component} from 'react';
import {
    Button, StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Barcode from './Barcode';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';

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

        console.log(this.state.items);

        this.storeData(value);

        return (
            <View>
                <Barcode value={value} format="CODE128"/>
            </View>
        );
    };

    showCode = () => {
        this.setState({
            showCode: true,
        });
    };

    render() {
        const {showCode} = this.state;
        return (
            <View style={styles.form}>
                {showCode &&
                this.generateCode()
                }
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
                    onPress={() => this.showCode()}
                />
            </View>
        )
            ;
    }
}

const styles = StyleSheet.create({
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
