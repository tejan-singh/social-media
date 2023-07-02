import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    //if token is already stored then default state will be true
    isLoggedIn: localStorage.getItem("encodedToken") ? true : false,

    // inside local storage value is stored as json string. Convert it to object
    loggedinUser:JSON.parse(localStorage.getItem("loggedInUserDetails")),
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "USER_LOGIN":

        return {
          ...state,
          isLoggedIn: true,
          loggedinUser: action.payload,
        };
      case "USER_LOGOUT":
        return {
          ...state,
          isLoggedIn: false,
          loggedinUser:{}
        };
      default:
        return state;
    }
  };

  const [authState, authDispatch] = useReducer(authReducer, initialState);
  console.log(authState);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
