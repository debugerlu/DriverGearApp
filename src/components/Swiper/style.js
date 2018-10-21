import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        flex: 1,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    paginationStyle: {
        width:50,
        padding: 5,
        position: 'absolute',
        borderRadius: 20,
        justifyContent:"center",
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,.4)",
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 14
    },
    image: {
        width:width,
        flex: 1
    }
})

export default styles