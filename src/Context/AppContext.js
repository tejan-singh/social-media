import { createContext, useEffect, useReducer } from "react";
import { reducerFun, initialState } from "../Reducers/appReducers";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(reducerFun, initialState);

  console.log("appState", appState);

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

      // if user is present in following user array then return false and do not store in suggested users
      const suggestedUsers = users.filter((eachUser) => {
        return (
          appState.loggedinUser._id !== eachUser._id &&
          !appState.loggedinUser.following.some((followingUser) => {
            return followingUser._id === eachUser._id;
          })
        );
      });
      dispatch({
        type: "SET_ALL_USERS",

        //slice will show first 3 users only from all users array.
        payload: { users: users, suggestedUsers: suggestedUsers.slice(0,3) },
      });

    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "HIDE_LOADING" });
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
    getAllUsers();
  }, [appState.loggedinUser]);

  useEffect(() => {
    getPosts();
  }, [appState.loggedinUser]);

  useEffect(() => {
    getBookmarkPosts();
  }, [appState.bookmarks]);

  return (
    <AppContext.Provider value={{ appState, dispatch, getAllUsers }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
