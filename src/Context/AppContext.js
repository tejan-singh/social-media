import { createContext, useReducer } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    allPosts: [],
  };

  const reducerFun = (state, action) => {
    switch (action.type) {
      case "SHOW_ALL_POSTS":
        return {
          ...state,
          allPosts: action.payload,
        };
      default:
        return state;
    }
  };

  const { appState, dispatch } = useReducer(reducerFun, initialState);

  return <AppContext.Provider>{children}</AppContext.Provider>;
};

export { AppProvider };
