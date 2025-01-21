
const container = document.querySelector(".container"),
    subContainer = document.querySelector(".subContainer"),
    inputField = document.querySelector("input"),
    submit = document.querySelector("button"),
    weatherInfo = document.querySelector(".weatherInfo"),
    displayInfo = document.querySelector(".displayInfo"),
    addError = document.querySelector(".addError"),
    arrowBack = container.querySelector("h1 i"),
    apikey = `b49ee8f728d6a66f93756323af0bb5e2`,
    colorBtn = document.querySelectorAll(".colorBtn"),
    colorPalette = document.querySelector(".color-palette"),
    wIcon = weatherInfo.querySelector("img");

submit.addEventListener("click", () => {
    if (inputField.value != "") {
        getWeather(inputField.value);
    } else {
        addError.classList.remove("addError");
        addError.innerText = "Please enter city name";
    }
});
const getWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`).then(response => response.json()).then(response => {
        if (response.cod != "404") {
            colorPalette.classList.add("display");
            displayInfo.style.display = "block";
            subContainer.style.display = "none";
            arrowBack.style.display = "inline";
            console.log(response);
            temp = response.main.temp
            feels_like = response.main.feels_like;
            humidity = response.main.humidity
            names = response.name
            country = response.sys.country
            description = response.weather[0].description;
            id = response.weather[0].id;
            if (id == 800) {
                wIcon.src = "icons/clear.svg";
            } else if (id >= 200 && id <= 232) {
                wIcon.src = "icons/storm.svg";
            } else if (id >= 600 && id <= 622) {
                wIcon.src = "icons/snow.svg";
            } else if (id >= 701 && id <= 781) {
                wIcon.src = "icons/haze.svg";
            } else if (id >= 801 && id <= 804) {
                wIcon.src = "icons/cloud.svg";
            } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
                wIcon.src = "icons/rain.svg";
            }
            detail();
        } else {
            addError.classList.remove("addError");
            addError.innerText = "City name is invalid";
        }
    })
        .catch(err => console.error(err));
}

const detail = () => {
    weatherInfo.querySelector(".temp .num").innerText = Math.floor(temp);
    weatherInfo.querySelector(".humidity span").innerText = `${humidity}%`;
    weatherInfo.querySelector(".details .num2").innerText = Math.floor(feels_like);
    weatherInfo.querySelector(".weather").innerText = `${description}`;
    weatherInfo.querySelector(".area").innerText = `${names}, ${country}`;
}

arrowBack.addEventListener("click", () => {
    colorPalette.classList.remove("display");
    displayInfo.style.display = "none";
    subContainer.style.display = "block";
    arrowBack.style.display = "none";
    addError.classList.add("addError");
    inputField.value = "";
});

colorBtn.forEach(colorBtn => {
    let color = colorBtn.getAttribute("color");
    colorBtn.addEventListener("click", () => {
        document.querySelector(":root").style.setProperty("--color", color);
    });
});

