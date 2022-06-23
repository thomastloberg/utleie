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
    const Classes                = ['Row'];


    /**
     * Add default class 'Row' and all classes in props.rowclassname
     */
    if(props.rowclassname === undefined) {                  // No class to add
    } else if(props.rowclassname.includes(' ')) {           // Multiple classes to add
        props.rowclassname.split(' ').each((aClass) => {
            Classes.push(aClass);
        });
    } else {                                                // Only one class to add
        Classes.push(props.rowclassname);
    }

    /**
     * Render Textrow
     */
    if(SecondColumn !== undefined){                // Dual Row
        return (
            <div className={Classes.join(' ')}>
               <div>{FirstColumn}</div>
               <div>{SecondColumn}</div>
            </div>
       );
       
    } 
    else if(SecondColumn === undefined){           // Single Row
        return (
            <div className={Classes.join(' ')}>
               <div className="TwoToOneRow">{FirstColumn}</div>
            </div>
       );
    }
}

export default Textrow;