import React from 'react';
import './Cards.css';
import {WeatherComponent} from './WeatherComponent';



export class ForecastCards extends React.Component {

    render() {
        return (
            <div id="cardsParent" >
                <WeatherComponent lat={this.props.latitude} lon={this.props.longitude} currentDay='false' />
            </div>
        )
    }
}