import React, { useState } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { useTranslation } from 'react-i18next';

import { Error } from './Error';


  const Option = (props) => {
    return (
      <div className="option" >
        <components.Option {...props} style>
          <input  
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          /> 
          {" "}
          
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      height: state.isSelected ? '20px' : '20px',
      paddingTop: 0,
      
    }),
   
  
  }
export function CardDropdown(props){
  const { label, value, setValue, handleEnter,onFocus,  disabled, id } = props;
  const { t } = useTranslation();

  const onChange = e => {
    console.log('----------', e, '------');
    setValue({value: e});
  };

  const Options = [
    { label: "Бараа материал : Багцлалт", value: 'INAS' },
      { label: "Бараа материал : Тохируулга", value: 'INAJ' },
      {label: "Бараа материал : Зарлага", value: 'INII' },
      {label: "Бараа материал : Тооллого", value: 'INPI' },
      // { label: "Бараа материал : Орлого", value: 'INRC' },
      // { label: "Бараа материал : Шилжүүлэг", value: 'INTR' },
      { label: "Борлуулалт : Буцаалтын орлого", value: 'PSCM' },
      { label: "Борлуулалт : Зарлага", value: 'PSIN' }
    ];

  return(
    <div className="card_input_container"  >
      <p className='card_input_label'>{t(label)}</p>
      <ReactSelect 
      placeholder={t('txntype_enter')}
      styles={customStyles}
      options={Options}
       isMulti
       closeMenuOnSelect={false}
       hideSelectedOptions={false}
       value={value?.value}
       components={{
        Option
      }}
      onChange={onChange}
      />
      {value?.error ? <Error label={label} error={value?.error} fromForm={true} /> : null}
    </div>
   
    );
}

