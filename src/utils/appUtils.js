export const handleFollowUser = async (dispatch, _id, setIsRequested) => {
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

export const handleUnFollowUser = async (dispatch, _id, setIsRequested) => {
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
