// set
const searchInput = document.getElementById('search-input')
const nowDetails = document.querySelector('.now-details')
const fiveDayForcast = document.querySelector('.forcast-5-days');
const highlitsContent = document.querySelector('.highlits-content');
const currentPositionBtn = document.getElementById('current-position')
const todayAtHours = document.querySelector('.hour-forcast');
// function fetch weather by city forcast 5 days and current
function fetchWeatherApi() {
    // fetch the weather api by city from open weather 
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=87eb5d5fe578ea62620e502373969d52&units=metric`).then(response => response.json()).then(data => {
         currentObservation(data)
         fiveDaylater(data);
         todayHighlits(data);
         hourlyForcast(data);
    })
    searchInput.value = '';
}
// make Enter key trigger the function 
searchInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        fetchWeatherApi();
    }
})
// adding current weather info to page
function currentObservation(data) {
    html = `
    <div class="now-head">
                <h3>Now</h3>
                <div class="degry">
                    <p>${Math.ceil(data.list[0].main.temp)}<span>c</span></p>
                    <img src="images/${data.list[0].weather[0].icon}.png" alt="">
                </div>
                <p id="status-text">${data.list[0].weather[0].description}</p>
            </div>
            <div>
                <ul>
                    <li><i id="date" class="fa-solid fa-calendar-days"></i>${(data.list[0].dt_txt).slice(0,11)}</li>
                    <li><i id="location" class="fa-solid fa-location-dot"></i>${data.city.name}</li>
                </ul>
            </div>
    `;
    nowDetails.innerHTML = html;
}

// five days forcast function
function fiveDaylater(data) {
    // to take the right date
    const dayOne = (data.list[3].dt).toString() + "001";
    const daytwo = (data.list[11].dt).toString() + "001";
    const dayThree = (data.list[19].dt).toString() + "001";
    const dayFour = (data.list[27].dt).toString() + "001";
    const dayFive = (data.list[35].dt).toString() + "001";
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday"];
    html = `
    <ul>
                <li>
                    <img src="images/${data.list[3].weather[0].icon}.png" alt="">
                    <p>${Math.ceil(data.list[3].main.temp)}</p>
                    <span>${(new Date(+dayOne)).toString().slice(3,10)}</span>
                    <span>${week[new Date(+dayOne).getDay()]}</span>
                </li>
                <li>
                    <img src="images/${data.list[11].weather[0].icon}.png" alt="">
                    <p>${Math.ceil(data.list[11].main.temp)}</p>
                    <span>${(new Date(+(daytwo))).toString().slice(3,10)}</span>
                    <span>${week[new Date(+daytwo).getDay()]}</span>
                </li>
                <li>
                    <img src="images/${data.list[19].weather[0].icon}.png" alt="">
                    <p>${Math.ceil(data.list[19].main.temp)}</p>
                    <span>${(new Date(+(dayThree))).toString().slice(3,10)}</span>
                    <span>${week[new Date(+dayThree).getDay()]}</span>
                </li>
                <li>
                    <img src="images/${data.list[27].weather[0].icon}.png" alt="">
                    <p>${Math.ceil(data.list[27].main.temp)}</p>
                    <span>${(new Date(+(dayFour))).toString().slice(3,10)}</span>
                    <span>${week[new Date(+dayFour).getDay()]}</span>
                </li>
                <li>
                    <img src="images/${data.list[35].weather[0].icon}.png" alt="">
                    <p>${Math.ceil(data.list[35].main.temp)}</p>
                    <span>${(new Date(+(dayFive))).toString().slice(3,10)}</span>
                    <span>${week[new Date(+dayFive).getDay()]}</span>
                </li>
    </ul>
    `;
    fiveDayForcast.innerHTML = html;
}

// add today Highlits
function todayHighlits(data) {
    const sunrise = (data.city.sunrise).toString() + "001";
    const sunset = (data.city.sunset).toString() + "001";
    html = `
    <div class="padd-15 m-b-20">
                    <p class="m-b-10">Wind</p>
                    <div class="display-flex-between m-b-10">
                        <i class="fa-solid fa-wind fa-2x"></i>
                        <div class="highlits-item">
                            <div>
                                <p>Deg</p>
                                <span>${data.list[0].wind.deg}</span>
                            </div>
                        </div>
                        <div class="highlits-item">
                            <div>
                                <p>Speed</p>
                                <span>${data.list[0].wind.speed} km</span>
                            </div>
                        </div>
                        <div class="highlits-item">
                            <div>
                                <p>Gust</p>
                                <span>${data.list[0].wind.gust} S</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="padd-15 m-b-20">
                    <p class="m-b-10">Atmosphere</p>
                    <div class="display-flex-between m-b-10">
                        <img class="width-20" src="images/50d.png" alt="">
                        <div class="highlits-item">
                            <div>
                                <p>Visibilty</p>
                                <span>${(data.list[0].visibility)/1000} km</span>
                            </div>
                        </div>
                        <div class="highlits-item">
                            <div>
                                <p>pressure</p>
                                <span>${data.list[0].main.pressure} hpa</span>
                            </div>
                        </div>
                        <div class="highlits-item">
                            <div>
                                <p>Humidity</p>
                                <span>${data.list[0].main.humidity} %</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="padd-15">
                    <p class="m-b-10">Sunrise & Sunset</p>
                    <div class="display-flex-between m-b-10">
                        <div class="highlits-item">
                            <i class="fa-regular fa-sun"></i>
                            <div>
                                <p>Sunrise</p>
                                <span>${new Date(+sunrise).getHours() % 12}:${new Date(+sunrise).getMinutes()} AM</span>
                            </div>
                        </div>
                        <div class="highlits-item">
                            <i class="fa-solid fa-moon"></i>
                            <div>
                                <p>Sunset</p>
                                <span>${new Date(+sunset).getHours() % 12}:${new Date(+sunset).getMinutes()} PM</span>
                            </div>
                        </div>
                    </div>
                </div>
    `;
    highlitsContent.innerHTML = html;
}
// current location function
function currentposition() {
const options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  };
  
  function success(pos) {
    const crd = pos.coords;
    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);

    // fetch waether api by lat & lon 
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&appid=87eb5d5fe578ea62620e502373969d52&units=metric`).then(response => response.json()).then(data => {
              currentObservation(data);
              fiveDaylater(data);
              todayHighlits(data);
              hourlyForcast(data);
          })
  }
  function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  
}   
currentposition()   ;

// Hourly Forcast
function hourlyForcast(data) {
    let timeOne = (new Date(data.list[0].dt_txt).getHours());
    let timetWO = (new Date(data.list[1].dt_txt).getHours());
    let timeThree = (new Date(data.list[2].dt_txt).getHours());
    let timeFour = (new Date(data.list[3].dt_txt).getHours());
    let timeFive = (new Date(data.list[4].dt_txt).getHours());
    let timeSix = (new Date(data.list[5].dt_txt).getHours());
    let timeSeven = (new Date(data.list[6].dt_txt).getHours());
    let timeEight = (new Date(data.list[7].dt_txt).getHours());
    let pmAm;
    let pmAmArr = [];
    let hours8Arr = [timeOne, timetWO, timeThree, timeFour, timeFive, timeSix, timeSeven, timeEight];
    for (let i = 0 ; i < hours8Arr.length ; i++) {
        // correct AM and PM bassed on the tiem
        if (hours8Arr[i] < 12) {
            pmAm = "AM";
            pmAmArr.push(pmAm);
        } else if(hours8Arr[i] >= 12) {
            pmAm = "PM";
            pmAmArr.push(pmAm);
        }
    }
    console.log(hours8Arr)
    html = `
    <div class="hour-item">
                        <p>${hours8Arr[0] % 12} ${pmAmArr[0]}</p>
                        <img src="images/01n.png" alt="">
                        <p>${Math.ceil(data.list[0].main.temp)}</p>
                    </div>
                    <div class="hour-item">
                        <p>${hours8Arr[1] % 12} ${pmAmArr[1]}</p>
                        <img src="images/${data.list[1].weather[0].icon}.png" alt="">
                        <p>${Math.ceil(data.list[1].main.temp)}</p>
                    </div>
                    <div class="hour-item">
                        <p>${hours8Arr[2] % 12} ${pmAmArr[2]}</p>
                        <img src="images/${data.list[2].weather[0].icon}.png" alt="">
                        <p>${Math.ceil(data.list[2].main.temp)}</p>
                    </div>
                    <div class="hour-item">
                        <p>${hours8Arr[3] % 12} ${pmAmArr[3]}</p>
                        <img src="images/${data.list[3].weather[0].icon}.png" alt="">
                        <p>${Math.ceil(data.list[3].main.temp)}</p>
                    </div>
                    <div class="hour-item">
                        <p>${hours8Arr[4] % 12} ${pmAmArr[4]}</p>
                        <img src="images/${data.list[4].weather[0].icon}.png" alt="">
                        <p>${Math.ceil(data.list[4].main.temp)}</p>
                    </div>
                    <div class="hour-item">
                        <p>${hours8Arr[5] % 12} ${pmAmArr[5]}</p>
                        <img src="images/${data.list[5].weather[0].icon}.png" alt="">
                        <p>${Math.ceil(data.list[5].main.temp)}</p>
                    </div>
                    <div class="hour-item">
                        <p>${hours8Arr[6] % 12} ${pmAmArr[6]}</p>
                        <img src="images/${data.list[6].weather[0].icon}.png" alt="">
                        <p>${Math.ceil(data.list[6].main.temp)}</p>
                    </div>
                    <div class="hour-item">
                        <p>${hours8Arr[7] % 12} ${pmAmArr[7]}</p>
                        <img src="images/${data.list[7].weather[0].icon}.png" alt="">
                        <p>${Math.ceil(data.list[7].main.temp)}</p>
                    </div>
    `;
    todayAtHours.innerHTML = html;
}





