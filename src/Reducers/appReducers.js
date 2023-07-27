export const initialState = {
  loading: true,
  allPosts: [],
  allUsers: [],
  errorMsg: "",
  bookmarks: [],
  userProfile: {},
  latestPosts: [],
  trendingPosts: [],
  filter: {
    showLatestPosts: false,
    showTrendingPosts: false,
  },
  //to get loggedIn user details after page refresh, you need to get from local storage
  loggedinUser: {
    ...JSON.parse(localStorage.getItem("loggedInUserDetails")),
  },
  suggestedUsers: [],
};

export const reducerFun = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL_POSTS":
      const homeFeedPosts = action.payload.filter(
        (post) =>
          state.loggedinUser?.following?.some(
            (user) => user.username === post.username
          ) || post.username === state.loggedinUser?.username
      );
      return {
        ...state,
        allPosts: action.payload,
        latestPosts: applyFilter(homeFeedPosts, "latest"),
        filter: {
          showLatestPosts: true,
          showTrendingPosts: false,
        },
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
      const updatedPostsAfterProfileUpdate = state.allPosts.map((eachPost) =>
        eachPost.username === action.payload.username
          ? { ...eachPost, profilePic: action.payload.profilePic }
          : eachPost
      );
      return {
        ...state,
        loggedinUser: action.payload,
        allPosts: updatedPostsAfterProfileUpdate,
        latestPosts: applyFilter(updatedPostsAfterProfileUpdate, "latest"),
      };
    case "CREATE_POST":
      const updatedPostsAfterNew = action.payload.posts.filter(
        (post) =>
          state.loggedinUser.following?.some(
            (user) => user.username === post.username
          ) || post.username === state.loggedinUser.username
      );
      return {
        ...state,
        allPosts: action.payload.posts,
        latestPosts: applyFilter(updatedPostsAfterNew, "latest"),
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
        latestPosts: applyFilter(updatedHomeFeedAfterLike, "latest"),
        trendingPosts: applyFilter(updatedHomeFeedAfterLike, "trending"),
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
        latestPosts: applyFilter(updatedHomeFeedAfterDislike, "latest"),
        trendingPosts: applyFilter(updatedHomeFeedAfterDislike, "trending"),
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
        latestPosts: updatedHomefeedAfterDelete,
        trendingPosts: updatedHomefeedAfterDelete,
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
        latestPosts: applyFilter(updatedHomefeedAfterEditPost, "latest"),
        trendingPosts: applyFilter(updatedHomefeedAfterEditPost, "trending"),
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
        allUsers: action.payload.users,
        suggestedUsers: action.payload.suggestedUsers,
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
        latestPosts: applyFilter(state.latestPosts, "latest"),
        filter: {
          showTrendingPosts: false,
          showLatestPosts: true,
        },
      };

    case "SORT_BY_TRENDING":
      return {
        ...state,
        trendingPosts: applyFilter(state.latestPosts, "trending"),
        filter: {
          showTrendingPosts: true,
          showLatestPosts: false,
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
