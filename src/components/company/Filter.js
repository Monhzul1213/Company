import React from 'react';
import '../../css/filter.css';
import { AddButton } from '../all';

export function Filter(props){
  const {  addRequest} = props;

  return (
    <div className='filter_container2'>
       
      <AddButton onClick={addRequest} />
    </div>
  )
}