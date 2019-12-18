import React, {Component} from 'react';

import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import Barcode from './Barcode';
import AsyncStorage from '@react-native-community/async-storage';
import ThemeStyles from './ThemeStyles';
import {NavigationEvents} from 'react-navigation';

export default class SingleBarcode extends Component {
    constructor(props) {
        super(props);

        const {navigation} = this.props;
        this.state = {
            item: navigation.getParam('item'),
            index: navigation.getParam('index'),
            color: navigation.getParam('color'),
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.item.label,
        };
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
        const {item, index, color} = this.state;
        return (
            <View style={[ThemeStyles.themeWrapper, {backgroundColor: color}]}>
                <SafeAreaView style={ThemeStyles.themeContainer}>
                    <View style={ThemeStyles.container}>
                        <ScrollView style={ThemeStyles.scrollView}>
                            <View style={ThemeStyles.spacing}>
                                {item.code && this.renderBarcode(item)}
                                <View style={ThemeStyles.spacing}>
                                    <Text style={[ThemeStyles.colorWhite, ThemeStyles.title]}>{item.label}</Text>
                                    <Text style={ThemeStyles.colorWhite}>{item.code}</Text>
                                    <Text style={ThemeStyles.colorWhite}>{item.type}</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyles.buttonRow, ThemeStyles.spacing]}>
                                <TouchableHighlight style={ThemeStyles.button}
                                                    onPress={() => this.deleteItem(item, index)}>
                                    <Text style={ThemeStyles.buttonText}>Delete</Text>
                                </TouchableHighlight>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </View>
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
    },
});
