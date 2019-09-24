import React from 'react';

const boxStyle = {
    backgroundColor: 'lightblue',
    width: 120,
    border: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 5,
    margin: 2,
    textAlign: 'left'
}

export class Cards extends React.Component {

    render() {
        let weatherObj = this.props.weatherObj;
        return (
            <div style={boxStyle}>
                {Object.keys(weatherObj).map((key) => {
                    return (
                        <div>
                            {key}
                        
                        </div>
                    )
                })}
            </div>
        )
    }

}