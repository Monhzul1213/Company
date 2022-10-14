import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
  url: 'http://192.168.1.220:3737/VendorSystem.asmx/',
  user: null,
  user1: null,
  collapsed: false,
  visible: false,
  vendID: null,
  order: null,
  toRemember: false,

};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.user1 = action.payload.user;
      console.log(action.payload)
      state.webUser = action.payload.webUser;
      state.toRemember = action.payload?.toRemember;
    },
    logout: state => {
      state.user = null;
      state.token = null;
    },
    setCollapsed: state => {
      state.collapsed = !state.collapsed;
    },
    setVisible: state => {
      state.visible = !state.visible;
    },
    setVendID: (state, action) => {
      state.vendID = action.payload;
    },
    setOrder: (state, action) => {
      console.log(action.payload);
      state.order = action.payload;
    },
  }
});

export const apiLogin = (username, password) => async dispatch => {
  try {
    console.log(initialState.url, username, password);
    const response = await fetchRetry(initialState.url + 'Login', { username, password });
    console.log(response);
    if(response?.error_code){
      return Promise.resolve({ error: response?.description });
    } else {
      dispatch(setToken(response?.access_token));
      dispatch(setUser({ username, password }));
      return Promise.resolve({ error: null, token: response?.access_token });
    }
  } catch (err) {
    return Promise.resolve({ error: err?.toString() });
  }
};

function fetchRetry(url, auth, retries = 5) {
  return axios.post(url, {}, { auth })
    .then(res => {
      return res?.data;
    }).catch(error => {
      if(error?.message === 'Network Error' && retries > 0){
        console.log('retrying network', retries);
        return fetchRetry(url, auth, retries - 1)
      }
    });
}

export const { setToken, setUser,login, logout, setCollapsed, setVisible, setVendID, setOrder } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;