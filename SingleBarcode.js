import React, {Component} from 'react';

import {
    Alert,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import Barcode from './Barcode';
import AsyncStorage from '@react-native-community/async-storage';
import ThemeStyles from './ThemeStyles';

export default class SingleBarcode extends Component {
    constructor(props) {
        super(props);

        const {navigation} = this.props;
        this.state = {
            item: navigation.getParam('item'),
            index: navigation.getParam('index'),
            color: navigation.getParam('color'),
            data: navigation.getParam('data'),
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.item.label,
        };
    };

    componentDidMount() {
        const {item, index} = this.state;
        this.updateData(item, index);
    }

    updateData = async (item, index) => {
        const items = this.state.data;
        const itemToBeSaved = {
            label: item.label,
            code: item.code,
            type: item.type,
            views: ++item.views,
        };

        let newItem = JSON.parse(items);
        if (!newItem) {
            newItem = [];
        }
        newItem[index] = itemToBeSaved;

        console.log(item.views);

        try {
            await AsyncStorage.setItem('@storage_Key', JSON.stringify(newItem));
            console.log('updated view count');
        } catch (e) {
            // saving error
            console.log('error saving barcode');
        }
    };

    maybeDeleteItem = (item, index) => {
        Alert.alert(
            'Hold up!',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'OK', onPress: () => this.deleteItem(item, index),
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
        );

        return false;
    };

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
        return (<Barcode value={item.code} format={item.type} text={item.code}/>);
    };

    render() {
        const {item, index} = this.state;
        return (
            <View style={[ThemeStyles.themeWrapper]}>
                <SafeAreaView style={ThemeStyles.themeContainer}>
                    <View style={ThemeStyles.container}>
                        <ScrollView style={ThemeStyles.scrollView}>
                            <View style={ThemeStyles.spacing}>
                                {item.code && this.renderBarcode(item)}
                                <View style={ThemeStyles.spacing}>
                                    <Text style={[ThemeStyles.title]}>{item.label}</Text>
                                    <Text>{item.code}</Text>
                                    <Text>{item.type}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <TouchableHighlight style={[ThemeStyles.button, ThemeStyles.fixedButton]}
                                        onPress={() => this.maybeDeleteItem(item, index)}>
                        <Text style={[ThemeStyles.buttonText, ThemeStyles.buttonTextLarge]}>
                            Delete
                        </Text>
                    </TouchableHighlight>
                </SafeAreaView>
            </View>
        );
    }
}
