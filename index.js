async function weather (city){
    let response = await fetch (`http://api.weatherapi.com/v1/forecast.json?key=83649de64cd741cebca150812221512&q=${city}&days=7&aqi=yes&alerts=yes`);
    let data = await response.json();
    let currentWeather = data.current;
    let location = data.location;
    let days = data.forecast.forecastday;
    // console.log(days);
    let result = document.querySelector('.result .now');
    let forecast = document.querySelector('.result .later');
    let first4Hours = '';
    let nextHours = '';
    for (let i = 0; i < 24; i++){
        if (i < 5){
            first4Hours += `
            <div class="hours d-flex justify-content-between align-items-center pt-2 border-top border-dark">
                <p>${days[0].hour[i].time}</p>
                <p>${days[0].hour[i].temp_c}&#8451</p>
                <img src="http:${days[0].hour[i].condition.icon}"/>
            </div>
            `;}
        else {
            nextHours += `
            <div class="hours d-flex justify-content-between align-items-center pt-2 border-top border-dark">
                <p>${days[0].hour[i].time}</p>
                <p>${days[0].hour[i].temp_c}&#8451</p>
                <img src="http:${days[0].hour[i].condition.icon}"/>
            </div>
            `;}
    }
    result.innerHTML = `


    <!-- adding summary card -->
    <div class="card shadow mb-2" id="card">
    <div class="card-cover">
        <div class="card-header text-light">
            ${location.name}, ${location.country}
        </div>
        <div class="card-body text-light fw-bold d-flex justify-content-between">
            <div>
                <p class="card-text">Currently: </p>
                <h5 class="card-title">${currentWeather.temp_c}&#8451</h5>
                <p class="card-text">Condition: ${currentWeather.condition.text}</p>
            </div>
            <div>
                <img src="http:${currentWeather.condition.icon}"/>
            </div>
        </div>
    </div>
    </div>
    <!-- adding condition box -->
    <div class="conditions shadow p-2 card w-100">
        <h4 class="p-2"> Weather Today in ${location.name}, ${location.country}</h4>
        <!-- <hr> -->
        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
            <p>Max Temp</p>
            <p>${days[0].day.maxtemp_c}&#8451</p>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
            <p>Average Temp</p>
            <p>${days[0].day.avgtemp_c}&#8451</p>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
            <p>Min Temp</p>
            <p>${days[0].day.mintemp_c}&#8451</p>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
            <p>Wind Speed</p>
            <p>${currentWeather.wind_kph} kph</p>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
            <p>Wind Direction</p>
            <p>${currentWeather.wind_degree} ${currentWeather.wind_dir}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
            <p>Humidity</p>
            <p>${days[0].day.avghumidity}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
            <p>CO</p>
            <p>${currentWeather.air_quality.co}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
            <p>SO2</p>
            <p>${currentWeather.air_quality.so2}</p>
        </div>
    </div>

                
    `;
    forecast.innerHTML = `
                    <div class="hourly shadow card p-2 pb-0">
                        <!-- here we can see 4 next hours conditions -->
                        <div class="shown p-2">
                            <h4>Today's hourly forecast for ${location.name}, ${location.country}</h4>
                            ${first4Hours}
                        </div>
                        <button class="btn btn-primary ">more hours</button>
                        <div class="hiddenHours p-2 pt-0">
                            ${nextHours}
                        </div>
                    </div>
                    
    `;
    let hours = document.querySelector('.result .hourly .hiddenHours div');
    let colapse = document.querySelector('.result .hourly .hiddenHours');
    let moreInfo = document.querySelector('.result .hourly button')
    moreInfo.addEventListener("click", e => {
        e.preventDefault();
        console.log(hours);
        if (colapse.style.maxHeight === ''){
            colapse.style.maxHeight = '1500px';
            colapse.style.visibility = 'visible';
            hours.style.borderTop = '1px solid #0d6efd';
            moreInfo.innerHTML = 'less hours';
        } else {
            colapse.style.maxHeight = '';
            colapse.style.visibility = 'hidden';
            moreInfo.innerHTML = 'more hours';
        }
    })
}

// adding city to weather function
let city = document.querySelector('#city');
city.addEventListener('submit', e => {
    e.preventDefault();
    weather(e.target.city.value);
    e.target.city.value = '';
})
weather('tehran');
