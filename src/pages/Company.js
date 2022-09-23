import React, { useState, useEffect } from 'react';
import { Filter, Table,Card } from '../components/company';
import { Header } from '../components/menu/Header';
import { useSelector, useDispatch } from 'react-redux';
import {collection, doc, getDocs} from 'firebase/firestore'
import {db} from '../firebase'
import{Empty, Error} from '../components/all'
import '../css/list.css'
import { useDimensions } from '../helpers/useDimensions';
import LoadingOverlay from 'react-loading-overlay';
import { lowerCase } from 'lodash';
// import {  addDoc ,updateDoc, collection, doc} from 'firebase/firestore';
// import {db} from '../firebase'
 LoadingOverlay.propTypes = undefined;
export function Company(){
  const { height } = useDimensions();
  const [data1, setData1] = useState('');
  const [data, setData] = useState([]);
  const [originaldata, setOriginalData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  const addRequest = () => {
      // setError(null);
      setVisible(true);
      setSelected(null)
  }
function getUser(){
    let users = []
    // let users1 = []
    const userCollectionRef =collection(db, 'smWebUsers')
     getDocs(userCollectionRef )
     .then(response=>{
      response.docs.map(doc => {
        let user = {...doc.data(), ...{ id: doc?.id }};
        // let user1 = {...doc.data(), ...{ id: doc?.id }};
        // console.log(user1)
        users.push(user);
        // users1.push(user1);
      })
      setData(users)
      setOriginalData(users)
     })
     .catch(error=> console.log(error.message))
  }

  useEffect(() => {
    getUser();
    return () => {};
  }, [])

  const onClose = toLoad => {
    setVisible(false);
   
    if(toLoad){
       getUser()
    }
  } 

const changeCpnyID = value => {
    // console.log(value);
    setData1(value);
    let newData = originaldata?.filter(word => word.data1.toLowerCase().includes(data1.toLowerCase()) ) 
    // let originalData = data 
    // console.log(originaldata)
    setData(newData)
    // setData(originaldata)
}
  let overlayStyle = { overlay: base => ({...base, background: 'rgba(0, 0, 0, 0.2)'}) };
  let cardProps = { visible, setVisible, selected, setSelected,  setData, data1, setData1: changeCpnyID };
  let filterProps = { addRequest, setData,  setError , setVisible, data1, setData1: changeCpnyID };
  return (
    <>
     {/* <LoadingOverlay active={loading} spinner styles={overlayStyle}> */}
          <Header/>
          <div className='page_container' style={{height: height - 58}}>
           {visible ? <Card onClose={onClose} {...cardProps} />: null}
          <div className='page_back'>
            {error ? <Error error={error} /> : null}
            <Filter {...filterProps} />            
            <div className='data_back' id='inventory_page'>
             
            {data?.length ? <Table data={data} setData={setData} selected={selected} setVisible={setVisible} setSelected={setSelected} /> : <Empty />}
             </div>
            </div>
          </div>
          {/* </LoadingOverlay> */}
        </>
    
    )
  }