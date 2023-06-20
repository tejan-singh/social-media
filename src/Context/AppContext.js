import { createContext, useEffect, useReducer } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    loading: true,
    allPosts: [],
    errorMsg: "",
    loggedinUser: "",
  };

  const reducerFun = (state, action) => {
    switch (action.type) {
      case "SHOW_ALL_POSTS":
        return {
          ...state,
          allPosts: action.payload,
        };
      case "SHOW_ERROR":
        return {
          ...state,
          errorMsg: action.payload,
        };
      case "HIDE_LOADING":
        return {
          ...state,
          loading: false,
        };
      case "GET_USERNAME":
        return {
          ...state,
          loggedinUser: action.payload.username,
        };
      case "CREATE_POST":
        return {
          ...state,
          allPosts: action.payload.posts,
        };
      case "LIKE_POST":
        return {
          ...state,
          allPosts: action.payload.posts,
        };
      case "DISLIKE_POST":
        return {
          ...state,
          allPosts: action.payload.posts,
        };
      case "DELETE_POST":
        return {
          ...state,
          allPosts: action.payload.posts
        }
      case "EDIT_POST":
        return {
          ...state,
          allPosts: action.payload.posts
        }    
      default:
        return state;
    }
  };
  const [appState, dispatch] = useReducer(reducerFun, initialState);
  console.log(appState);

  const getPost = async () => {
    try {
      const response = await fetch("/api/posts");
      const { posts } = await response.json();
      dispatch({ type: "SHOW_ALL_POSTS", payload: posts });
    } catch (error) {
      dispatch({ type: "SHOW_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "HIDE_LOADING" });
    }
  };

  const getUserToken = async () => {
    try {
      const credentials = {
        username: "adarshbalika",
        password: "adarshBalika123",
      };

      const response = await fetch("/api/auth/login", {
        method: "POST",

        //convert the object to JSON to send to server
        body: JSON.stringify(credentials),
      });

      const { foundUser, encodedToken } = await response.json();
      dispatch({ type: "GET_USERNAME", payload: foundUser });
      //store the encoded token to use it globally in the app
      // store using in key value pair
      localStorage.setItem("encodedToken", encodedToken);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPost();
    getUserToken();
  }, []);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };