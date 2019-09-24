import React from 'react';
import NumberFormat from 'react-number-format';
import { daysOfWeek } from './constants';


export class WeatherOfDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sunrise: null,
            sunset: null,
            time: null,
            city: null,
            weatherDesc: null,
            weatherText: null,
            day: null,
            temp: null,
            temp_min: null,
            temp_max: null,
            humidity: null,
            icon: null
        }
    }

    componentDidMount() {
        this.formatWeather();
    }

    formatWeather() {
        const { sunrise,sunset,time,city, weatherDesc,weatherText, temp, temp_min, temp_max, humidity, icon } = this.props.weather;
        var day=new Date().getDay();
        var dayofWeek = daysOfWeek[day];
        var epochTime=new Date(0);
        epochTime.setUTCSeconds(time);
        let timeIST=epochTime.toLocaleTimeString();
        epochTime=new Date(0);
        epochTime.setUTCSeconds(sunrise);
        let sunriseIST=epochTime.toLocaleTimeString();
        epochTime=new Date(0);
        epochTime.setUTCSeconds(sunset);
        let sunsetIST=epochTime.toLocaleTimeString();



        this.setState({
            sunrise: sunriseIST,
            sunset: sunsetIST,
            time: timeIST,
            city: city,
            weatherDesc: weatherDesc,
            weatherText: weatherText,
            day: dayofWeek,
            temp: temp,
            temp_min: temp_min,
            temp_max: temp_max,
            humidity: humidity,
            icon: icon
        })

    }

    render() {
        const { sunrise,sunset,time,city, weatherDesc,weatherText, day, temp, temp_min, temp_max, humidity, icon } = this.state;

        return (
            <div id={day}>
                <div id="city"> <h1>You are in {city}</h1></div>
                <div id="dayTime">
                Sunrise: {sunrise} / Sunset: {sunset}
                </div>
                <div id="dayOfWeek">{day}</div>
                <div id="currentTemp" className="current-temp"><h2> <NumberFormat value={temp} displayType={'text'} format="##" />&#8451; </h2> </div>
                <div id="currentRange" className="current-range"><NumberFormat value={temp_max} displayType={'text'} format="##" />&#8451; /<NumberFormat value={temp_min} displayType={'text'} format="##" />&#8451;  </div>
                <div id="weather">
                    <img src={icon}  alt={weatherText}/> <br />
                    Weather: {weatherDesc} <br />
                    Humidity: <NumberFormat value={humidity} displayType={'text'} suffix={'%'} /> <br />
                </div>

                <div id="metaText">
                    Last Updated @ {time}
                </div>
            </div>

        )
    }
}