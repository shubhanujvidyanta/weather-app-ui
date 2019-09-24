import React from 'react';
import './Cards.css';
import {WeatherComponent} from './WeatherComponent';



const boxStyle = {
    backgroundColor: 'white',
    fontFamily: ("Times New Roman", 'Times', 'serif'),
    width: "80%",
    border: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 5,
    margin: 2,
    textAlign: 'left'
}


export class CurrentCard extends React.Component {
   
    render() {
        return (
            <div style={boxStyle}>
                <WeatherComponent lat={this.props.latitude} lon={this.props.longitude} currentDay='true'/>
            </div>
        )
    }
}