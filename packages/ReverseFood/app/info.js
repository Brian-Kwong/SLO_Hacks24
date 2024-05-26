import {View , Text } from "react-native";
import { our_styles } from "../styles/styles.jsx";
import { useLocalSearchParams } from "expo-router";
import Table from "../components/table.js";
import SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

const URL = "http://localhost:18000/image";




export default function info (){

    const [myData , setData] = useState({ name : 0, description : 0, foodCategory : 0, ingredients : 0, nutrients : []})
    
    
    useEffect(() => {
    const p  = useLocalSearchParams();
    fetchData(p)
    ;});


    const fetchData = (params) => {SecureStore.getItemAsync("token").then((token) => {
        if (token === undefined) {
            console.log("No token found");
        }
    fetch(URL + {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,     
        },
        body: JSON.stringify({
            image: params.image,
            foodName: params.foodName,
            ingredients: params.ingredients,
            description: params.description,
        }),
    }).then((response) => {
        if (response.status === 200) {
            response.json().then((myData) => {
                setData(myData);
            });
        } else {
            return null;
        }
    }).catch((error) => {
        console.log(error);
        return null;
    });
}).catch((error) => {{
    console.log(error);
    return null;
}})};

return <View style={our_styles.center_container}>
<Text style={our_styles.heading}>{(myData === 0) ? "Loading" : myData.name}</Text>
<Text></Text>
<Text style={our_styles.subheading}>{(myData === 0) ? "Loading" : myData.description}</Text>
<Text style={our_styles.subheading}>[(myData === 0) ? "Loading" : myData.foodCategory]</Text>
<Text style={our_styles.body}>[(myData === 0) ? "Loading" : myData.ingredients]</Text>
<Table data={(myData === 0) ? "Loading" : myData.nutrients}/>
</View>
}  