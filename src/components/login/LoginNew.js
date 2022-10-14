

import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import {getUser} from '../../firebase';
import { login } from '../../firebase';

import { login as setLogin } from '../../services/login.slice';
import { config } from '../../helpers/login.config';
import  logo1_white  from '../../assets/logo1_white.png';
import { Error2, Language, Loader } from '../all';
import { Input } from './Input';
import { Social } from './Social';

export default function LoginNew(){
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [tVisible, setTVisible] = useState(false);
  const [tResponse, setTResponse] = useState(null);
  const [checked, setChecked] = useState(false);
  const user1 = useSelector(state => state.login.user1);
  const webUser = useSelector(state => state.login.webUser);
  const toRemember = useSelector(state => state.login.toRemember);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 useEffect(() => {
    if(user1) setEmail(user1);
    if(toRemember && webUser) setPassword(webUser);
    if(toRemember) setChecked(true);
    console.log('=========',user1)
    console.log('=========',webUser)

    return () => {};
  }, []);

const handleEnter = e => {
    if (e?.key?.toLowerCase() === "enter") {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  const showError = error => {
    setError(error);
    setLoading(false);
  }
 const showList = users => {
    setVisible(true);
    setList(users);
    setLoading(false)
  }
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    login(email?.trim(), password?.trim())
    .then(response => {
      dispatch(setLogin({user: email , webUser: password, toRemember: checked}))
        console.log(response)  
      if(response?.error == 'auth/user-not-found'){
        setError(t('errors.auth/user-not-found'));
      }
      else if(response?.error == 'auth/wrong-password'){
        setError(t('errors.auth/wrong-password'));
      }
      setLoading(false);
    })
    }

  const onForgot = () => {
    navigate({ pathname: "forgot_password", search: createSearchParams({ email }).toString()});
  }

  const nameProps = { label: 'login.user', value: email, setValue: setEmail,handleEnter,  setError };
  const passProps = { label: 'login.password', value: password, setValue: setPassword, setError, isPassword: true };

return (
    <div className='login_back_3'>
      <img src={logo1_white} alt='Logo' className='login_form_logo3' />
      <div className='login_header_3'>
        <Language id='login_language_2' />
      </div>
      <form onSubmit={handleSubmit} className='login_form_3'>
        <p className='login_title_3'>{t('print.company')}</p>
        <Input {...nameProps} id='username'/>
        <Input {...passProps} />
        {error ? <Error2 error={error} id='login_error_3' /> : null}
        <button type='submit' className='login_form_btn' id='login_form_btn3'>
          {loading ? <Loader className='login_loader' color='#fff' /> : t('login.login')}
        </button>
        <div className='pass_row'>
          <Checkbox className='remember_check' checked={checked} onChange={e => setChecked(e?.target?.checked)}>{t('remember')}</Checkbox>
          <span className='forgot_link' onClick={onForgot}>{t('forgot')}</span> 
        </div>
        <Social />
        <a className='copyright_text' target="_blank" href={'https://' + t('login.link')} id='copy'>{t('login.link')}</a>
        <span className='copyright_text2'>2022</span>
      </form>
    </div>
  )
}