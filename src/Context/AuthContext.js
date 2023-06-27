import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    loggedinUser: {},
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
        };
      default:
        return state;
    }
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);
  console.log(authState);
  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
