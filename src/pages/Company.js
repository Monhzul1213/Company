import React, { useState, useEffect } from 'react';
import { Filter, Table,Card } from '../components/company';
import { Header } from '../components/menu/Header';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../firebase'
import{Empty, Error} from '../components/all'
import '../css/list.css'
import { useDimensions } from '../helpers/useDimensions';
import LoadingOverlay from 'react-loading-overlay';
 LoadingOverlay.propTypes = undefined;
export function Company(){
  const { height } = useDimensions();
  const [data1, setData1] = useState('');
  const [data, setData] = useState([]);
  const [originaldata, setOriginalData] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  const addRequest = () => {
      setVisible(true);
      setSelected(null)
  }
function getUser(){
    let users = []
    const userCollectionRef =collection(db, 'smWebUsers')
     getDocs(userCollectionRef )
     .then(response=>{
      response.docs.forEach(doc => {
        let user = {...doc.data(), ...{ id: doc?.id }};
        users.push(user);
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
    setData1(value);
    let newData = originaldata?.filter(word => word.data1.toLowerCase().includes(data1.toLowerCase()) ) 
    console.log('originaldata', originaldata)
    setData(newData)
}
  let cardProps = { visible, setVisible, selected, setSelected,  setData, data1, setData1: changeCpnyID };
  let filterProps = { addRequest, setData,  setError , setVisible, data1, setData1: changeCpnyID };
  return (
    <>
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
        </>
    
    )
  }