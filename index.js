const apikey="37cbe99fc1254b95f6d4a5cc2cd44d33";
const weatherDataE1=document.getElementById("weather-data");
const cityInputE1=document.getElementById("city-input");
const formE1=document.querySelector("form");
formE1.addEventListner("submit",(event)=>{
    event.preventDefault();
    const cityValue=cityInputE1.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try{
        const response=await fetch('https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric');
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data=await response.json();
        console.log(data);
        const temperature =math.round(data.main.temp)
        const description =data.weather[0].description
        const icon =data.weather[0].icon
        const details =[
            'feels like: ${math.round(data.main.temp)}',
            'Humidity:${data.main.humidity}%',
            'Wind speed:${data.wind.speed}m/s',
        ];
        weatherDataE1.querySelector(".icon").innerHTML='<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">';
        weatherDataE1.querySelector(
            ".temperature"
            ).textContent = '${temperature}°C'; 
        weatherDataE1.querySelector(".description").textContent= description;
        weatherDataE1.querySelector(".details").innerHTML=details.map((details) => '<div>${details}</div>')
        .join("");
    } catch(error){
        weatherDataE1.querySelector(".icon").innerHTML="";
        weatherDataE1.querySelector(
            ".temperature"
            ).textContent = ""; 
        weatherDataE1.querySelector(".description").textContent= "An Error happened, please try again later";
        weatherDataE1.querySelector(".details").innerHTML="";
    }

}
