import React, {useState} from 'react';
import '../../css/menu.css';
import logo from '../../assets/logo.png'
import {User} from '../all/User'
import { useTranslation } from 'react-i18next';
import { Language } from '../all';
export function Header(bread){

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  return (
    <div className='header_back'>
      <img src={logo} className="menu_logo_back"/>
      <p className='menu_logo_title'>{t('cmp_list')}</p>
        <User/>
    </div>
  )
}