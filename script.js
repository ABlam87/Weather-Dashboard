const todayBox = $('#today');
const searchHistory = $('#history');
const forecast = $('#forecast');
const searchButton = $('#search-button')

date = dayjs().format('DD/M/YYYY');
key = '70e92f0336c7b26ba2ec74cbf63b789c'

//queryURL = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + key

// Loading Previous Search Buttons

var savedSearches = JSON.parse(localStorage.getItem("WeatherCities")) || [];

for (i = 0; i < savedSearches.length; i++) {
btn = $("<button>");
btn.addClass("btn btn-secondary history-btn")
btn.text(savedSearches[i]);
searchHistory.append(btn);}

// Weather Search Button

searchButton.on('click', function(event){
    event.preventDefault();

    city = $('#search-input').val().trim();
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
        futuredate = dayjs().format('DD/MM/YYYY');

        for (let i = 7; i < dataArray.length; i++) {
          
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

      // Create Button in history

  var newButton = $('<button>');
  newButton.text(city);
  newButton.addClass('btn btn-secondary history-btn');
  searchHistory.append(newButton);

      // Save to Local storage

  var savedSearches = JSON.parse(localStorage.getItem("WeatherCities")) || [];
  savedSearches.push(city);
  localStorage.setItem("WeatherCities", JSON.stringify(savedSearches))

      })

})

// Button Press of Saved City

$('.history-btn').on('click', function(event){
  event.preventDefault();

  city = $(this).text();
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
      futuredate = dayjs().format('DD/MM/YYYY');

      for (let i = 7; i < dataArray.length; i++) {
        
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
    }

  )



