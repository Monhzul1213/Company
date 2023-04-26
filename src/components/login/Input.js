import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input as AntInput } from 'antd';

export function Input(props){
  const { label, value, setValue, isPassword, handleEnter, setError, id } = props;
  const { t } = useTranslation();

  const onChange = e => {
    setValue(e?.target?.value);
    setError && setError('');
  }

  const inputProps = { onKeyDown: handleEnter, value, onChange, placeHolder: t(label) };

  return (
    <div className='login_input_container3'>
      {isPassword
        ? <AntInput.Password {...inputProps} className = 'pass' />
        : <div className='login_input_back3'><AntInput {...inputProps} id={id} /></div>
      }
    </div>

  )
  

 
}