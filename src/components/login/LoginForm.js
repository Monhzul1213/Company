import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { logo2 } from '../../assets';
import { login } from '../../firebase';

import { Error, Loader, Language } from '../all';
import { Input } from './';

export default function LoginForm(){
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnter = e => {
    if (e?.key?.toLowerCase() === "enter") {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    login(email?.trim(), password?.trim())
    .then(response => {  
      if(response?.error){
        setError(response?.error);
      }
      setLoading(false);
    });
  }

  const nameProps = { label: 'login.user', value: email, setValue: setEmail,handleEnter,  setError };
  const passProps = { label: 'login.password', value: password, setValue: setPassword, setError, isPassword: true };
  
  return (
    <div className='login_form_container'>
      <div className='login_form_title_row'>
          <Language />
        </div>
      <img src={logo2} alt='Logo' className='login_form_logo' />
      <p className='admin'>COMPANY</p>
      
      <form onSubmit={handleSubmit} className='login_form_back'>
        <Input {...nameProps} />
        <Input {...passProps} />
        {error ? <Error error={error} /> : null}
        <button type='submit' className='login_form_btn'>
          {loading ? <Loader className='login_loader' color='#fff' /> : t('login.login')}
        </button>
      </form>
      <a className='copyright_text' target="_blank" href={'https://' + t('login.link')}>{t('login.link')}</a>
    </div>
  )
} 