/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React from 'react';
import React, {Component} from 'react';
import {
    SafeAreaView,
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Barcode from './Barcode';
import GeneratorForm from './GeneratorForm';

import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';

import ThemeStyles from './ThemeStyles';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            windowHeight: 0,
            windowWidth: 0,
            imageUrl: '',
            isLoading: true,
            data: [],
        };
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key');
            if (value !== null) {
                this.setState({
                    data: JSON.parse(value),
                });
            }
        } catch (e) {
            // error reading value
        }
    };

    deleteData = async () => {
        await AsyncStorage.removeItem('@storage_Key');
        this.setState({
            data: [],
        });
        console.log('deleted items');
    };

    addTestData = () => {
        for (const index of [1, 2, 3, 4, 5].keys()) {
            this.setState(state => {
                const data = state.data.concat({
                    code: '123456789',
                    label: 'Test code' + index,
                    type: 'CODE128',
                });

                return {
                    data,
                };
            });
        }
    };

    componentDidMount() {
        this.getData();

        this.setState({
            isLoading: false,
        });
    }

    nthChild = (n) => {
        if (n % 6 === 0) {
            return '#87c5a4';
        }

        if (n % 5 === 0) {
            return '#8ea9e8';
        }

        if (n % 4 === 0) {
            return '#e7b788';
        }

        if (n % 3 === 0) {
            return '#ec8d81';
        }

        if (n % 2 === 0) {
            return '#8d82c4';
        }

        if (n % 1 === 0) {
            return '#6fc3df';
        }
    };

    renderItem = (item, index) => {
        const {navigate} = this.props.navigation;

        return (
            <View style={[ThemeStyles.item, {backgroundColor: this.nthChild(index)}]}
                  key={index}>
                <TouchableHighlight style={ThemeStyles.itemInner}
                                    onPress={() => navigate('SingleBarcode', {
                                        item: item,
                                        index: index,
                                        color: this.nthChild(index),
                                        data: JSON.stringify(this.state.data)
                                    })}>
                    <View style={ThemeStyles.itemContent}>
                        <Text style={[ThemeStyles.title, ThemeStyles.colorWhite]}>{item.label}</Text>
                        <Text style={ThemeStyles.hidden}>{item.type}</Text>
                        <Text style={ThemeStyles.hidden}>{item.views}</Text>
                        <Text style={ThemeStyles.hidden}>{item.code}</Text>
                        <View style={ThemeStyles.triangleWrapper}>
                            <View style={ThemeStyles.triangle}>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    };

    loadRender() {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text>Loading</Text>
            </SafeAreaView>
        );
    }

    render() {
        const {data, isLoading} = this.state;
        const {navigate} = this.props.navigation;

        if (isLoading) {
            return this.loadRender();
        }

        let storedItems = false;
        if (data) {
            data.sort((a, b) => {
                return b.views > a.views ? 1 : -1;
            });
            storedItems = Object.values(data).map((item, index) => {
                return this.renderItem(item, index);
            });
        }

        return (
            <View style={ThemeStyles.themeWrapper}>
                <SafeAreaView style={ThemeStyles.themeContainer}>
                    <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
                    <View style={ThemeStyles.container}>
                        <Text style={ThemeStyles.title}>Saved barcodes</Text>
                    </View>
                    <ScrollView style={ThemeStyles.scrollView}>
                        {storedItems}
                    </ScrollView>
                    <TouchableHighlight style={[ThemeStyles.button, ThemeStyles.fixedButton]}
                                        onPress={() => navigate('GenerateBarcode')}>
                        <Text style={[ThemeStyles.buttonText, ThemeStyles.buttonTextLarge]}>Generate new code</Text>
                    </TouchableHighlight>
                    <View style={ThemeStyles.hidden}>
                        <TouchableHighlight style={ThemeStyles.button}
                                            onPress={() => this.addTestData()}>
                            <Text style={ThemeStyles.buttonText}>Add test data</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={ThemeStyles.hidden}>
                        <TouchableHighlight style={ThemeStyles.button} onPress={() => this.deleteData()}>
                            <Text style={ThemeStyles.buttonText}>Delete all codes</Text>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
