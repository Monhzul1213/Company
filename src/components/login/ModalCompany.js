import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import '../../css/login.css';
import { useDimensions } from '../../helpers/useDimensions';
import { DynamicAIIcon } from '../all';

export function ModalCompany(props){
  const { visible, list, onClose } = props;
  const { t } = useTranslation();
  const { width } = useDimensions();
  const centered = width > 440 ? true : false;
  const maxWidth = centered ? 420 : width - 40;
  const marginTop = centered ? '-10vh' : '15vh';

  const renderItem = (item, index) => {
    return (
      <div key={index} className='com_btn' onClick={() => onClose(item)}>
        <span className='com_text'>{item?.CpnyID}</span> 
      </div>
    )
  }

  return (
    <Modal title={null} footer={null} closable={false} visible={visible} centered={centered} style={{ maxWidth, marginTop }}>
      <DynamicAIIcon name='AiFillCloseCircle' className='close_icon' onClick={() => onClose()} />
      <p className='com_title'>{t('choose_cpmy')}</p>
      <div className='com_list'>
        {list?.map(renderItem)}
      </div>
      {/* <button className='com_close_btn' onClick={() => onClose()}>{t('close')}</button> */}
    </Modal>
  )
}