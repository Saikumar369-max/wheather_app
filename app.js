import { API_KEY } from "./config.js";

const cityinput = document.querySelector("#cityInput");
const btn = document.querySelector("#searchBtn");
const cityName = document.querySelector("#cityName");
const des = document.querySelector("#weatherDesc");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#windSpeed");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const temp = document.querySelector("#temp");


const API_key = API_KEY;


const getData = async(city) => {
    try {
        let response1 = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_key}`);
        let data1 = await response1.json();
        if(data1.length===0) {
          alert("City Not found");
          return;
        }
        let long = data1[0].lon;
        let latt = data1[0].lat;
        let response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${latt}&lon=${long}&appid=${API_key}`);
        if(!response2.ok) {
            throw new Error("Failed to fetch weather data");
        }
        let data2 = await response2.json();
        if(!data2.main || !data2.weather) {
            throw new Error("Incomplete weather Data recieved");
        }

        temp.innerText = data2["main"].temp;
        des.innerText = data2.weather[0].description;
        humidity.innerText = `${data2["main"].humidity}%`;
        wind.innerText = `${data2["wind"].speed}km/h`;
        sunrise.innerText = new Date(data2.sys.sunrise * 1000).toLocaleTimeString();
        sunset.innerText = new Date(data2.sys.sunset * 1000).toLocaleTimeString();
        cityName.innerText = data2["name"];
    }
    catch(error){
        alert("Something went wrong: ",error.message);
    }
}

btn.addEventListener("click",() => {
    let city = cityinput.value;
    if(city==="") {
        alert("please enter city name");
        return;
    }
    getData(city);
});


