import React from 'react';
import { Cards } from './Cards';



export class WeatherOfCard extends React.Component {

    render() {
        const weather = this.props.weather.weather;
        return (<div id="weatherOfCard">
            {Object.keys(weather).map((key, index) => {
                var newObj = weather[key];
                return (<div id={index}>
                    {newObj.map((innerKey, index) => {
                        return (
                                <Cards weatherObj={innerKey} />
                        )
                    }
                    )}
                    )
                </div>)
            }
            )
            }
        </div>
        );
    }
}