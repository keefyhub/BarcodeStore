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
    Dimensions,
    Image,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Barcode from './Barcode';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            windowHeight: 0,
            windowWidth: 0,
            imageUrl: '',
            isLoading: true,
        };
    }

    componentDidMount() {
        const window = Dimensions.get('window');

        this.setState({
            windowHeight: window.height,
            windowWidth: window.width,
        });

        const url = 'http://barcodes4.me/barcode/c128a/500015401.jpg';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            cache: 'default',
        };
        const request = new Request(url);

        fetch(request, options).then((response) => {
            // console.log(response.url);
            this.setState({
                image: {
                    type: 'uri',
                    url: response.url,
                },
                isLoading: false,
            });
        });
    }

    loadRender() {
        return (
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </ScrollView>
            </SafeAreaView>
        );
    }

    render() {
        // const {isLoading} = this.state;
        // if (isLoading) {
        //     return this.loadRender();
        // }

        return (
            <SafeAreaView style={[styles.container]}>
                <View style={styles.view}>
                    <Barcode value="500015401" format="CODE128" text="Red spider code"/>
                </View>
            </SafeAreaView>
        )
            ;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cb2b2e',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    view: {
        backgroundColor: Colors.light
    }
});

//
// const App: () => React$Node = () => {
//     componentDidMount();
//     {
//         console.log('here');
//     }
//
//     return (
//         <>
//             <StatusBar barStyle="dark-content"/>
//             <SafeAreaView>
//                 <ScrollView
//                     contentInsetAdjustmentBehavior="automatic"
//                     style={styles.scrollView}>
//                     <Header/>
//                     {global.HermesInternal == null ? null : (
//                         <View style={styles.engine}>
//                             <Text style={styles.footer}>Engine: Hermes</Text>
//                         </View>
//                     )}
//                     <View style={styles.body}>
//                         <Image style={{width: 100, height: 100}}
//                                source={{uri: 'http://barcodes4.me/barcode/c128a/500015401.jpg'}}/>
//
//                         <View style={styles.sectionContainer}>
//                             <Text style={styles.sectionTitle}>Step One</Text>
//                             <Text style={styles.sectionDescription}>
//                                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                                 screen and then come back to see your edits.
//                             </Text>
//                         </View>
//                         <View style={styles.sectionContainer}>
//                             <Text style={styles.sectionTitle}>See Your Changes</Text>
//                             <Text style={styles.sectionDescription}>
//                                 <ReloadInstructions/>
//                             </Text>
//                         </View>
//                         <View style={styles.sectionContainer}>
//                             <Text style={styles.sectionTitle}>Debug</Text>
//                             <Text style={styles.sectionDescription}>
//                                 <DebugInstructions/>
//                             </Text>
//                         </View>
//                         <View style={styles.sectionContainer}>
//                             <Text style={styles.sectionTitle}>Learn More</Text>
//                             <Text style={styles.sectionDescription}>
//                                 Read the docs to discover what to do next:
//                             </Text>
//                         </View>
//                         <LearnMoreLinks/>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </>
//     );
// };
//
// const styles = StyleSheet.create({
//     scrollView: {
//         backgroundColor: Colors.lighter,
//     },
//     engine: {
//         position: 'absolute',
//         right: 0,
//     },
//     body: {
//         backgroundColor: Colors.white,
//     },
//     sectionContainer: {
//         marginTop: 32,
//         paddingHorizontal: 24,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: '600',
//         color: Colors.black,
//     },
//     sectionDescription: {
//         marginTop: 8,
//         fontSize: 18,
//         fontWeight: '400',
//         color: Colors.dark,
//     },
//     highlight: {
//         fontWeight: '700',
//     },
//     footer: {
//         color: Colors.dark,
//         fontSize: 12,
//         fontWeight: '600',
//         padding: 4,
//         paddingRight: 12,
//         textAlign: 'right',
//     },
// });

// export default App;
