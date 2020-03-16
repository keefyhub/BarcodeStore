import {
    Dimensions,
    StyleSheet,
} from 'react-native';

const screenHeight = Math.round(Dimensions.get('window').height);

const ThemeStyles = StyleSheet.create({
    themeWrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    themeContainer: {
        flex: 1,
        maxHeight: screenHeight,
    },
    container: {
        // flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
    },
    hidden: {
        display: 'none',
    },
    scrollView: {},
    view: {},
    spacing: {
        marginBottom: 20,
        marginTop: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#f4511e',
        borderRadius: 20,
    },
    hiddenButton: {
        bottom: 0,
        position: 'absolute',
        right: 0,
        opacity: 0,
    },
    fixedButton: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        flex: 1,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        borderRadius: 0,
    },
    buttonText: {
        color: '#fff',
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        textTransform: 'uppercase',
    },
    buttonTextLarge: {
        fontSize: 18,
        fontWeight: '700',
    },
    form: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    stretch: {
        alignSelf: 'stretch',
    },
    small: {
        fontSize: 14,
        marginBottom: 10,
        marginTop: 10,
    },
    formText: {
        marginBottom: 10,
    },
    textInput: {
        backgroundColor: '#fff',
        // width: 300,
        height: 40,
        borderColor: '#000',
        borderBottomWidth: 1,
    },
    onePicker: {
        // width: 300,
        height: 100,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderBottomWidth: 1,
    },
    onePickerItem: {
        height: 100,
    },
    caratWrapper: {
        position: 'absolute',
        height: 40,
        right: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    carat: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontWeight: '700',
        marginBottom: 20,
        marginTop: 20,
        textTransform: 'uppercase',
    },
    colorWhite: {
        color: '#fff',
    },
    item: {
        alignContent: 'center',
        color: '#fff',
        flex: 1,
        // marginBottom: 20,
        // marginLeft: 10,
        // marginRight: 10,
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: -0.5},
        // shadowOpacity: .3,
        // shadowRadius: 3,
        // elevation: 3,
    },
    itemInner: {
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    itemContent: {},
    triangleWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: -20,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 15,
        borderTopColor: 'transparent',
        borderRightColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomColor: 'transparent',
    },
});

export default ThemeStyles;
