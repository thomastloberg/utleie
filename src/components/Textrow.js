import React from 'react';

/**
 * 
 * @param {*} props
 * firstcol      = JSX displaytext in first column
 * secondcol     = JSX displaytext in second column
 * @returns 
 */
function Textrow(props) {
    const FirstColumn            = props.firstcol;
    const SecondColumn           = props.secondcol;

    if(SecondColumn !== undefined){                // Dual Row
        return (
            <div className="Row">
               <div>{FirstColumn}</div>
               <div>{SecondColumn}</div>
            </div>
       );
       
    } 
    else if(SecondColumn === undefined){           // Single Row
        return (
            <div className="Row">
               <div className="TwoToOneRow">{FirstColumn}</div>
            </div>
       );
    }
}

export default Textrow;