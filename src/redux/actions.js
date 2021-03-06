import { AUTH_SUCCESS, ERROR_MSG, GET_USER_LIST, RECEIVE_USER, RESET_USER } from './action-types'
import { reqRegister, reqLogin,reqSyncUser,reqUser } from '../api';

const errorMsg = (msg) => ({type:ERROR_MSG, data: msg});
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const receiveUser = (user) => ({type: RECEIVE_USER, data: user});
export const resetUser = (msg) => ({type: RESET_USER, data: msg});
export const getuserlist = (userlist)=>({type:GET_USER_LIST,data:userlist});
export const register = ({username, password, password2, type}) => {
  if (!username || !password || !type) {
    return errorMsg('Please fill out all the required field');
  }
  if (password !== password2) {
    return errorMsg('Password don\'t match');
  }
  return async dispatch => {
    // the data is getting from backend express
    const result =(await reqRegister({username, password, type})).data;
    // pass  0 data fail  1 msg
    result.code === 0 ? dispatch(authSuccess(result.data)) : dispatch(errorMsg(result.msg));
  }
}

// Redux Workflow : reducer -> store -> UIs -> action -> reducer
export const login = ({username, password}) => {
  if (!username || !password) {
    return errorMsg('Please fill out all the required field')
  }
  return async dispatch => {
    const result = (await reqLogin({ username, password })).data; // code data msg
    // pass  0 data fail  1 msg
    result.code === 0 ? dispatch(authSuccess(result.data)) : dispatch(errorMsg(result.msg));
  }
}

export const syncUserInfo = (user) => {
// console.log(user);
    return async dispatch => {
      const result = (await reqSyncUser(user)).data;
      result.code === 0? dispatch(receiveUser(result.data)) : dispatch(resetUser(result.msg));
    }

}

export const getUser = () => {
  return async dispatch => {
    const result = (await reqUser()).data;
    result.code === 0? dispatch(receiveUser(result.data)) : dispatch(resetUser(result.msg));
  }
}

export const getUserList = (type) => {
  return async dispatch => {
    const result = (await getUserList(type)).data;
    result.code === 0? dispatch(receiveUser(result.data)) : dispatch(resetUser(result.msg));
  }
}
