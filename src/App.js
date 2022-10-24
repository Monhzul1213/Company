import React, { Suspense } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Loading, Login,  Company} from './pages';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PasswordForgot } from './pages/PasswordForgot';
import { PasswordReset } from './pages/PasswordReset';
import { useDispatch, useSelector } from 'react-redux';

export function App(){
  const user = useSelector(state => state.login.user);
  SwiperCore.use([Autoplay]);
  
  if(!user) return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='/forgot_password' element={<PasswordForgot />} />
        <Route path='/reset_password' element={<PasswordReset />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
  return (
      <Suspense fallback={<Loading />}>
        <Company />
      </Suspense>
  )
}