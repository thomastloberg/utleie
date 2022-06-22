import React, { useState } from 'react';

class Rowinput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ID:             'input_' + props.text.replace('æ', 'ae').replace('ø', 'o').replace('å', 'aa'),
            Text:           props.text,
            DefaultValue:   props.defaultvalue
        }
    }

    handleChange(event){

    }

    render() {
        return (
            <div className="Row">
				<div>{this.state.Text}:</div>
				<div><input id={this.state.ID} type="text" className="number" value={this.state.DefaultValue} onChange={this.handleChange} /> kr</div>
			</div>
        );
    }
}

export default Rowinput;