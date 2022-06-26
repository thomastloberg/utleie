import React from 'react';
import { readableNumber, removeSpaces, addClasses } from '../js/Functions';

/**
 * 
 * @param {*} props
 * text         = FirstColText to user
 * detail       = Comment under FirstColText/text to inform user
 * secondtext   = SecondColText to user
 * seconddetail = Comment under SecondColText/text to inform user
 * posttext     = Text after the inputfield. Example: kr / %
 * type         = number / text / select
 * range        = select range min-max
 * rowclassname = More classes to add
 * state        = {id, value({}), setState({})}
 * 
 * Example:
 *      <Inputrow text='' detail='' posttext='' type='' range='' rowclassname='' state={'id', value({}), setState({})) />
 * @returns 
 */
function Inputrow(props) {
    const component_id           = props.state[0];          // ComponentID  -string
    //console.log(component_id);
    const state_value            = props.state[1];          // value({})    -array
    const state_setValue         = props.state[2];          // setValue({}) -array

    const FirstColText           = props.text;
    const FirstColDetail         = (props.detail !== '' ? <><br /><span>{props.detail}</span></> : '');

    const SecondColText           = props.secondtext;
    const SecondColDetail         = (props.seconddetail !== '' ? <><br /><span>{props.seconddetail}</span></> : '');

    const Type                   = props.type;
    
    const PostInputText          = (props.posttext !== '' ? props.posttext : '');
    const SelectRange            = props.range;             /* min-max */
    let Classes                  = ['Row'];


    /**
     * Add default class 'Row' and all classes in props.rowclassname
     */
    Classes = addClasses(Classes, [props.rowclassname]);


    /**
     * Eventhandlers()
     *      handleChange:   Remove last number first
     *      handleClick:    Move cursor to ending
     */
    const handleChange = (e) => {
        switch (String(Type).toLowerCase().trim()) {
            case 'number':
                if(isNaN(removeSpaces(e.target.value))){                                /* Not a Number - Prevent change */
                    e.preventDefault();
                    
                }
                else if(e.target.value === ''){
                    state_setValue({ ...state_value, [component_id]: 0 });

                }
                else if(e.target.value.substring(0, 1) === 0){                           /* Remove leading 0 */
                    state_setValue({ ...state_value, [component_id]: Number(removeSpaces(e.target.value.substring(1))) });

                } 
                else if(e.target.value.length < state_value[component_id].length){      /* Remove last number */
                    state_setValue({ ...state_value, [component_id]: Number(removeSpaces(state_value[component_id].slice(0, -1))) });

                } 
                else {                                                                  /* Allow new number */
                    state_setValue({ ...state_value, [component_id]: Number(removeSpaces(e.target.value)) });

                }
                break;
            case 'select':
                state_setValue({ ...state_value, [component_id]: e.target.value });
                break;
            case 'checkbox':
                state_setValue({ ...state_value, [component_id]: !state_value[component_id] });
                break;
            case 'text':
                state_setValue({ ...state_value, [component_id]: e.target.value });
                break;
            default:
                state_setValue({ ...state_value, [component_id]: e.target.value });
                break;
        }
    }
    const handleClick = (e) => {
        const {value} = e.target;
        const position = value.length;
        e.target.setSelectionRange(position, position);
    }


    /**
     * Render Correct Input Type:
     */
    switch (String(Type).toLowerCase().trim()) {
        case 'number':
            return (
                <div className={Classes.join(' ')}>
                    <div>{FirstColText}:{FirstColDetail}</div>
                    <div><input type="text" className="number" value={readableNumber(state_value[component_id])} onClick={handleClick} onChange={handleChange} />{PostInputText}{SecondColText}{SecondColDetail}</div>
                </div>
            );
        case 'select':
            const Range_Min = SelectRange.split('-')[0];
            const Range_Max = SelectRange.split('-')[1];
    
            var options = [];
            for (var i = Range_Min; i <= Range_Max; i++) {
                options.push(<option key={i} value={i}>{i}{PostInputText}</option>);
            }
    
            return (
                <div className={Classes.join(' ')}>
                    <div>{FirstColText}:{FirstColDetail}</div>
                    <div>
                        <select defaultValue={state_value[component_id]} type="text" onChange={handleChange}>
                            {options}
                        </select>{SecondColText}{SecondColDetail}
                    </div>
                </div>
            );
        case 'checkbox':
            return (
                <div className={Classes.join(' ')}>
                    <div className='TwoToOneRow'>
                        <input type="checkbox" checked={state_value[component_id]} onChange={handleChange} />
                        <span className="noselect" onClick={handleChange}>{FirstColText}</span>
                    </div>
                </div>
            );
        case 'text':
            return (
                <div className={Classes.join(' ')}>
                    <div>{FirstColText}:{FirstColDetail}</div>
                    <div><input type="text" value={state_value[component_id]} onClick={handleClick} onChange={handleChange} />{PostInputText}{SecondColText}{SecondColDetail}</div>
                </div>
            );
        default:
            return (
                <div className={Classes.join(' ')}>
                    <div>{FirstColText}:{FirstColDetail}</div>
                    <div><input type="text" value={state_value[component_id]} onClick={handleClick} onChange={handleChange} />{PostInputText}{SecondColText}{SecondColDetail}</div>
                </div>
            );
    }
}

export default Inputrow;