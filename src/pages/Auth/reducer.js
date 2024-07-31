const initialState = {
  isLogin: true,
  user: {
    userName: '',
    email: '',
    password: '',
  },
  request: {
    error: false,
    message: '',
  },
}

const SET_LOGIN_STATE = 'SET_LOGIN_STATE'
const SET_USER_INFO = 'SET_USER_INFO'
const SET_REQUEST_INFO = 'SET_REQUEST_INFO'
const RESET_REQUEST_INFO = 'RESET_REQUEST_INFO'
const RESET = 'RESET'

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        isLogin: action.payload,
      }
    case SET_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    case SET_REQUEST_INFO:
      return {
        ...state,
        request: {
          error: action.payload.error,
          message: action.payload.message,
        },
      }
    case RESET_REQUEST_INFO:
      return {
        ...state,
        request: {
          ...initialState.request,
        },
      }
    case RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export {
  initialState,
  SET_LOGIN_STATE,
  SET_REQUEST_INFO,
  SET_USER_INFO,
  RESET,
}

export default authReducer
