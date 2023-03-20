import React from "react";
import { DynamicAIIcon } from './DynamicIcon';

export const ColumnFilter =({column}) =>{
    const {filtervalue, setFilter}= column
    // const {handleClick}=column
    return(
    <span>
            <DynamicAIIcon name='AiOutlineSearch'// onClick={handleClick} 
            />
            {/* <button icon={AiOutlineSearch}></button> */}
            <input  value={filtervalue } 
            onChange={(e)=> setFilter(e.target.value)}/>
    </span>
    )
}