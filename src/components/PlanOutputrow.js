import React from 'react';

/**
 * 
 * @param {*} props
 * rowIndex       = Row Index
 * display[]    = Array
 * 
 * Example:
 *      <PlanOutputrow rownum='' display={[array]} />
 * @returns 
 */
function PlanOutputrow(props) {
    let rowIndexDisplay = <span>{props.rowIndex}. </span>;


    const DisplayArray  =  props.display.map((aClass, index) => {
        // If value is negative. Make div fontcolor red.
        let negativeValueClass = '';
        if(aClass.slice(0, 1) === '-') negativeValueClass = 'negativeValue';

        
        return <div key={index} className={negativeValueClass}>{(index === 0 ? rowIndexDisplay : '')}{aClass}</div>;
    });

    /**
     * Render:
     */
    return (
        <div key={props.rownum} className="YearByYearTable_Row">
            {DisplayArray}
        </div>
    );
}

export default PlanOutputrow;