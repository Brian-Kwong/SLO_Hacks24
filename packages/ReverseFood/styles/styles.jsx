import { TextInput, StyleSheet} from "react-native";

export const colors = ["#FA7070","#FEFDED","#C6EBC5","#A1C398"]

export const our_styles = StyleSheet.create({
    center_container: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    tablbleRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    textInput:{
        height: 40,
        width: 200,
        fontSize: 20,
        FontFace: 'Noto Sans',
        borderColor: 'gray',
    },
    buttoon: {
        color: colors[0]
    },
    heading:{
        fontSize: 36,
        fontFamily: 'Noto Sans',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subheading:{
        fontSize: 30,
        fontFamily: 'Noto Sans',
        color: 'black',
        textAlign: 'center',
    },
    body:{
        fontSize: 24,
        fontFamily: 'Noto Sans',
        color: 'black',
        textAlign: 'center',
    }
});

export const table_styles = StyleSheet.create({
    tableHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    tableRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    tableHeaderCell:{
        fontSize: 16,
        fontFamily: 'Noto Sans',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        width: "25%"
    },
    tableCell:{
        fontSize: 10,
        fontFamily: 'Noto Sans',
        color: 'black',
        textAlign: 'center',
        width: "25%"
    }
})

