import React from 'react';
import { WeatherOfDay } from './WeatherOfDay';
//import { Keys } from './constants';
import { WeatherOfCard } from './WeatherOfCard';
import axios from 'axios';




export class WeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCallDone: false,
            isCurrentDay: false,
            weather: null
        }
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather() {
        //const apiKey = Keys.development.WEATHER_API_KEY;
        //const measurementUnit = Keys.development.WEATHER_API_MEASUREMENT_UNIT;
        let currentDay = (this.props.currentDay === 'true');
        var self = this;
        if (currentDay) {
            var date = new Date();
            var starttime = date.getTime();
            var url = 'http://localhost:8080/weather/getCurrentDayWeather?lat=' + this.props.lat + '&long=' + this.props.lon;
            //var url = 'https://api.openweathermap.org/data/2.5/weather?units=' + measurementUnit + '&lat=' + this.props.lat + '&lon=' + this.props.lon + '&appid=' + apiKey;
            axios.get(url)
                .then(function (response) {
                    console.debug("In then block!!");
                    self.setState({
                        isCurrentDay: true,
                        isCallDone: true,
                        weather: response.data
                    })
                    var dateEnd = new Date();
                    var endtime = dateEnd.getTime();
                    console.log("Rest api time: " + (endtime - starttime));
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.debug("In finally block!!")
                });


        }
        else {
            date = new Date();
            starttime = date.getTime();
            url = 'http://localhost:8080/weather/getForecastWeather?lat=' + this.props.lat + '&long=' + this.props.lon;
            //var url = 'https://api.openweathermap.org/data/2.5/weather?units=' + measurementUnit + '&lat=' + this.props.lat + '&lon=' + this.props.lon + '&appid=' + apiKey;
            axios.get(url)
                .then(function (response) {
                    console.debug("In then block!!");
                    self.setState({
                        isCurrentDay: false,
                        isCallDone: true,
                        weather: response.data
                    })
                    var dateEnd = new Date();
                    var endtime = dateEnd.getTime();
                    console.log("Rest api time: " + (endtime - starttime));
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.debug("In finally block!!")
                });

        }

    }



    render() {
        const isCurrentDay = this.state.isCurrentDay;
        const isCallDone = this.state.isCallDone;

        let WeatherObj= {};

        if (isCallDone && isCurrentDay) {
            var weather = this.state.weather;
            WeatherObj = {
                'sunrise': weather.sys.sunrise,
                'sunset': weather.sys.sunset,
                'time': weather.dt,
                'city': weather.name,
                'weatherDesc': weather.weather[0].main,
                'weatherText': weather.weather[0].description,
                'temp': weather.main.temp,
                'temp_min': weather.main.temp_min,
                'temp_max': weather.main.temp_max,
                'humidity': weather.main.humidity,
                'icon': 'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'
            };
        }
        else if (isCallDone && !isCurrentDay) {
            WeatherObj = {'weather': this.state.weather};
        }
        return (
            <div >
                {isCallDone ? isCurrentDay ?
                    <WeatherOfDay weather={WeatherObj} /> : <WeatherOfCard weather={WeatherObj} />
                    : <p>Weather is loading!!</p>
                }
            </div>
        )
    }

}