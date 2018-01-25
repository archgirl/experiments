/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});

$(document).ready(function() {
  loadWeather('Albuquerque',''); //@params location, woeid
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      html =  '<h1><i class="wi wi-yahoo-'+weather.code+'"></i></h1>';
      html += '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<h4>'+weather.alt.temp+'&deg;'+weather.units.temp+'</h4>';
      html += '<ul><li class="location">'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li class="wind">'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
      html += '<ul class="rise-set"><li class="sunrise"><i class="wi wi-sunrise"></i>'+weather.sunrise+'</li>';
      html += '<li class="sunset"><i class="wi wi-sunset"></i>'+weather.sunset+'</li></ul><section class="sevenday">';
      
      for(var i=0;i<weather.forecast.length;i++) {
        html += '<div class="forecast">',
        html += '<p class="day">'+weather.forecast[i].day+'</p>',
        html += '<div class="lowhigh"><p class="high">'+weather.forecast[i].high+'&deg;</p>',
        html += '<p class="low">'+weather.forecast[i].low+'&deg;</p></div></div>';
      }
      
      var timestamp = moment(weather.updated);
      html += '</section><p class="updated">Updated '+moment(timestamp).fromNow()+'</p>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
};
