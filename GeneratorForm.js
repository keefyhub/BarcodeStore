import React, {Component} from 'react';
import {
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

    storeData = async (name, value, type) => {
        const items = await AsyncStorage.getItem('@storage_Key');
        const itemToBeSaved = {
            label: name,
            code: value,
            type: type,
            views: 0
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
            return false;
        }

        this.storeData(name, value, codeType);
        navigate('Home');
    };

    render() {
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
                                />
                            </View>
                            <View style={[ThemeStyles.spacing, ThemeStyles.stretch]}>
                                <Text style={ThemeStyles.formText}>Input your barcode</Text>
                                <TextInput
                                    style={ThemeStyles.textInput}
                                    onChangeText={text => this.onChangeText(text)}
                                    defaultValue="Enter a barcode"
                                    value={this.state.value}
                                    keyboardType="number-pad"
                                />
                            </View>
                            <View style={[ThemeStyles.spacing, ThemeStyles.stretch]}>
                                <Text style={ThemeStyles.formText}>Barcode type</Text>
                                <View>
                                    <Picker selectedValue={this.state.codeType}
                                            style={[ThemeStyles.onePicker]}
                                            itemStyle={ThemeStyles.onePickerItem}
                                            onValueChange={(itemValue, itemIndex) => this.setState({codeType: itemValue})}>
                                        <Picker.Item label="CODE39" value="CODE39"/>
                                        <Picker.Item label="CODE128" value="CODE128"/>
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
