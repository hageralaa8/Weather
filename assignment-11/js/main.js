// Today variables 
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")

// next data 
let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")

// search input 
let searchInput  = document.getElementById("search")



//1- fetch defaut method bta3tha get
//2- (pending (data take time))-->solution await --> shart async by defalut return promise

//fetch API data 
async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)//promise (pending)-->soultion 
    let weatherData = await weatherResponse.json(); //3ashn ageb el data nafsha bast5dm json
    return weatherData; 
}


//display Today data  (b3ml concation w a5od kol el asamy el key gwa el Api) 1-location{data} 2-current{data}.condition{data}
function displayToday(data)
{
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})// 3aiza a3rf degree inharda f lazm a3rf el yom bgebo
    todayNumber.innerHTML = todayDate.getDate() // getDate -->return rakm el yom fe shahr
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})//toLocaleDateString-->(1- format nafso ("en-US") , object{ options weekday/month:long->asm el yom kamel} ")
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",`https:${data.current.condition.icon}`)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%" //concancat + "%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}



//display next days data
function displayNextData(data) {
    let forecastData = data.forecast.forecastday
    //for loop 3ashn ageb el yomen wra b3d
    for (let i = 0 ; i < 2; i++) //i= index
    {
        let nextDate = new Date(forecastData[i + 1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-Us", { weekday: "long" })
        nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c
        // console.log(forecastData[i + 1].day);
        nextConditionImg[i].setAttribute("src", `https:${forecastData[i+1].day.condition.icon}`) //handel el error el img w a7ot protcol hhtps:

        // console.log(nextConditionText[0])
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}



// start app -->collecting all call functions {getWeatherData()+ displayToday() + displayNextData()} 
async function startApp(city="london") //baftrd ay paremeter city="default value"
{
    let weatherData = await getWeatherData(city)
    //cheak lw rag3ly weatherData.error mat3rdsh el data not(!)
    if(!weatherData.error)
  //false 0 undi null "" -->if condition=false {!false=true}
    {
        displayToday(weatherData)
        displayNextData(weatherData)
    }
}
startApp()



searchInput.addEventListener("input",function(){
    // console.log(searchInput.value);
    startApp(searchInput.value)
})

































