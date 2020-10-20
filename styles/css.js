import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    paper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    center: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }
});