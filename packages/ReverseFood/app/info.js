import {View , Text } from "react-native";
import { our_styles } from "../styles/styles.jsx";
import { useLocalSearchParams } from "expo-router";
import Table from "../components/table.js";

const URL = "localhost:3000/api/food/";

function Info(myData) {
return <View style={our_styles.center_container}>
        <Text style={our_styles.heading}>{myData.name}</Text>
        <Text></Text>
        <Text style={our_styles.subheading}>{myData.description}</Text>
        <Text style={our_styles.subheading}>{myData.foodCategory}</Text>
        <Text style={our_styles.body}>{myData.ingredients}</Text>
        <Table data={myData.nutrients}/>
    </View>
}


export default function info(){

    const params  = useLocalSearchParams();
    const myData = fetch(URL + {
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.FDA_API_KE,
            "body": JSON.stringify({
                foodName: params.foodName,
                foodServingSize: params.foodServingSize,
            }),
        },
    }).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                return Info(data);
            });
        } else {
            return null;
        }
    }).catch((error) => {
        console.log(error);
        return null;
    });
}