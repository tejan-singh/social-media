import { createContext, useEffect, useReducer } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    loading: true,
    allPosts: [],
    homeFeed: [],
    allUsers: [],
    errorMsg: "",
    bookmarks: [],
    userProfile: {},
    loggedinUser: {},
  };

  const reducerFun = (state, action) => {
    switch (action.type) {
      case "SHOW_ALL_POSTS":
        return {
          ...state,
          allPosts: action.payload,
          homeFeed: action.payload.filter(
            (post) =>
              state.loggedinUser.following?.some(
                (user) => user.username === post.username
              ) || post.username === state.loggedinUser.username
          ),
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
      case "SHOW_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "SET_LOGGEDIN_USERPROFILE":
        return {
          ...state,
          loggedinUser: action.payload,
        };
      case "CREATE_POST":
        return {
          ...state,
          allPosts: action.payload.posts,
          homeFeed: action.payload.posts.filter(
            (post) =>
              state.loggedinUser.following?.some(
                (user) => user.username === post.username
              ) || post.username === state.loggedinUser.username
          ),
        };
      case "LIKE_POST":
        return {
          ...state,
          allPosts: action.payload.posts,
          homeFeed: action.payload.posts.filter(
            (post) =>
              state.loggedinUser.following?.some(
                (user) => user.username === post.username
              ) || post.username === state.loggedinUser.username
          ),
        };
      case "DISLIKE_POST":
        return {
          ...state,
          allPosts: action.payload.posts,
          homeFeed: action.payload.posts.filter(
            (post) =>
              state.loggedinUser.following?.some(
                (user) => user.username === post.username
              ) || post.username === state.loggedinUser.username
          ),
        };
      case "DELETE_POST":
        return {
          ...state,
          allPosts: action.payload.posts,
          homeFeed: action.payload.posts.filter(
            (post) =>
              state.loggedinUser.following?.some(
                (user) => user.username === post.username
              ) || post.username === state.loggedinUser.username
          ),
        };
      case "EDIT_POST":
        return {
          ...state,
          allPosts: action.payload.posts,
          homeFeed: action.payload.posts.filter(
            (post) =>
              state.loggedinUser.following?.some(
                (user) => user.username === post.username
              ) || post.username === state.loggedinUser.username
          ),
        };
      case "BOOKMARK_POST":
        return {
          ...state,
          bookmarks: action.payload.data,
        };
      case "REMOVE_BOOKMARK_POST":
        return {
          ...state,
          bookmarks: action.payload.data,
        };
      case "SET_ALL_USERS":
        return {
          ...state,
          allUsers: action.payload,
        };
      case "SET_USER":
        return {
          ...state,
          userProfile: action.payload,
        };
      case "UPDATE_LOGGEDIN_USER_DETAILS":
        return {
          ...state,
          loggedinUser: action.payload,
        };
      default:
        return state;
    }
  };
  const [appState, dispatch] = useReducer(reducerFun, initialState);
  console.log(appState);

  const getPosts = async () => {
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

  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users", { method: "GET" });
      const { users } = await response.json();

      dispatch({ type: "SET_ALL_USERS", payload: users });
    } catch (error) {
      console.error(error);
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
      dispatch({ type: "SET_LOGGEDIN_USERPROFILE", payload: foundUser });
      //store the encoded token to use it globally in the app
      // store using in key value pair
      localStorage.setItem("encodedToken", encodedToken);
    } catch (error) {
      console.error(error);
    }
  };

  const getBookmarkPosts = async () => {
    try {
      const response = await fetch(`/api/users/bookmark`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });

      const { bookmarks } = await response.json();
      dispatch({ type: "SHOW_ALL_BOOKMARKS", payload: bookmarks });
    } catch (error) {
      dispatch({ type: "SHOW_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "HIDE_LOADING" });
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getPosts();
  }, [appState.loggedinUser]);

  useEffect(() => {
    getBookmarkPosts();
  }, [appState.bookmarks]);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
