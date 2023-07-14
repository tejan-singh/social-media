export const handleFollowUser = async (dispatch, _id) => {
  try {
    const response = await fetch(`/api/users/follow/${_id}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("encodedToken"),
      },
    });
    const { followUser, user } = await response.json();
    dispatch({ type: "SET_USER", payload: followUser });
    dispatch({ type: "UPDATE_LOGGEDIN_USER_DETAILS", payload: user });
  } catch (error) {
    console.error(error);
  }
};

export const handleUnFollowUser = async (dispatch, _id) => {
  try {
    const response = await fetch(`/api/users/unfollow/${_id}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("encodedToken"),
      },
    });
    const { followUser, user } = await response.json();
    dispatch({ type: "SET_USER", payload: followUser });
    dispatch({ type: "UPDATE_LOGGEDIN_USER_DETAILS", payload: user });
  } catch (error) {
    console.error(error);
  }
};
