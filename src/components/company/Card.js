import React, { useEffect, useState } from 'react';
import { Modal , message} from 'antd';
import { useTranslation } from 'react-i18next';
import {addDoc, collection , where, query, doc, setDoc, updateDoc, getDocs} from 'firebase/firestore';
import {db} from '../../firebase'
import { formatNumber } from '../../helpers';
import '../../css/card.css';
import moment, { isDate } from 'moment';
import { Cardlength, CardInput, CardInput1, CardNote, Loader, DynamicAIIcon, Error1, CardDropdown } from '../all';

export function Card(props){
  const { visible, selected, data, onClose, } = props;
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState();
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [CpnyID, setCpnyID] = useState('');
  const [CpnyName, setCpnyName] = useState({ value: '', error: null});
  const [WebUserID, setWebUserID] = useState({ value: '', error: null });
  const [WebPassword, setWebPassword] = useState({ value: '', error: null });
  const [AppServerIP, setAppServerIP] = useState('');
  const [VendID, setVendID] = useState( { value: '', error: null } );
  const [VendorCount, setVendorCount] = useState({ value: '', error: null });
  const [UseVendorCount, setUseVendorCount] = useState('');
  const [LicenseAmt, setLicenseAmt] = useState({ value: '', error: null });
  const [WebServiceURL, setWebServiceURL] = useState({  error: null });
  const [AppServerLoginUserID, setAppServerLoginUserID] = useState({  error: null });
  const [AppServerVersion, setAppServerVersion] = useState({  error: null });
  const [AppServerLoginUserPass, setAppServerLoginUserPass] = useState({ value: '', error: null });
  const [Phone, setPhone] = useState({ value: '', error: null });
  const [Address, setAddress] = useState({  error: null });
  const [Email, setEmail] = useState(null);
  const [AppServerLoginPort, setAppServerLoginPort] = useState({  error: null });
  const [CreatedProgID, setCreatedProgID] = useState({ value: '', error: null });
  const [ CreatedDate, setCreatedDate] = useState({ value: '', error: null });
  const [CreatedUserName, setCreatedUserName] = useState({ value: '', error: null });
  const [LastUpdate, setLastUpdate] = useState({ value: '', error: null });
  const [LastUserName, setLastUserName] = useState({ value: '', error: null });
  const [TxnType, setTxnType] = useState({ value: '', error: null });

 
  useEffect(() => {
    setEmail({ value: selected?.Email ?? '' })
    setCpnyID({ value: selected?.CpnyID ?? '' })
    setCpnyName({ value: selected?.CpnyName ??'' });
    setWebUserID({ value: selected?.WebUserID ?? '' })
    setWebPassword({ value: selected?.WebPassword ?? ''   })
    setVendID({ value: selected?.VendID ?? '' })
    setVendorCount({ value: selected?.VendorCount ?? '' })
    setUseVendorCount({value: formatNumber(selected?.UseVendorCount) })
    setWebServiceURL({ value: selected?.WebServiceURL ?? '' })
    setAppServerIP({ value: selected?.AppServerIP ?? '' })
    setAppServerLoginUserID({ value: selected?.AppServerLoginUserID ?? '' })
    setAppServerLoginUserPass({ value: selected?.AppServerLoginUserPass ?? ''  })
    setAppServerLoginPort({ value: selected?.AppServerLoginPort ?? '' })
    setAppServerVersion({ value: selected?.AppServerVersion ?? '' })
    setLicenseAmt({value : disabled ? formatNumber(selected?.LicenseAmt ): (selected?.LicenseAmt ?? '') });
    setPhone({ value: selected?.Phone ?? '' });
    setAddress({ value: selected?.Address ?? '' })
    setCreatedDate({value: selected?.CreatedDate})
    const Options = [
      { label: "Бараа материал : Багцлалт", value: 'INAS' },
        { label: "Бараа материал : Тохируулга", value: 'INAJ' },
        {label: "Бараа материал : Зарлага", value: 'INII' },
        {label: "Бараа материал : Тооллого", value: 'INPI' },
        { label: "Борлуулалт : Буцаалтын орлого", value: 'PSCM' },
        { label: "Борлуулалт : Зарлага", value: 'PSIN' }
      ];
    if(selected?.TxnType){
      const list = [];
      const typeList = selected?.TxnType?.split(',');
      console.log(typeList)
      typeList?.map(item => {
        let option = Options?.filter(opt => opt.value === item)[0]
        if(option?.value == item){
          list.push(option)
        }
        console.log(item)  
      })
      setTxnType({ value: list })
    }
    setDisabled(disabled);
    return () => {};
  }, [selected]);

 
async function handleSubmit  (e){
    e.preventDefault()
    let text = LicenseAmt?.value?.replace(/[^0-9]/g, '');
    let txnType = [];
    TxnType?.value?.map(item => {
      txnType.push(item?.value)
    }) 
    console.log(txnType)
   
  if(WebUserID?.value && isValidEmail(WebUserID?.value) && CpnyID?.value&& CpnyName?.value && WebPassword?.value &&AppServerIP?.value && checkIfValidIP(AppServerIP?.value) &&VendorCount?.value && !isNaN(VendorCount?.value)  && !isNaN(text) &&WebServiceURL?.value &&AppServerLoginUserID?.value &&AppServerLoginUserPass?.value &&Phone?.value && !isNaN(Phone?.value) &&Address?.value &&AppServerLoginPort?.value && AppServerVersion?.value&&  Email?.value && isValidEmail(Email?.value) && TxnType?.value ){
      setLoader(true);
      setError(null);
    // requests[0].RequestID = selected.RequestID;
      let obj ={ CpnyID: CpnyID?.value ,
        CpnyName: CpnyName?.value, 
        WebUserID:WebUserID?.value.toLowerCase(), 
        WebPassword: WebPassword?.value, 
        AppServerIP:AppServerIP?.value, 
        AppServerLoginPort:AppServerLoginPort?.value, 
        Phone:Phone?.value,  
        VendorCount:VendorCount?.value , 
        UseVendorCount: UseVendorCount?.value, 
        LicenseAmt:LicenseAmt?.value,  
        AppServerLoginUserID:AppServerLoginUserID?.value, 
        AppServerVersion: AppServerVersion?.value,
        AppServerLoginUserPass:AppServerLoginUserPass?.value,  
        WebServiceURL:WebServiceURL?.value, 
        TxnType: txnType.toString(),
        Address:Address?.value, 
        Email:Email?.value ,
        CreatedDate: CreatedDate?.value, 
        LastUserName: Email?.value, 
        LastUpdate:  moment().format('yyyy.MM.DD, HH:mm:ss')}
    if(selected){
      const userRef = doc(db, "smWebUsers", selected.id )
        console.log(userRef)
        setDoc(userRef, obj)
        onClose(true);
        message.success(t('request_success'))
      } 
    else {
      const userCollRef= collection(db, 'smWebUsers')
      const q1 = query(userCollRef, where("WebUserID", "==", WebUserID?.value))
      const query1 = await getDocs(q1)
      let exists = null;
      query1.forEach(doc => exists = doc.data());
      console.log(exists)
      if(exists) setError("Хэрэглэгч бүртгэлтэй байна")
      else {
       obj.CreatedDate = moment().format('yyyy.MM.DD, HH:mm:ss')
       addDoc(userCollRef, obj )
       onClose(true)
       message.success(t('request_success'));
      }
    }
      setLoader(false);
  }
   else {
    if(!WebUserID?.value) setWebUserID({ error: 'is_empty'});
    if(!WebPassword) setWebPassword({value: '', error: 'is_empty'});
    if(!CpnyID?.value) setCpnyID({value: '', error: 'is_empty'});
    if(!CpnyName?.value) setCpnyName({value: '', error: 'is_empty'});
    if(!VendorCount?.value) setVendorCount({value: '', error: 'is_empty'});
    if(!LicenseAmt?.value) setLicenseAmt({value: '', error: 'is_empty'});
    if(!WebServiceURL?.value) setWebServiceURL({value: '', error: 'is_empty'});
    if(!AppServerLoginUserID?.value) setAppServerLoginUserID({value: '', error: 'is_empty'});
    if(!AppServerLoginUserPass) setAppServerLoginUserPass({value: '', error: 'is_empty'});
    if(!Phone?.value) setPhone({value: '', error: 'is_empty'});
    if(!Address?.value) setAddress({value: '', error: 'is_empty'});
    if(!AppServerLoginPort?.value) setAppServerLoginPort({value: '', error: 'is_empty'});
    if(!AppServerIP?.value) setAppServerIP({value: '', error: 'is_empty'});
    if(!AppServerVersion?.value) setAppServerVersion({value: '', error: 'is_empty'});
    if(!Email?.value) setEmail({value: '', error: 'is_empty'});
    if(!TxnType?.value) setTxnType({value: '', error: 'is_empty'});
    else if(isNaN(text)) setVendorCount({...VendorCount, ...{error: 'must_number'}});
    else if(isNaN(Phone?.value)) setPhone({...Phone, ...{error: 'must_number'}});
    else if(isNaN(text)) setLicenseAmt({...LicenseAmt, ...{error: 'must_number'}});
    else if(isNaN(AppServerLoginPort?.value)) setAppServerLoginPort({...AppServerLoginPort, ...{error: 'must_number'}});
    else if(!checkIfValidIP(AppServerIP?.value)) setAppServerIP({...AppServerIP, ...{error: 'is_IP'}});
   if(!isValidEmail(WebUserID?.value)) setWebUserID({...WebUserID, ...{error: 'is_invalid'}});
   if(!isValidEmail(Email?.value)) setEmail({...Email, ...{error: 'is_invalid'}});
   
  }
}


  const changeLicense = value => {
    let text = value?.value?.replace(/[^0-9]/g, '');
    if(isNaN(text)) setLicenseAmt({ value: value?.value, error: 'must_number'});
    else setLicenseAmt({ value: formatNumber(text) });
  }
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
    
  }
  function checkIfValidIP(str) {
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(str);
  }
  const changeVendorCount = value => {
    let text = value?.value?.replace(/[^0-9]/g, '');
    if(isNaN(text)) setVendorCount({ value: value?.value, error: 'must_number'});
    else setVendorCount({ value: formatNumber(text) });
  } 
  const changePhone = value => {
    if(isNaN(value?.value)) setPhone({ value: value?.value, error: 'must_number'});
    else setPhone(value);
  }
  const changePort = value => {
    if(isNaN(value?.value)) setAppServerLoginPort({ value: value?.value, error: 'must_number'});
    else setAppServerLoginPort(value);
  }

  const handleEnter = e => {
    if (e?.key?.toLowerCase() === "enter") {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  return (
    <Modal title={null} footer={null} closable={false} visible={visible} width={700}> 
      <DynamicAIIcon name='AiFillCloseCircle' className='close_icon' onClick={() => onClose(false)} />
      <p className='card_title'>{t('new_cmp')}</p>
      {error ? <Error1 error={error} /> : null}
      <form className='card_container' onSubmit={handleSubmit}>
        <div className='cart'>
          <div className='card1' >  
            <CardInput label={('print.company')} setValue={setCpnyID} value={CpnyID} handleEnter={handleEnter}/>
            <CardInput1 label={('table.company')} value={CpnyName} setValue={setCpnyName} handleEnter={handleEnter} /> 
          </div>
          <div className='card1'>
            <CardInput label={('user_email')}  disabled={disabled} value={WebUserID}  setValue={setWebUserID} handleEnter={handleEnter} />
            <CardInput1 label={('user_password')}   value={WebPassword} setValue={setWebPassword} isPassword={true} handleEnter={handleEnter} />
          </div>
          <div className='card1'>
            <CardInput label={('login.email')}handleEnter={handleEnter} value={Email} setValue={setEmail}  />
            <CardInput1 label={('table.phone')} handleEnter={handleEnter}value={Phone} setValue={changePhone}  />
          </div>
          <div className='card1'>
            <CardInput label={('table.webservice')}  value={WebServiceURL} setValue={setWebServiceURL} handleEnter={handleEnter} />
            <Cardlength label={('table.vendorCount')}  value={VendorCount} setValue={changeVendorCount} handleEnter={handleEnter} /> 
          </div>
          <div className='card'>
            <CardDropdown label={('txntype')}  value={TxnType} handleEnter={handleEnter} setValue={setTxnType} />
            <CardNote label={('table.address')}  value={Address} setValue={setAddress} /> 
          </div>
          <div className='card1'>
            <CardInput label={('table.License')}  disabled={disabled} value={LicenseAmt} setValue={changeLicense} handleEnter={handleEnter}/>
            <CardInput1 label={('AppServerversion')} value={AppServerVersion} setValue={setAppServerVersion} handleEnter={handleEnter} />
          </div>
          <div className='card1'>
            <CardInput label={('AppServer_IP')} value={AppServerIP} setValue={setAppServerIP} handleEnter={handleEnter} />
            <Cardlength label={('AppServer_Port')}  value={AppServerLoginPort} setValue={changePort} handleEnter={handleEnter} />
          </div>
          <div className='card1'>
            <CardInput label={('AppServer_UserID')}  value={ AppServerLoginUserID} handleEnter={handleEnter}
            setValue={setAppServerLoginUserID}/>
            <CardInput1 label={('AppServer_UserPass')} isPassword={true} value={AppServerLoginUserPass} handleEnter={handleEnter} setValue={setAppServerLoginUserPass} />
          </div>
        </div>
        {!disabled && <button type='submit' disabled={loader} className='login_form_btn'>
        {loader ? <Loader className='login_loader' color='#fff' /> :t('save') }
        </button>}
    </form>
    </Modal>
  )
}