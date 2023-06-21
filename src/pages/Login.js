import React, { Suspense } from 'react';

import '../css/login1.css';
import LoginNew from '../components/login/LoginNew';
import { Loading } from './Loading';
import { LoginScript } from '../components/login';

export function Login(){
  return (
    <Suspense fallback={<Loading />}>
      <LoginNew/>
      <LoginScript />
    </Suspense>
  )
}