import React, {Component} from 'react';
import {
    Alert,
    Picker,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ThemeStyles from './ThemeStyles';
import barcodes from 'jsbarcode/src/barcodes';
import PropTypes from 'prop-types';

export default class GeneratorForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            value: '',
            codeType: 'CODE39',
            showCode: false,
            formats: Object.keys(barcodes),
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Generate new barcode',
        };
    };

    onChangeText = (text) => {
        this.setState({
            value: text,
        });
    };

    handleNameChange = (name) => {
        this.setState({
            name: name,
        });
    };

    onSubmitHandler = (event) => {
        // console.log(event);
        return event.focus();
    };

    storeData = async (name, value, type) => {
        const items = await AsyncStorage.getItem('@storage_Key');
        const itemToBeSaved = {
            label: name,
            code: value,
            type: type,
            views: 0,
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

        // Make sure fields are not empty
        if (name === '' || value === '' || codeType === '') {
            Alert.alert(
                'Code not created',
                'Make sure all fields have values',
                [
                    {
                        text: 'OK', onPress: () => console.log('OK Pressed'),
                    },
                ],
            );

            return false;
        }

        this.storeData(name, value, codeType);
        navigate('Home');
    };

    renderPickerItem = (item, index) => {
        return (<Picker.Item label={item} value={item} key={index}/>);
    };

    render() {
        const {formats} = this.state;
        const pickerItems = formats.map((item, index) => {
            return this.renderPickerItem(item, index);
        });

        return (
            <View style={ThemeStyles.themeWrapper}>
                <SafeAreaView style={ThemeStyles.themeContainer}>
                    <View style={ThemeStyles.container}>
                        <View style={ThemeStyles.form}>
                            <View style={[ThemeStyles.spacing, ThemeStyles.stretch]}>
                                <Text style={ThemeStyles.formText}>Name</Text>
                                <TextInput
                                    style={ThemeStyles.textInput}
                                    onChangeText={text => this.handleNameChange(text)}
                                    defaultValue="Give it a name"
                                    value={this.state.name}
                                    // enablesReturnKeyAutomatically="true"
                                    returnKeyType="next"
                                    clearButtonMode="while-editing"
                                    onSubmitEditing={() => this.onSubmitHandler(this._barcode)}
                                    ref={(input) => this._name = input}
                                />
                            </View>
                            <View style={[ThemeStyles.spacing, ThemeStyles.stretch]}>
                                <Text style={ThemeStyles.formText}>Input your barcode</Text>
                                <TextInput
                                    style={ThemeStyles.textInput}
                                    onChangeText={text => this.onChangeText(text)}
                                    defaultValue="Enter a barcode"
                                    value={this.state.value}
                                    // keyboardType="numeric"
                                    // enablesReturnKeyAutomatically="true"
                                    returnKeyType="next"
                                    ref={(input) => this._barcode = input}
                                />
                            </View>
                            <View style={[ThemeStyles.spacing, ThemeStyles.stretch]}>
                                <Text style={ThemeStyles.formText}>Barcode type</Text>
                                <View>
                                    <Picker selectedValue={this.state.codeType}
                                            style={[ThemeStyles.onePicker]}
                                            itemStyle={ThemeStyles.onePickerItem}
                                            onValueChange={(itemValue, itemIndex) => this.setState({codeType: itemValue})}>
                                        {pickerItems}
                                    </Picker>
                                    <View style={ThemeStyles.caratWrapper}>
                                        <View style={ThemeStyles.carat}></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableHighlight style={[ThemeStyles.button, ThemeStyles.fixedButton]}
                                        onPress={() => this.generateCode()}>
                        <Text style={[ThemeStyles.buttonText, ThemeStyles.buttonTextLarge]}>Add barcode</Text>
                    </TouchableHighlight>
                </SafeAreaView>
            </View>
        );
    }
}
