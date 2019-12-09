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
    StyleSheet,
    ActivityIndicator,
    Alert,
    Button,
    ScrollView,
    Text,
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

    componentDidMount() {
        this.getData();

        this.setState({
            isLoading: false,
        });
    }

    renderItem = (item, index) => {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.spacing} key={index}>
                <Text>{item.code}</Text>
                <Button title="Open code" onPress={() => navigate('SingleBarcode', {item: item, index: index})}/>
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
            storedItems = Object.values(data).map((item, index) => {
                return this.renderItem(item, index);
            });
        }

        return (
            <SafeAreaView style={[styles.container]}>
                <ScrollView style={styles.scrollView}>
                    <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
                    {storedItems}
                    <Button style={styles.button} title='Generate new code' onPress={() => navigate('GenerateBarcode')}/>
                    <Button style={styles.button} title='Delete all codes' onPress={() => this.deleteData()}/>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.lighter,
        flex: 1,
    },
    scrollView: {},
    view: {
        // backgroundColor: Colors.light,
    },
    spacing: {
        marginBottom: 20,
        marginTop: 20,
    }
});
