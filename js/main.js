var weather;
weatherCity("cairo")
function weatherCity(city)
{
        var myHttp=new XMLHttpRequest()

        myHttp.open('GET',`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`)
        myHttp.send()
        myHttp.addEventListener("readystatechange",function()
        {
               
                if(myHttp.readyState==4&&myHttp.status==200)
                {
                      weather=JSON.parse(myHttp.response);
                      displayCurrent()
                      displayNext()
                }
        })
}

document.getElementById("searchInput").addEventListener("keyup", function(e) {
        weatherCity(e.target.value);
    });
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today;
function displayCurrent()

{
        var date=new Date();
        today=date.getDay();
        document.getElementById("today").innerHTML=
        `
        <div class="weather-head head1 d-flex justify-content-between p-2">
                <div class="day">${days[date.getDay()]}</div> 
                <div class="date">
                ${date.getDate() + monthNames[date.getMonth()]}
                </div>   
        </div>
        <div class="weather-content p-4">
                <div id="countery" class="location">${weather.location.name}</div>
                <div class="degree d-flex justify-content-between align-items-center">
                        <div class="num">${weather.current.temp_c}<sup>o</sup>C</div>
                        
                        <div class="degree-icon">
                                <img src="https:${weather.current.condition.icon}" id="img1" alt="" width="90">
                        </div>	
                </div>
                <div class="custom pb-3 pt-4" id='custom'>
                ${weather.current.condition.text}
                </div>
                <span class="pr-4"><img src="images/icon-umberella.png" alt="" class="pr-1">20%</span>
                <span class="pr-4"><img src="images/icon-wind.png" alt="" class="pr-1">18km/h</span>
                <span><img src="images/icon-compass.png" alt="" class="pr-1">East</span>
        </div>`
}
function displayNext()
{
        var cartonna="";
        var forecastArray=weather.forecast.forecastday;
        for(var i=1;i<forecastArray.length;i++)
        {
                cartonna+=
                
        `<div class="col-lg-6 pb-lg-0 pb-4">
                <div class='item  text-center'>
                        <div class="weather-head  text-center p-2">
                                <div class="day">${days[today+i]}</div>  
                        </div>
                        <div class="weather-content p-4">
                                <div class="degree-icon pb-4 pt-2">
                                        <img src="https:${forecastArray[i].day.condition.icon}" alt="" width="48">
                                </div>
                                <div class="degree-small ">
                                        <div class="num">${forecastArray[i].day.maxtemp_c}<sup>o</sup>C</div>
                                </div>
                                <div class="d-small">
                                ${forecastArray[i].day.mintemp_c}
                                        <sup>o</sup>
                                </div>
                                <div class="custom pb-5 pt-4">${forecastArray[i].day.condition.text}</div>
                        </div>
                </div>        
        </div>`
        }
        document.getElementById('next').innerHTML=cartonna
    
}