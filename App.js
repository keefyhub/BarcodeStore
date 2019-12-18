import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Home';
import SingleBarcode from './SingleBarcode';
import GenerateBarcode from './GeneratorForm';

const MainNavigator = createStackNavigator({
        Home: Home,
        SingleBarcode: SingleBarcode,
        GenerateBarcode: GenerateBarcode,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });

const App = createAppContainer(MainNavigator);

export default App;
