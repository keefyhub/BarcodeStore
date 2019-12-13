import React, {Component} from 'react';
import {
    Button,
    Picker,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class GeneratorForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            value: '',
            codeType: 'CODE39',
            showCode: false,
        };
    }

    onChangeText = (text) => {
        this.setState({
            value: text
        });
    };

    handleNameChange = (name) => {
        this.setState({
            name: name
        });
    };

    storeData = async (name, value, type) => {
        const items = await AsyncStorage.getItem('@storage_Key');
        const itemToBeSaved = {
            label: name,
            code: value,
            type: type,
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
        const {name, value, codeType} = this.state;
        const {navigate} = this.props.navigation;
        this.storeData(name, value, codeType);
        navigate('Home');
    };

    render() {
        return (
            <SafeAreaView style={[styles.container]}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.form}>
                        <View style={styles.spacing}>
                            <Text style={styles.formText}>Name</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => this.handleNameChange(text)}
                                defaultValue="Give it a name"
                                value={this.state.name}
                            />
                        </View>
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
                            <Picker selectedValue={this.state.codeType}
                                    style={[styles.onePicker]}
                                    itemStyle={styles.onePickerItem}
                                    onValueChange={(itemValue, itemIndex) => this.setState({codeType: itemValue})}>
                                <Picker.Item label="CODE39" value="CODE39"/>
                                <Picker.Item label="CODE128" value="CODE128"/>
                            </Picker>
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
    onePicker: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
    },
    onePickerItem: {
        height: 40,
    },
});
