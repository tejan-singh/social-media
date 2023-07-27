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
        payload: { users: users, suggestedUsers: suggestedUsers.slice(0, 3) },
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

  const handleFollowUser = async (dispatch, _id, setIsRequested) => {
    try {
      setIsRequested((prev) => !prev);
      const response = await fetch(`/api/users/follow/${_id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const { user } = await response.json();
      dispatch({ type: "UPDATE_LOGGEDIN_USER_DETAILS", payload: user });
      setIsRequested((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnFollowUser = async (dispatch, _id, setIsRequested) => {
    try {
      setIsRequested((prev) => !prev);

      const response = await fetch(`/api/users/unfollow/${_id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const { user } = await response.json();
      dispatch({ type: "UPDATE_LOGGEDIN_USER_DETAILS", payload: user });
      setIsRequested((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (userInput, setUserInput) => {
    try {
      if (userInput.trim()) {
        const requestBody = { postData: { content: userInput } };
        const response = await fetch("/api/posts", {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("encodedToken"),
          },
          method: "POST",
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        dispatch({ type: "CREATE_POST", payload: data });
        setUserInput(() => "");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log("useEffect run");
    getAllUsers();
    getPosts();
    getBookmarkPosts();
  }, [appState.loggedinUser]);

  useEffect(() => {
    getBookmarkPosts();
  }, [appState.bookmarks]);

  return (
    <AppContext.Provider
      value={{
        appState,
        dispatch,
        getAllUsers,
        handleFollowUser,
        handleUnFollowUser,
        createPost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
