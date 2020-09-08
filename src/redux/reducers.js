/* reducer func : returns a new state based on the old state and assigned action */
import {combineReducers} from 'redux';
import {redirectUPage} from '../utils';
import {
  AUTH_SUCCESS,
  ERROR_MSG,RECEIVE_USER,RESET_USER
} from './action-types'
//                new state, assign action
const initUser = {
  username:'',
  type:'',
  msg:'',
  redirectTo:''
}
function user(state=initUser, action){
  switch(action.type){
    case AUTH_SUCCESS:
      const redirectTouserHomepage = redirectUPage(action.data.type, action.data.avatar);
      //return {...action.data, redirectTo: '/'};
        //console.log(redirectTouserHomepage);
        //let url = `http://localhost:3000/#/${redirectTouserHomepage}`
      return {...action.data, redirectTo: redirectTouserHomepage};
    case ERROR_MSG:
      return {...state, msg: action.data};
    case RECEIVE_USER: // 接收用户
      return action.data
    case RESET_USER: // 重置用户
      return {...initUser, msg:action.data};
    default:
      return state
  }
}
export default combineReducers({
 user
})
