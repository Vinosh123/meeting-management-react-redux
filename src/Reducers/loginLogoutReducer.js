import initialState from './initialState';
const loginLogoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VIEW_LOGGEDIN_USER':
      return {
        ...state,
        users: [...action.data]
    };;
    case 'LOGIN':
      return Object.assign({}, state, { username: action.uname });
    default:
      return state;
  }
};
export default loginLogoutReducer;