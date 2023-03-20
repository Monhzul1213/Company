import React from 'react';
import { useTranslation } from 'react-i18next';

import { Error1 } from './Error1';

export function CardInput1(props){
  const { label, value, setValue, handleEnter, disabled } = props;
  const { t } = useTranslation();

  const onChange = e => setValue({ value: e?.target?.value});

  const onKeyDown = e => {
    if(e?.key === 'Enter') handleEnter && handleEnter(e);
  }

  return (
    <div className='card_input_container'>
      <p className='card_input_label1'>{t(label)}</p>
      <input className='card_input3'
        disabled={disabled}
        value={value?.value}
        onChange={onChange}
        onKeyDown={onKeyDown} />
      {value?.error ? <Error1 label={label} error={value?.error} fromForm={true} /> : null}
    </div>
  )
}