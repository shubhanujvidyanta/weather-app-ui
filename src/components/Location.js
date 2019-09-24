import React from 'react';
import { CurrentCard } from './CurrentCard';
import { ForecastCards } from './ForecastCards';


function cloneAsObject(obj) {
    if (obj === null || !(obj instanceof Object)) {
        return obj;
    }
    var temp = (obj instanceof Array) ? [] : {};
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (var key in obj) {
        temp[key] = cloneAsObject(obj[key]);
    }
    return temp;
}

export class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            latitude: null,
            longitude: null,
            isLocationAvl: false
        };

    }

    componentWillMount() {
        this.findLocation();
    }



    findLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                var pos = position;
                let location = JSON.stringify(cloneAsObject(pos));
                this.setState({
                    location: location,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    isLocationAvl: true
                });
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    render() {
        const isLocationAvl = this.state.isLocationAvl;
        return (
            <div>
                {isLocationAvl ? (
                    <div>
                        <div id="currentDay">
                            <CurrentCard latitude={this.state.latitude} longitude={this.state.longitude}/>
                        </div>
                        <div id="nextDays" className="next-days" style={{ display: 'inline' }}>
                            <ForecastCards latitude={this.state.latitude} longitude={this.state.longitude}/>
                        </div>
                    </div>)
                    : <p>Fetching Location!!</p>
                }
            </div>
        )
    }
}