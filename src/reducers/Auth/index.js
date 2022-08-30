import { GET_REGISTER, GET_LOGIN } from "../../actions/AuthAction";

const initialState = {
  getRegisterLoading: false,
  getRegisterResults: false,
  getRegisterError: false,

  getLoginLoading: false,
  getLoginResults: false,
  getLoginError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REGISTER:
      return {
        ...state,
        getRegisterLoading: action.payload.loading,
        getRegisterResults: action.payload.data,
        getRegisterError: action.payload.errorMassage,
      };
    case GET_LOGIN:
      return {
        ...state,
        getLoginLoading: action.payload.loading,
        getLoginResults: action.payload.data,
        getLoginError: action.payload.errorMassage,
      };

    default:
      return state;
  }
}
