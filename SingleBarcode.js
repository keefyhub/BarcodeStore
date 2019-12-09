import React, {Component} from 'react';

import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, View,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import Barcode from './Barcode';
import AsyncStorage from '@react-native-community/async-storage';

export default class SingleBarcode extends Component {
    constructor(props) {
        super(props);

        const {navigation} = this.props;
        this.state = {
            item: navigation.getParam('item'),
            index: navigation.getParam('index'),
        };
    }

    deleteItem = async (item, index) => {
        const {navigate} = this.props.navigation;

        let items = await AsyncStorage.getItem('@storage_Key');
        items = JSON.parse(items).filter((a, b) => index !== b);

        this.setState({
            data: items,
        });
        await AsyncStorage.setItem('@storage_Key', JSON.stringify(items));

        navigate('Home');
    };

    renderBarcode = (item) => {
        return (<Barcode value={item.code} format="CODE128" text={item.code}/>);
    };

    render() {
        const {item, index} = this.state;
        return (
            <SafeAreaView style={[styles.container]}>
                <ScrollView style={styles.scrollView}>
                    <Text>Single Barcode page</Text>
                    <View style={styles.spacing}>
                        <Text>Item from storage</Text>
                        {item.code &&
                        this.renderBarcode(item)
                        }
                        <Button onPress={() => this.deleteItem(item, index)} title="Delete"/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lighter,
        flex: 1,
    },
    scrollView: {},
    view: {
        // backgroundColor: Colors.light,
    },
    spacing: {
        marginBottom: 20,
        marginTop: 20,
    },
});
