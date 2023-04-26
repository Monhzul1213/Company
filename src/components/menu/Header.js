import React from 'react';
import '../../css/menu.css';
import logo_new from '../../assets/logo_new.png'
import { User } from '../all/User'
import { useTranslation } from 'react-i18next';

export function Header(bread){
  const { t } = useTranslation();

  return (
    <div className='header_back'>
      <img src={logo_new} alt= '' className="menu_logo_back"/>
      <p className='menu_logo_title'>{t('cmp_list')}</p>
        <User/>
    </div>
  )
}