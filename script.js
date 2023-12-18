const todayBox = $('#today');
const searchHistory = $('#history');
const forecast = $('#forecast');
const searchButton = $('#search-button')

date = dayjs().format('DD/M/YYYY');
console.log(date);

key = '70e92f0336c7b26ba2ec74cbf63b789c'

//queryURL = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + key

searchButton.on('click', function(event){
    event.preventDefault();

    city = $('#search-input').val().trim();
    console.log(city);

    queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=' + key

    fetch(queryURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // today box

        todayBox.empty();
        cityName = $('<h2>');
        cityName.text(data.city.name + '(' + date + ')');
        icon = $('<img>');
        iconURL = 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png'; 
        icon.attr('src', iconURL)
        cityName.append(icon);

        cityTemp1 = $('<p>');
        cityTemp1.text('Temp: ' + data.list[0].main.temp + '°C');

        cityHumid1 = $('<p>')
        cityHumid1.text('Humidity: ' + data.list[0].main.humidity + '%');

        cityWind1 = $('<p>');
        cityWind1.text('Wind: ' + data.list[0].wind.speed + 'KPH')

        todayBox.append(cityName, cityTemp1, cityWind1, cityHumid1);

        // 5 day forecast
        forecast.empty();
        dataArray = data.list;
        console.log(dataArray)
        futuredate = dayjs().format('DD/MM/YYYY');

        for (let i = 6; i < dataArray.length; i++) {
          
          var forecastCard = $('<div>');
         forecastCard.addClass("card forecastCard");

          var foreCastDate = $('<h5>');

          foreCastDate.text(dataArray[i].dt_txt);
          
          var forecastTemp = $('<p>');
          var forecastWind = $('<p>');
          var forecastHumid = $('<p>');

          forecastIcon = $('<img>');
          forecastIconURL = 'http://openweathermap.org/img/w/' + dataArray[i].weather[0].icon + '.png';
          forecastIcon.attr('src', forecastIconURL)
          forecastTemp.text('Temp: ' + dataArray[i].main.temp + '°C')
          forecastHumid.text('Humidity: ' + dataArray[i].main.humidity + '%')
          forecastWind.text('Wind: ' + dataArray[i].wind.speed + 'KPH')

          forecastCard.append(foreCastDate, forecastIcon, forecastTemp, forecastWind, forecastHumid);
          forecast.append(forecastCard);

          i= i+7;
        }

      })

})

// When a user searches for a city they are presented with current and future conditions
// for that city and that city is added to the search history
// When a user views the current weather conditions for that city they are presented with:

// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed


// When a user view future weather conditions for that city 
//they are presented with a 5-day forecast that displays:

// The date
// An icon representation of weather conditions
// The temperature
// The humidity


// When a user click on a city in the search history they 
//are again presented with current and future conditions for that city


{/* <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> */}