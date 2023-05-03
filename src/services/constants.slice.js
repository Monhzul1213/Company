import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiLogin } from './login.slice';

const initialState = {
  inventoryCategories: [],
  sites: [],
  vendors: [],
  order_status: [],
  return_status: [],
  inventory_status: [],
  receivable_status: [],
  orders: [],
  salesReturns: [],
  url: 'http://192.168.1.220:3737/VendorSystem.asmx/',
};

export const constantsSlice = createSlice({
  name: 'constants',
  initialState,
  reducers: {
    setInventoryCategories: (state, action) => {
      state.inventoryCategories = action.payload?.MaterialTypes;
    },
    setSites: (state, action) => {
      state.sites = action.payload?.inSite;
    },
    setVendors: (state, action) => {
      state.vendors = action.payload?.apVendor;
    },
    setOrderStatus: (state, action) => {
      state.order_status = action.payload;
    },
    setInventoryStatus: (state, action) => {
      state.inventory_status = action.payload;
    },
    setReceivableStatus: (state, action) => {
      state.receivable_status = action.payload;
    },
    setReturnStatus: (state, action) => {
      state.return_status = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setReturns: (state, action) => {
      state.salesReturns = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  }
});

export const getList = (login, api, data, setFunction) => async dispatch => {
  const { token, user } = login;
  const url = initialState?.url;
  try {
    const response = await fetchRetryPost(url + api, token, data);
    if(response?.error_code === 401){
      return dispatch(apiLogin(user?.username, user?.password)).then(async response1 => {
        if(response1?.error)
          return response1;
        else {
          const response2 = await fetchRetryPost(url + api, response1?.token ?? token, data);
          if(response2?.error_code && response2?.error_code !== 200){
            return Promise.resolve({ error: response2?.description, error_code: response2?.error_code });
          } else {
            setFunction && dispatch(setFunction(response2?.data));
            return Promise.resolve({ error: null, data: response2?.data });
          }
        }
      });
    } else if(response?.error_code && response?.error_code !== 200){
      return Promise.resolve({ error: response?.description, error_code: response?.error_code });
    } else  {
      setFunction && dispatch(setFunction(response?.data));
      return Promise.resolve({ error: null, data: response?.data });
    }
  } catch (err) {
    return Promise.resolve({ error: err?.toString() });
  }
}

export const getField = (login, api, setFunction) => async dispatch => {
  const { token, user } = login;
  const url = initialState?.url;
  try {
    const response = await fetchRetry(url + api, token);
    if(response?.error_code === 401){
      return dispatch(apiLogin(user?.username, user?.password)).then(async response1 => {
        if(response1?.error)
          return response1;
        else {
          const response2 = await fetchRetry(url + api, response1?.token ?? token);
          if(response2?.error_code && response2?.error_code !== 200){
            return Promise.resolve({ error: response2?.description, error_code: response2?.error_code });
          } else {
            setFunction && dispatch(setFunction(response2?.data));
            return Promise.resolve({ error: null, data: response2?.data });
          }
        }
      });
    } else if(response?.error_code && response?.error_code !== 200){
      return Promise.resolve({ error: response?.description, error_code: response?.error_code });
    } else  {
      setFunction && dispatch(setFunction(response?.data));
      return Promise.resolve({ error: null, data: response?.data });
    }
  } catch (err) {
    return Promise.resolve({ error: err?.toString() });
  }
}

export const getConstants = (login, type, setFunction) => async dispatch => {
  const { token, user } = login;
  const url = initialState?.url;
  try {
    const response = await fetchRetry(url + 'GetConstants?ConstType=' + type, token);
    if(response?.error_code === 401){
      return dispatch(apiLogin(user?.username, user?.password)).then(async response1 => {
        if(response1?.error)
          return response1;
        else {
          const response2 = await fetchRetry(url + 'GetConstants?ConstType=' + type, response1?.token ?? token);
          if(response2?.error_code && response2?.error_code !== 200){
            return Promise.resolve({ error: response2?.description, error_code: response2?.error_code });
          } else {
            setFunction && dispatch(setFunction(response2?.data));
            return Promise.resolve({ error: null, data: response2?.data });
          }
        }
      });
    } else if(response?.error_code && response?.error_code !== 200){
      return Promise.resolve({ error: response?.description, error_code: response?.error_code });
    } else  {
      setFunction && dispatch(setFunction(response?.data));
      return Promise.resolve({ error: null, data: response?.data });
    }
  } catch (err) {
    return Promise.resolve({ error: err?.toString() });
  }
};

export const sendRequest = (login, api, data) => async dispatch => {
  const { token, user } = login;
  const url = initialState?.url;
  try {
    const response = await fetchRetrySend(url + api, token, data);
    if(response?.error_code === 401){
      return dispatch(apiLogin(user?.username, user?.password)).then(async response1 => {
        if(response1?.error)
          return response1;
        else {
          const response2 = await fetchRetrySend(url + api, response1?.token ?? token, data);
          if(response2?.error_code && response2?.error_code !== 200){
            return Promise.resolve({ error: response2?.description, error_code: response2?.error_code });
          } else {
            return Promise.resolve({ error: null, data: response2?.data });
          }
        }
      });
    } else if(response?.error_code && response?.error_code !== 200){
      return Promise.resolve({ error: response?.description, error_code: response?.error_code });
    } else  {
      return Promise.resolve({ error: null, data: response?.data });
    }
  } catch (err) {
    return Promise.resolve({ error: err?.toString() });
  }
}

function fetchRetry(url, token, retries = 5) {
  const headers = { 'Authorization': 'Bearer ' + token };
  return axios.get(url, { headers })
    .then(res => {
      return res?.data;
    }).catch(error => {
      if(error?.message === 'Network Error' && retries > 0){
        return fetchRetry(url, token, retries - 1)
      } else {
        return Promise.resolve({ description: error?.message, error_code: 100 });
      }
    });
}

function fetchRetryPost(url, token, data, retries = 5) {
  const headers = { 'Authorization': 'Bearer ' + token, 'Content-Type' : 'text/plain' };
  return axios.post(url, data, { headers })
    .then(res => {
      return res?.data;
    }).catch(error => {
      if(error?.message === 'Network Error' && retries > 0){
        return fetchRetryPost(url, token, data, retries - 1)
      } else {
        return Promise.resolve({ description: error?.message, error_code: 100 });
      }
    });
}

function fetchRetrySend(url, token, data, retries = 0) {
  const headers = { 'Authorization': 'Bearer ' + token, "Content-Type": "application/json", Accept: "application/json" };
  return axios.post(url, data, { headers })
    .then(res => {
      return res?.data;
    }).catch(error => {
      if(error?.message === 'Network Error' && retries > 0){
        return fetchRetrySend(url, token, data, retries - 1)
      } else {
        return Promise.resolve({ description: error?.message, error_code: 100 });
      }
    });
}

export const { setInventoryCategories, setSites, setVendors, setOrderStatus, setReturnStatus, setOrders, setReturns, setInventoryStatus,
  setReceivableStatus, setIsLoggedIn } = constantsSlice.actions;

export const constantsReducer = constantsSlice.reducer;