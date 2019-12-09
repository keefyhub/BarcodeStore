import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Home';
import SingleBarcode from './SingleBarcode';
import GenerateBarcode from './GeneratorForm';

const MainNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: () => ({
            title: 'Home',
        }),
    },
    SingleBarcode: {
        screen: SingleBarcode,
        navigationOptions: ({navigation}) => ({
            title: `Single barcode - ${navigation.state.params.item.code}`,
        }),
    },
    GenerateBarcode: {
        screen: GenerateBarcode,
        navigationOptions: () => ({
            title: 'Generate new barcode',
        }),
    },
});

const App = createAppContainer(MainNavigator);

export default App;
