const URL = "https://mealathon.azurewebsites.net/image";
export function submitData(image, foodName, ingredients, desc){
    const food = {
        image: image,
        foodName: foodName,
        ingredients: ingredients,
        desc: desc
    }
    //console.log(food)
    const request = fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(food),
    });
    request.then((response) => {
        if (response.status < 400) {
            response.json().then((data) => {
                console.log("Success");
                return data;
            });
        } else {
            console.log("Error", response.status );
        }
    }).catch((error) => {
        console.log(error);
    });
}