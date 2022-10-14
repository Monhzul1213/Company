import React, { Suspense } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import {  useAuth } from './firebase'
import { Loading, Login,  Company} from './pages';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PasswordForgot } from './pages/PasswordForgot';
import { PasswordReset } from './pages/PasswordReset';

export function App(){
  const user = useAuth();
  SwiperCore.use([Autoplay]);
  
  if(!user) return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='/forgot_password' element={<PasswordForgot />} />
        <Route path='/reset_password' element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
  return (
      <Suspense fallback={<Loading />}>
        <Company />
      </Suspense>
  )
}