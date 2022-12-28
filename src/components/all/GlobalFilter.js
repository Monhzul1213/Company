import React from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { DynamicAIIcon } from './DynamicIcon';

export const GlobalFilter =({filter, setFilter}) =>{

    return(
        <div className='filter_input_back'>
              <DynamicAIIcon className='filter_icon' icon={AiOutlineSearch} />
            
            {/* <input  
             className='filter_input' value={filter || ''} 
            onChange={(e)=> setFilter(e.target.value)}/> */}
    </div>
    // </div>
    )
}