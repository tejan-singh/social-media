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
    latestPosts: [],
    trendingPosts: [],
    filter: {
      showLatestPosts: false,
      showTrendingPosts: false,
      showDefault: true,
    },
    //to get loggedIn user details after page refresh, you need to get from local storage
    loggedinUser: {
      ...JSON.parse(localStorage.getItem("loggedInUserDetails")),
    },
  };

  const reducerFun = (state, action) => {
    switch (action.type) {
      case "SHOW_ALL_POSTS":
        return {
          ...state,
          allPosts: action.payload,
          homeFeed: action.payload.filter(
            (post) =>
              state.loggedinUser?.following?.some(
                (user) => user.username === post.username
              ) || post.username === state.loggedinUser?.username
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
        const updatedHomeFeedAfterLike = action.payload.posts.filter(
          (post) =>
            state.loggedinUser.following?.some(
              (user) => user.username === post.username
            ) || post.username === state.loggedinUser.username
        );
        return {
          ...state,
          allPosts: action.payload.posts,
          homeFeed: updatedHomeFeedAfterLike,
          latestPosts: updatedHomeFeedAfterLike,
          trendingPosts: updatedHomeFeedAfterLike,
        };
      case "DISLIKE_POST":
        const updatedHomeFeedAfterDislike = action.payload.posts.filter(
          (post) =>
            state.loggedinUser.following?.some(
              (user) => user.username === post.username
            ) || post.username === state.loggedinUser.username
        );
        return {
          ...state,
          allPosts: action.payload.posts,
          homeFeed: updatedHomeFeedAfterDislike,
          latestPosts: updatedHomeFeedAfterDislike,
          trendingPosts: updatedHomeFeedAfterDislike
        };
      case "DELETE_POST":
        const updatedHomefeedAfterDelete = action.payload.posts.filter(
          (post) =>
            state.loggedinUser.following?.some(
              (user) => user.username === post.username
            ) || post.username === state.loggedinUser.username
        );
        return {
          ...state,
          allPosts: action.payload.posts,
          homeFeed: updatedHomefeedAfterDelete,
          latestPosts: updatedHomefeedAfterDelete,
          trendingPosts: updatedHomefeedAfterDelete
        };
      case "EDIT_POST":
        const updatedHomefeedAfterEditPost = action.payload.posts.filter(
          (post) =>
            state.loggedinUser.following?.some(
              (user) => user.username === post.username
            ) || post.username === state.loggedinUser.username
        );
        return {
          ...state,
          allPosts: action.payload.posts,
          homeFeed: updatedHomefeedAfterEditPost,
          latestPosts: updatedHomefeedAfterEditPost,
          trendingPosts: updatedHomefeedAfterEditPost
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
      case "SORT_BY_LATEST":
        return {
          ...state,
          latestPosts: applyFilter(state.homeFeed, "latest"),
          filter: {
            showTrendingPosts: false,
            showLatestPosts: true,
            showDefault: false,
          },
        };

      case "SORT_BY_TRENDING":
        return {
          ...state,
          trendingPosts: applyFilter(state.homeFeed, "trending"),
          filter: {
            showTrendingPosts: true,
            showLatestPosts: false,
            showDefault: false,
          },
        };
      default:
        return state;
    }
  };

  const applyFilter = (data, sortBy) => {
    const result = [...data];

    if (sortBy === "latest") {
      return result.sort(
        //Date.parse will convert date string to a numeric value of time passed in milliseconds since Jan 1970
        (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
      );
    }

    if (sortBy === "trending") {
      return result.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    }
  };

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

      dispatch({ type: "SET_ALL_USERS", payload: users });
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
