import React, { useState } from 'react';
import { TexttoID, readableNumber } from '../js/Functions';

function Rowinput(props) {
    const ID                     = 'input_' + TexttoID(props.text);
    const DisplayText            = props.text;
    //const DetailText             = <><br /><span>{props.detail}</span></>;
    const DetailText             = (props.detail == '' ? <><br /><span>{props.detail}</span></> : '');
    const DefaultValue           = props.defaultvalue;
    const [inputValue, setValue] = useState(readableNumber(DefaultValue));


    function handlerInputChange(e){
        /**
         * Remove last letter first
         */
        if(e.target.value.length < inputValue.length){
            setValue(readableNumber(inputValue.slice(0, -1)));
        } else {
            setValue(readableNumber(e.target.value));
        }
    }

    return (
         <div className="Row">
			<div>{DisplayText}:{DetailText}</div>
			<div><input id={ID} type="text" className="number" value={inputValue} onChange={handlerInputChange} /> kr</div>
		</div>
    );
}

export default Rowinput;