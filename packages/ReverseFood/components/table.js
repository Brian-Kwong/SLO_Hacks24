import {View, Text, ScrollView} from "react-native";
import {our_styles,table_styles} from "../styles/styles.jsx";

function TableHeader(text1, text2, text3,text4) {
    return <View style={our_styles.tablbleRow} key={text1}>
        <Text style={table_styles.tableHeaderCell}>{text1}</Text>
        <Text style={table_styles.tableHeaderCell}>{text2}</Text>
        <Text style={table_styles.tableHeaderCell}>{text3}</Text>
        <Text style={table_styles.tableHeaderCell}>{text4}</Text>
    </View>
}

function TableCell(text1, text2, text3,text4) {
    console.log(text1 + " " + text2 + " " + text3 + " " + text4);
    return <View style={our_styles.tablbleRow} key={text1}>
        <Text style={table_styles.tableCell}>{text1}</Text>
        <Text style={table_styles.tableCell}>{text2}</Text>
        <Text style={table_styles.tableCell}>{text3}</Text>
        <Text style={table_styles.tableCell}>{text4}</Text>
    </View>
}

export default function Table(data){
    console.log(data);
    if(data.children === undefined){
        return <Text style={our_styles.body}></Text>
    }
    else{
    return  <ScrollView>
        {[ TableHeader("Name", "Unit", "Value", "Daily Value")].concat(data.children.map((item) => {
        return TableCell(item.name,item.unit, item.value, item.dailyValue);
        }))}</ScrollView> 
    }
}
