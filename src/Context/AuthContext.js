import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: true,
    loggedinUser: {}
  };

  const authReducer = (state, action) => {
    switch(action.type){
        case "SET_LOGGEDIN_USER":
            return {
                ...state,
                loggedinUser: action.payload
            }
        default:
            return state 
        }
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);
  console.log(authState)
  return <AuthContext.Provider value={{authState, dispatch}}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
