import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

import '../css/login1.css';
import  logo1_white  from '../assets/logo1_white.png';
import { checkWebToken, updateWebPassword } from '../firebase';
import { DynamicAIIcon, Error, Language, Loader } from '../components/all';
import { Input } from '../components/login';

export function PasswordReset(){
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    return () => {};
  }, []);

  const checkToken = async () => {
    setDisabled(true);
    setLoading(true);
    setSuccess(false);
    let id = searchParams?.get('id');
    let token = searchParams?.get('token');
    // const response = await checkWebToken(id, token);
    // if(response?.error) setError(response?.error);
    // else setDisabled(false);
    setLoading(false);
  }

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
    if(password?.trim() === confirm?.trim()){
      setLoading(true);
      setSuccess(false);
    //   const id = searchParams?.get('id');
    //   const response = await updateWebPassword(id, password?.trim());
    //   if(response?.error) setError(response?.error);
    //   else {
    //     setSuccess(true);
    //     setTimeout(() => navigate('/'), 1800);
    //   }
    //   setLoading(false);
    } else setError(t('pass_match'));
  }

  const passProps = { label: 'login.password', value: password, setValue: setPassword, setError, isPassword: true, handleEnter };
  const confirmProps = { label: 'login.conf_password', value: confirm, setValue: setConfirm, setError, isPassword: true };

  return (
    <div className='login_back_3'>
      <img src={logo1_white} alt='Logo' className='login_form_logo3' />
      <div className='login_header_3'>
        <Language id='login_language_2' />
      </div>
      <form onSubmit={handleSubmit} className='login_form_3'>
        <p className='login_title_3'>{t('change')}</p>
        <Input {...passProps} />
        <Input {...confirmProps} />
        {error ? <Error error={error} id='login_error_3' /> : null}
        <button type='submit' className='login_form_btn' id='login_form_btn3' disabled={disabled}>
          {loading ? <Loader className='login_loader' color='#fff' /> : t('save')}
        </button>
        {success && <div className='sent_back'>
          <div className='sent_icon_back'><DynamicAIIcon className='sent_icon' name='AiOutlineCheck' /></div>
          <p className='sent_text'>{t('pass_success')}</p>
        </div>}
        <div className='rback_row'>
          <Link to='/' className='rback_link'>
            <DynamicAIIcon className='rback_icon' name='AiOutlineArrowLeft' />
            <span className='rback_text'>{t('login.login')}</span>
          </Link>
        </div>
      </form>
    </div>
  )
}