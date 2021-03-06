import React from 'react';

/**
 * 
 * @param {*} props
 * firsttext    = First Column DisplayText
 * firstdetail  = First Column Details/Explain/Subtext
 * secondtext   = Second Column DisplayText
 * seconddetail = Second Column Details/Explain/Subtext
 * rowclassname = More classes to add to row
 * 
 * Example:
 *      <Outputrow key='' firsttext='' firstdetail='' secondtext='' seconddetail='' rowclassname='' />
 * @returns 
 */
function Outputrow(props) {
    const FirstText              =  props.firsttext;
    const FirstDetail            = (props.firstdetail !== '' ? <><br /><span>{props.firstdetail}</span></> : '');
    const SecondText             = (props.secondtext !== '' ? props.secondtext : '');
    const SecondDetail           = (props.seconddetail !== '' ? <><br /><span>{props.seconddetail}</span></> : '');
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
     * Mark negative numbers red
     */
    if(SecondText.slice(0, 1) === '-' && SecondText.slice(0, 2) !== '-0') {
        Classes.push('Outputrow_Col2Red');
    }


    /**
     * Render:
     */
    return (
        <div className={Classes.join(' ')}>
            <div>{FirstText}:{FirstDetail}</div>
            <div>{SecondText}{SecondDetail}</div>
        </div>
    );
}

export default Outputrow;